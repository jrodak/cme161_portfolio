var hist = function(data_in, chart_id, value, chart_title) {

  var margin = {
      "top": 30,
      "right": 30,
      "bottom": 50,
      "left": 30
    },
    width = 600 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

  var x = d3.scale.linear()
    .domain([0, 1])
    .range([0, width]);

  var y = d3.scale.linear()
    .domain([0, d3.max(data_in, function(d) {
      return d.value[value];
    })])
    .range([height, 0]);
  
  d3.select("#" + chart_id).remove();
  
  var div = d3.select("#baseball_charts").append("div").attr("id", chart_id);
  
  div.append("h2").text(chart_title);
  
  var svg = div.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var bar = svg.selectAll(".bar")
    .data(data_in)
    .enter()
    .append("g")
    .attr("class", "bar")
    .attr("transform", function(d, i) {
      return "translate(" + x(i / data_in.length) + "," + y(d.value[value]) + ")";
    });

  bar.append("rect")
    .attr("x", 1)
    .attr("width", width / data_in.length - 1)
    .attr("height", function(d) {
      return height - y(d.value[value]);
    });

  var formatCount = d3.format(",.0f");

  bar.append("text")
    .attr("dy", ".75em")
    .attr("y", 6)
    .attr("x", (width / data_in.length - 1) / 2)
    .attr("text-anchor", "middle")
    .text(function(d) {
      return formatCount(d.value.count);
    });

  var unique_names = data_in.map(function(d) {
    return d.key;
  });

  var xScale = d3.scale.ordinal().domain(unique_names).rangePoints([0, width]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");
    
  var xTicks = svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("font-size", 10)
    .attr("transform", function(d) {
      return "rotate(-50)";
    });


  var yAxis = d3.svg.axis()
    .ticks(5)
    .scale(y)
    .orient("left");

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,0)")
    .call(yAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("font-size", 10);
};

d3.json("https://tranquil-peak-82564.herokuapp.com/api/v1.0/data/baseball/",
  function(error, games_json) {
  
    var data = _.filter(games_json, function(d){
      return d.year >= 2010 && d.year <= 2014;
    });
    var all_teams = _.chain(data).pluck("team_id").value();
    var all_players = _.chain(data).pluck("player_id").value();
  
    var cf = crossfilter(data);
    var dim_team = cf.dimension(function(d) { return d.team_id; });
    var dim_ngames = cf.dimension(function(d){ return d.g_all;     });
    var dim_year = cf.dimension(function(d) { return d.year; });
    var dim_player = cf.dimension(function(d) { return d.player_id; });
    
    var group_team = dim_team.group();
    var group_year = dim_year.group();
    var group_player = dim_player.group();
    var group_ngames = dim_ngames.group();
    
   
     
    /* 
    // sanity check
    
    group_team
      .top(Infinity)
      .forEach(function(d, i) {
        console.log(JSON.stringify(d));
      });
      
    */
    
    /* --------------------------------------------------------- 
    
      Add a third and 4th variable to this map reduction
      - the third should be the minimum year
      - the fourth should be the maximum year
      - hint: use inequalities
      
    */
    
    var reduce_init = function() {
      return {
        "count": 0,
        "total": 0,
        "min_year" : Infinity,
        "max_year": 0,
        "all_years": []
      };
    };

    var reduce_add = function(p, v, nf) {
      ++p.count;
      p.total += v.g_all;
      if (v.year < p.min_year)
        p.min_year = v.year;
      if (v.year > p.max_year)
        p.max_year = v.year;
      p.all_years.push(v.year);
      return p;
    };

    var reduce_remove = function(p, v, nf) {
      --p.count;
      p.total -= v.g_all;
      p.all_years.splice(p.all_years.indexOf(v.year), 1);
      p.max_year = Math.max.apply(null, p.all_years);
      p.min_year = Math.min.apply(null, p.all_years);
      return p;
    };
    
    /* --------------------------------------------------------- */
    
    
    group_team.reduce(reduce_add, reduce_remove, reduce_init);
    group_year.reduce(reduce_add, reduce_remove, reduce_init);
    group_player.reduce(reduce_add, reduce_remove, reduce_init);
    group_ngames.reduce(reduce_add, reduce_remove, reduce_init);
    
    var render_plots = function(){
      // count refers to a specific key specified in reduce_init 
      // and updated in reduce_add and reduce_subtract
      // Modify this for the chart to plot the specified variable on the y-axis
      hist(group_team.top(Infinity), 
        "appearances_by_team", 
        "count", 
        "# of Appearances by Team"
      );
      
      hist(group_year.top(Infinity),
        "appearances_by_year",
        "count",
        "# of Appearances by Year"
      );
      
      hist(group_player.top(Infinity),
        "appearances_by_player",
        "count",
        "# of Appearances by Player"
      );
      
      hist(group_ngames.top(Infinity),
        "appearances_by_ngames",
        "count",
        "# of Appearances by Total Games played in Year"
      );
      
      
      
      
    };
    
    
    /* --------------------------------------------------------- 
       this is a slider, see the html section above
    */
    var n_games_slider = new Slider(
      "#n_games_slider", {
        "id": "n_games_slider",
        "min": 0,
        "max": 162,
        "range": true,
        "value": [0, 162]
    });
    
    var year_slider = new Slider(
      "#year_slider", {
        "id": "year_slider",
        "min": 2010,
        "max": 2014,
        "range": true,
        "value": [2010, 2014]
    });
    
     var team_slider = new Slider(
        "#team_slider", {
          "id": "team_slider",
          "min": 0,
          "max": 15,
          "range": false,
          "value": 0
     });
     
     
     var player_slider = new Slider(
        "#player_slider", {
          "id": "player_slider",
          "min": 0,
          "max": 30,
          "ramge": false,
          "value": 0
        }
     );
    
    
   
    // this is an event handler for a particular slider
    n_games_slider.on("slide", function(e) {
      d3.select("#n_games_slider_txt").text("min: " + e[0] + ", max: " + e[1]);
      
      // filter based on the UI element
      dim_ngames.filter(e);
      
      // re-render
      render_plots(); 
       
     /* update the other charts here 
      hint: each one of your event handlers needs to update all of the charts
     */
       
    });
    
    
     /* add at least 3 more event handlers here */
     
     year_slider.on("slide", function(e) {
       d3.select("#year_slider_txt").text("min: " + e[0] + ", max: " + e[1]);
      
      // filter based on the UI element
       dim_year.filter([e[0], e[1]+1]);
      
       // re-render
       render_plots(); 

       /* update the other charts here 
        hint: each one of your event handlers needs to update all of the charts
        */
     });
     
     
     team_slider.on("slide", function(e) {
        if (e === 0) {
          d3.select("#team_slider_txt").text("All teams");
          dim_team.filterAll();
        } else {
          var team = all_teams[e - 1];
          d3.select("#team_slider_txt").text(team);
          dim_team.filter(team);
        }
        
        render_plots();
     
     });
     
     player_slider.on("slide", function(e) {
        if (e === 0) {
          d3.select("#player_slider_txt").text("All players");
          dim_player.filterAll();
        } else {
          var player = all_players[e - 1];
          d3.select("#player_slider_txt").text(player);
          dim_player.filter(player);
        }
        
        render_plots();
     
     });
     
     
     
     
     
     /* --------------------------------------------------------- */
     
     
     
     render_plots(); // this just renders the plots for the first time
    
  });
