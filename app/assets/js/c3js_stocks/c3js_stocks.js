// C3 init


var get_raw_data = function() {
  var url = '/data/stocks/';
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false);
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
};

var get_data = function(ref_index, start_index, end_index) {
	var url = '/data/stocks/' + ref_index + '/' + start_index;
  if (end_index) url += '/' + end_index;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false);
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
};

var all_data = get_data(0, 0);
var raw_data = get_raw_data();
var start_index = 0;

var onClickCallback = function(d, element) {
	document.getElementById('c3js_stocks_start_btn').disabled = false;
};

var my_chart_parameters = {
  "bindto": "#c3js_stocks_chart",
  "data": {
  	"x" : 'x',
    "columns": all_data,
    "selection": {
      "enabled": true,
      "grouped": true,
      "multiple": false
    },
    "onclick" : onClickCallback
  },
  "axis": {
  	"x" : {
    	"type": 'timeseries',
      "tick": {
      	"format" : '%Y'
      }
    },
    "y": {
    	"label" : '% change in stock value'
    }
  },
  "point": {
    "r": 1,
    "focus": {
      "expand": {
        "r": 15,
        "enabled": false
      }
    }
  },
  "grid": {
    "x": {
      "show": false
    },
    "y": {
      "show": true
    }
  },
  "tooltip": {
    "show": true,
    "grouped": true,
    "format" : {
    	"title" : function(x) { return x.toLocaleDateString(); },
      "value" : function(name, ratio, id, index) {
      		var i = 0;
          if (id == "AMZN") i = 1;
          value = "$";
          value += raw_data[i][index + start_index + 1];
          value += ' (' + my_chart_object.data.values(id)[index].toFixed(2) + '%)';
          return value;
      }
    }
  }
};

var my_chart_object = c3.generate(my_chart_parameters);

// slides

var slide_0 = function() {
  document.getElementById("c3js_stocks_message").innerHTML = "Over the last decade online retailers have become increasingly popular, but how has this affected 		other retailers that primarily operate through physical stores?";
};


var slide_1 = function() {
  document.getElementById("c3js_stocks_message").innerHTML = "Here we have a comparison of the percent change in stock value of Amazon (AMZN) and Barne's and Noble (BKS) since January 2000, where each data point is determined by the closing value of the stock (adjusted for dividends and stock splits) on the first day of the month.";
};

var slide_2 = function() {
	my_chart_object.regions([{
    end: "2008-01-30"
  }]);
	document.getElementById("c3js_stocks_message").innerHTML = "This dramatic growth of Amazon after 2008 makes the stock prices of Barne's and Noble look much stable, so let's look at the first half of our data points up until 2008";
};

var slide_3 = function() {
  my_chart_object.regions([]);
  start_index = 0;
  my_chart_object.load({
  	columns : get_data(0, start_index, Math.floor(all_data[0].length / 2))
  });
  document.getElementById("c3js_stocks_message").innerHTML = "During this time period, Barne's and Noble stock actually increased in value a great deal. ";
};

var slide_4 = function() {
	my_chart_object.load({
  	columns : all_data
  });
  my_chart_object.regions([{
    start: "2008-01-01"
  }]);
  document.getElementById("c3js_stocks_message").innerHTML = "Now let's look at the stock values from 2008 forward.";
};

var slide_5 = function() {
  my_chart_object.regions([]);
  start_index = Math.floor(all_data[0].length / 2);
	my_chart_object.load({
  	columns : get_data(0, start_index)
 	});
	document.getElementById("c3js_stocks_message").innerHTML = "However, after 2008 the percent increase in Amazon's stock value dwarfs that of Barne's and Noble.";
};

var slide_6 = function() {
  my_chart_object.load({
  	columns : all_data
  });
  document.getElementById('c3js_stocks_start_btn').disabled = true;
  document.getElementById("c3js_stocks_message").innerHTML = "Now, select a point to see how stock prices have changed since then. Once you've picked a point, click Continue.";
};

var slide_7 = function() {
  var selected = my_chart_object.selected();
  if (selected.length === 0) return;
  start_index = selected[0].index;
  my_chart_object.unselect();
  my_chart_object.revert();
  my_chart_object.flush();
  var new_data = get_data(start_index, start_index);

	setTimeout(function(){
  	my_chart_object.load({
  		columns : new_data
  	});
  }, 150);
	
};

var slides = [slide_0, slide_1, slide_2, slide_3, slide_4, slide_5, slide_6, slide_7];

// cycle through slides

var current_slide = 0;

var run = function() {
  slides[current_slide]();
  current_slide += 1;

  if (current_slide === 1) {
    document.getElementById("c3js_stocks_start_btn").innerHTML = "Start";
  } else if (current_slide === slides.length) {
  	current_slide = slides.length - 2;
    document.getElementById("c3js_stocks_start_btn").innerHTML = "Back";
  } else {
    document.getElementById("c3js_stocks_start_btn").innerHTML = "Continue";
  }
};

// button event handler

document.getElementById('c3js_stocks_start_btn').addEventListener("click", run);

// init

run();