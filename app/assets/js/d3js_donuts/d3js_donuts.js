var donut = {};
d3.json('/data/donuts', function(data) {
  donut.name = "Donut";
  donut.id = "0000";
  donut._children = [];
  data.items.item.forEach(function(elem, i, arr) {
    var child = {};
    child.name = elem.name;
    child.type = elem.type;
    child._children = elem.batters.batter;
    child._children.forEach(function(elem2, i2, arr2) {
      if (elem.topping) {
        elem2._children = elem.topping;
        elem2._children.forEach(function(elem3, i3, arr3) {
          if (elem.fillings) {
            elem3._children = elem.fillings.filling;
          }
        });
      }
    });
    donut._children.push(child);
    
  });

  var setParents = function(parent) {
    if (!parent._children) return;
    parent._children.forEach(function(child) {
      child.parent = parent;
      setParents(child);
    });
  };
  setParents(donut);

  var height = 1000,  width = 1000;


var svg = d3
  .select("#d3js_donuts_hierarchy")
  .append("svg")
  .attr("height", height)
  .attr("width", width)
  .append("g")
  .attr("transform", "translate(50,0)");

var tree = d3
  .layout
  .tree()
  .size([height, width - 150]);

var diagonal = d3
  .svg
  .diagonal()
  .projection(function(d) {
    return [d.y, d.x];
  });

document.getElementById("d3js_donuts_button").addEventListener("click", function() { 
  update(donut); 
});
document.getElementById("d3js_donuts_clear").addEventListener("click", function() {
  document.getElementById("d3js_donuts_search").value = "";
  update(donut);
});

function findInPath(source, text) {
  if (source.name.search(text) >= 0) {
    return true;
  } else if (source.children || source._children) {
    var c = source.children ? source.children : source._children;
    for (var i = 0; i < c.length; i++) {
      if (findInPath(c[i], text)) {
        return true;
      }
    }
  }
  return false;
}

function findInPathConj(source, terms) {
  return terms.some(function(term) {
    return findInPath(source, term);
  });
}

function findInPathCount(source, terms) {
  return terms.filter(function(term) {
    return findInPath(source, term);
  }).length;
}


donut.x0 = height / 2;
donut.y0 = 0;

var i = 0;
var duration = 750;

update(donut);

function update(source) {

  var search_term = document.getElementById("d3js_donuts_search").value.split(" ");

  var nodes = tree.nodes(donut);
  var links = tree.links(nodes);
  
  var linkFilter = function(d) {
    return findInPathConj(d.target, search_term);
  };
  
  var nodeFilter = function(d) {
    return !findInPathConj(d, search_term);
  };

  var node = svg.selectAll("g.node")
    .data(nodes, function(d) {
      return d.id || (d.id = ++i);
    });

  var nodeEnter = node
   .enter()
   .append("g")
   .attr("class", "node")
   .attr("transform", function(d) {
     return "translate(" + source.y0 + "," + source.x0 + ")";
   })
   .on("click", click);

  nodeEnter.append("circle")
    .attr("r", 1e-6)
    .style("stroke", "steelblue")
    .style("stroke-width", "1.5px");

  nodeEnter.append("text")
    .attr("x", function(d) {
      return d.children || d._children ? -13 : 13;
    })
    .attr("y", 0)
    .attr("dy", ".35em")
    .attr("text-anchor", function(d) {
      return d.children || d._children ? "end" : "start";
    })
    .text(function(d) {
      return d.name;
    })
    .style("fill-opacity", 1e-6)
    .style("font", "10px sans-serif")
    .style("fill", "black")
    .style("stroke-width", ".01px");



  var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function(d) {
      return "translate(" + d.y + "," + d.x + ")";
    });

  var scale = d3.scale.linear()
    .domain([0, search_term.length])
    .range([0, 10]);

  var depthCount = function(branch) {
    if (!branch.children) {
        return 1;
    }
    return 1 + d3.max(branch.children.map(depthCount));
  };

  var max_depth = depthCount(donut);
  var colorInterpolate = d3.interpolate("black", "blue");

  nodeUpdate.select("circle")
    .attr("r", function(d) {
      return scale(findInPathCount(d, search_term)) + 1e-6;
    })
    .style("fill", function(d) {
      return colorInterpolate(d.depth/max_depth);
    })
    .style("stroke-width", "1.5px");
  
  nodeUpdate.select("text")
    .style("fill-opacity", 1)
    .style("font", "10px sans-serif")
    .style("stroke", "steelblue")
    .style("stroke-width", ".01px")
    .filter(nodeFilter)
    .transition()
    .duration(duration)
    .style("fill-opacity", 1e-6);
    
  var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function(d) {
      return "translate(" + source.y + "," + source.x + ")";
    });

  nodeExit.select("circle")
    .attr("r", 1e-6);

  nodeExit.select("text")
    .style("fill-opacity", 1e-6);


  var link = svg.selectAll("path.link")
    .data(links, function(d) {
      return d.target.id;
    });

  link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", function(d) {
      var o = {
        x: source.x0,
        y: source.y0
      };
      return diagonal({
        source: o,
        target: o
      });
    })
    .style("fill", "none")
    .style("stroke-width", "1.5px");

  link.transition()
    .duration(duration)
    .attr("d", diagonal);

  link.exit().transition()
    .duration(duration)
    .attr("d", function(d) {
      var o = {
        x: source.x,
        y: source.y
      };
      return diagonal({
        source: o,
        target: o
      });
    })
    .remove();

link.filter(linkFilter).style("stroke", "ccc");
link
  .filter(function(d){return !linkFilter(d);})
  .transition()
  .duration(duration)
  .attr("transform", function(d) {
      return "translate(" + 0 + "," + d.target.y + ")";
   })
   .remove();

  nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
  
    // this makes it so that only one child at each level can be expanded
    if (d.parent) {
       d.parent.children.forEach(function(sibling) {
        if (sibling.children) {
          sibling._children = sibling.children;
          sibling.children = null;
        }
      });
    }
   
    d.children = d._children;
    d._children = null;
  }
  update(d);
}



});




