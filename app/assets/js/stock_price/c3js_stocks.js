// C3 init


var raw_data = [
["BKS", 7.51, 6.44, 8.75, 6.91, 7.07, 8.3, 7.56, 6.46, 7.35, 7.09, 10.13, 9.9, 9.6, 10.08, 8.92, 11.87, 12.01, 14.69, 14.64, 15.11, 13.48, 13.72, 11.54, 11.05, 13.0, 11.57, 11.57, 11.28, 11.49, 9.87, 8.04, 8.55, 7.9, 7.88, 8.84, 6.75, 6.5, 6.58, 7.09, 7.36, 8.89, 8.61, 8.94, 9.78, 9.49, 11.13, 12.39, 12.27, 12.64, 13.03, 12.17, 11.15, 11.18, 12.69, 12.84, 12.9, 13.82, 12.42, 14.03, 16.72, 16.94, 17.7, 17.87, 18.44, 18.44, 19.61, 20.1, 21.25, 19.57, 19.61, 18.81, 20.98, 22.27, 22.14, 22.48, 24.23, 23.62, 20.0, 19.2, 17.63, 19.12, 20.04, 21.82, 21.14, 21.05, 20.64, 21.66, 21.0, 21.04, 22.77, 20.55, 17.92, 19.27, 18.92, 20.73, 20.63, 18.55, 18.27, 15.14, 16.6, 17.48, 16.52, 13.57, 12.92, 13.51, 14.38, 10.41, 8.7, 8.4, 9.19, 10.04, 12.16, 14.85, 14.05, 11.85, 13.22, 11.88, 12.92, 9.66, 13.57, 11.22, 10.28, 11.81, 12.88, 13.13, 12.05, 7.8, 7.84, 9.15, 9.95, 9.2, 9.2, 8.61, 8.83, 9.83, 8.35, 5.73, 6.86, 12.24, 10.34, 10.85, 8.32, 7.38, 7.65, 10.88, 9.03, 7.53, 8.3, 8.27, 12.94, 10.25, 10.27, 8.28, 7.47, 7.97, 10.51, 8.95, 9.41, 8.32, 9.82, 10.26, 11.31, 14.04, 9.96, 11.14, 8.53, 8.07, 8.81, 10.47, 9.33, 8.41, 11.95, 13.04, 10.23, 11.32, 14.22, 12.99, 14.88, 12.31, 13.61, 14.57, 14.49, 14.65, 15.53, 14.82, 13.66, 14.67, 16.2, 16.4, 14.99, 11.63, 12.61, 12.43, 8.46, 8.66, 9.58, 12.21, 11.66],
  
["AMZN", 64.56, 68.88, 67.0, 55.19, 48.31, 36.31, 30.13, 41.5, 38.44, 36.63, 24.69, 15.56, 17.31, 10.19, 10.23, 15.78, 16.69, 14.15, 12.49, 8.94, 5.97, 6.98, 11.32, 10.82, 14.19, 14.1, 14.3, 16.69, 18.23, 16.25, 14.45, 14.94, 15.93, 19.36, 23.35, 18.89, 21.85, 22.01, 26.03, 28.69, 35.89, 36.32, 41.64, 46.32, 48.43, 54.43, 53.97, 52.62, 50.4, 43.01, 43.28, 43.6, 48.5, 54.4, 38.92, 38.14, 40.86, 34.13, 39.68, 44.29, 43.22, 35.18, 34.27, 32.36, 32.36, 35.51, 33.09, 45.15, 42.7, 45.3, 39.86, 48.46, 47.15, 44.82, 37.44, 36.53, 35.21, 34.61, 38.68, 26.89, 30.83, 32.12, 38.09, 40.34, 39.46, 37.67, 39.14, 39.79, 61.33, 69.14, 68.41, 78.54, 79.91, 93.15, 89.15, 90.56, 92.64, 77.7, 64.47, 71.3, 78.63, 81.62, 73.33, 76.34, 80.81, 72.76, 57.24, 42.7, 51.28, 58.82, 64.79, 73.44, 80.52, 77.99, 83.66, 85.76, 81.19, 93.36, 118.81, 135.91, 134.52, 125.41, 118.4, 135.77, 137.1, 125.46, 109.26, 117.89, 124.83, 157.06, 165.23, 165.23, 175.4, 180.0, 169.64, 173.29, 180.13, 195.81, 196.69, 204.49, 222.52, 215.23, 216.23, 213.51, 192.29, 173.1, 194.44, 179.69, 202.51, 231.9, 212.91, 228.35, 233.3, 248.27, 254.32, 232.89, 252.05, 250.87, 265.5, 264.27, 266.49, 253.81, 269.2, 277.69, 301.22, 280.98, 312.64, 364.03, 393.62, 398.79, 358.69, 362.1, 336.37, 304.13, 312.55, 324.78, 312.99, 339.04, 322.44, 305.46, 338.64, 310.35, 354.53, 380.16, 372.1, 421.78, 429.23, 434.09, 536.15, 512.89, 511.89, 625.9, 664.8, 675.89, 587.0, 552.52, 593.64, 595.93]

];

var dates = ['x', '2000-01-03', '2000-02-01', '2000-03-01', '2000-04-03', '2000-05-01', '2000-06-01', '2000-07-03', '2000-08-01', '2000-09-01', '2000-10-02', '2000-11-01', '2000-12-01', '2001-01-02', '2001-02-01', '2001-03-01', '2001-04-02', '2001-05-01', '2001-06-01', '2001-07-02', '2001-08-01', '2001-09-04', '2001-10-01', '2001-11-01', '2001-12-03', '2002-01-02', '2002-02-01', '2002-03-01', '2002-04-01', '2002-05-01', '2002-06-03', '2002-07-01', '2002-08-01', '2002-09-03', '2002-10-01', '2002-11-01', '2002-12-02', '2003-01-02', '2003-02-03', '2003-03-03', '2003-04-01', '2003-05-01', '2003-06-02', '2003-07-01', '2003-08-01', '2003-09-02', '2003-10-01', '2003-11-03', '2003-12-01', '2004-01-02', '2004-02-02', '2004-03-01', '2004-04-01', '2004-05-03', '2004-06-01', '2004-07-01', '2004-08-02', '2004-09-01', '2004-10-01', '2004-11-01', '2004-12-01', '2005-01-03', '2005-02-01', '2005-03-01', '2005-04-01', '2005-04-29', '2005-05-02','2005-06-01', '2005-07-01', '2005-08-01', '2005-09-01', '2005-10-03', '2005-11-01', '2005-12-01', '2006-01-03', '2006-02-01', '2006-03-01', '2006-04-03', '2006-05-01', '2006-06-01', '2006-07-03', '2006-08-01', '2006-09-01', '2006-10-02', '2006-11-01', '2006-12-01', '2007-01-03', '2007-02-01', '2007-03-01', '2007-04-02', '2007-05-01', '2007-06-01', '2007-07-02', '2007-08-01', '2007-09-04', '2007-10-01', '2007-11-01', '2007-12-03', '2008-01-02', '2008-02-01', '2008-03-03', '2008-04-01', '2008-05-01', '2008-06-02', '2008-07-01', '2008-08-01', '2008-09-02', '2008-10-01', '2008-11-03', '2008-12-01', '2009-01-02', '2009-02-02', '2009-03-02', '2009-04-01', '2009-05-01', '2009-06-01', '2009-07-01', '2009-08-03', '2009-09-01', '2009-10-01', '2009-11-02', '2009-12-01', '2010-01-04', '2010-02-01', '2010-03-01', '2010-04-01', '2010-05-03', '2010-06-01', '2010-07-01', '2010-08-02', '2010-09-01', '2010-10-01', '2010-10-29', '2010-11-01', '2010-12-01', '2011-01-03', '2011-02-01', '2011-03-01', '2011-04-01', '2011-05-02', '2011-06-01', '2011-07-01', '2011-08-01', '2011-09-01', '2011-10-03', '2011-11-01', '2011-12-01', '2012-01-03', '2012-02-01', '2012-03-01', '2012-04-02', '2012-05-01', '2012-06-01', '2012-07-02', '2012-08-01', '2012-09-04', '2012-10-01', '2012-11-01', '2012-12-03', '2013-01-02', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01', '2013-06-03', '2013-07-01', '2013-08-01', '2013-09-03', '2013-10-01', '2013-11-01', '2013-12-02', '2014-01-02', '2014-02-03', '2014-03-03', '2014-04-01', '2014-05-01', '2014-06-02', '2014-07-01', '2014-08-01', '2014-09-02', '2014-10-01', '2014-11-03', '2014-12-01', '2015-01-02', '2015-02-02', '2015-03-02', '2015-04-01', '2015-05-01', '2015-06-01', '2015-07-01', '2015-08-03', '2015-09-01', '2015-10-01', '2015-11-02', '2015-12-01', '2016-01-04', '2016-02-01', '2016-03-01', '2016-04-01'];

var convert_data = function(data, init_index, start, end) {
  var key = data[0];
  var init_val = data[init_index + 1];
	var converted = [];
  converted.push(key);
  for (var i = start + 1; i < end; i++) {
    var val = data[i];
  	converted.push((val / init_val - 1) * 100);
  }
  return converted;
};

var slice_dates = function(start, end) {
  var new_dates = [];
  new_dates.push(dates[0]);
  for (var i = start + 1; i < end; i++) {
    new_dates.push(dates[i]);
  }
  return new_dates;
};

var start_index = 0;
var end_index = raw_data[0].length;

var get_data = function(init_index) {
	return [
  	slice_dates(start_index, end_index),
    convert_data(raw_data[0], init_index, start_index, end_index),
		convert_data(raw_data[1], init_index, start_index, end_index)
  ];
};

var all_data = get_data(0);

var onClickCallback = function(d, element) {
	document.getElementById('stock_price_start_btn').disabled = false;
};

var my_chart_parameters = {
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
  document.getElementById("stock_price_message").innerHTML = "Over the last decade online retailers have become increasingly popular, but how has this affected 		other retailers that primarily operate through physical stores?";
};


var slide_1 = function() {
  document.getElementById("stock_price_message").innerHTML = "Here we have a comparison of the percent change in stock value of Amazon (AMZN) and Barne's and Noble (BKS) since January 2000, where each data point is determined by the closing value of the stock (adjusted for dividends and stock splits) on the first day of the month.";
};

var slide_2 = function() {
	my_chart_object.regions([{
    end: "2008-01-30"
  }]);
	document.getElementById("stock_price_message").innerHTML = "This dramatic growth of Amazon after 2008 makes the stock prices of Barne's and Noble look much stable, so let's look at the first half of our data points up until 2008";
};

var slide_3 = function() {
  my_chart_object.regions([]);
  end_index = Math.floor(raw_data[0].length / 2);
  my_chart_object.load({
  	columns : get_data(0)
  });
  document.getElementById("stock_price_message").innerHTML = "During this time period, Barne's and Noble stock actually increased in value a great deal. ";
};

var slide_4 = function() {
	end_index = raw_data[0].length;
	my_chart_object.load({
  	columns : all_data
  });
  my_chart_object.regions([{
    start: "2008-01-01"
  }]);
  document.getElementById("stock_price_message").innerHTML = "Now let's look at the stock values from 2008 forward.";
};

var slide_5 = function() {
  my_chart_object.regions([]);
  start_index = Math.floor(dates.length / 2);
	my_chart_object.load({
  	columns : get_data(0)
 	});
	document.getElementById("stock_price_message").innerHTML = "However, after 2008 the percent increase in Amazon's stock value dwarfs that of Barne's and Noble.";
};

var slide_6 = function() {
  start_index = 0;
  my_chart_object.load({
  	columns : all_data
  });
  document.getElementById('stock_price_start_btn').disabled = true;
  document.getElementById("stock_price_message").innerHTML = "Now, select a point to see how stock prices have changed since then. Once you've picked a point, click Continue.";
};

var slide_7 = function() {
  var selected = my_chart_object.selected();
  if (selected.length === 0) return;
  start_index = selected[0].index;
  my_chart_object.unselect();
  my_chart_object.revert();
  my_chart_object.flush();
  var new_data = get_data(start_index);

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
    document.getElementById("stock_price_start_btn").innerHTML = "Start";
  } else if (current_slide === slides.length) {
  	current_slide = slides.length - 2;
    document.getElementById("stock_price_start_btn").innerHTML = "Back";
  } else {
    document.getElementById("stock_price_start_btn").innerHTML = "Continue";
  }
};

// button event handler

document.getElementById('stock_price_start_btn').addEventListener("click", run);

// init

run();