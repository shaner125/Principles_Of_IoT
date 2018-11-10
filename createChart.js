function createChart(dweetId, chartTitle, contentType, seriesTitle, yAxisTitle, chartType, dweets) {
  var data = [];
  var containerLabel = '#' + contentType + 'Chart';
  array_for_cats = [];

  var name = dweetId;

  var chart = {
    type: chartType,
    animation: Highcharts.svg, // don't animate in IE < IE 10.
    marginRight: 10,
  };
  var title = {
    text: chartTitle
  };
  var xAxis = {
    type: 'datetime',
    tickPixelInterval: 150
  };
  var yAxis = {
    title: {
      text: yAxisTitle
    },
    plotLines: [{
      value: 0,
      width: 1,
      color: '#808080'
    }]
  };
  var tooltip = {
    formatter: function () {
      return '<b>' + this.series.name + '</b><br/>' +
        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
        Highcharts.numberFormat(this.y, 2);
    }
  };
  var plotOptions = {
    area: {
      pointStart: 1940,
      marker: {
        enabled: false,
        symbol: 'circle',
        radius: 2,
        states: {
          hover: {
            enabled: true
          }
        }
      }
    }
  };
  var legend = {
    enabled: false
  };
  var exporting = {
    enabled: false
  };


  var series = [];

  for(theDweet in dweets.reverse())
  {
    var dweet = dweets[theDweet];

    val = dweet.content[contentType];
    data.push(parseInt(val));
    array_for_cats.push(dweet.created);
  }

  series= [{
    name:seriesTitle,
    data: data
  }];

  var json = {};
  json.chart = chart;
  json.title = title;
  json.tooltip = tooltip;
  json.xAxis = xAxis;
  json.yAxis = yAxis;
  json.legend = legend;
  json.exporting = exporting;
  json.series = series;
  json.plotOptions = plotOptions;


  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });
  $(containerLabel).highcharts(json);
  chart = $(containerLabel).highcharts();
  chart.xAxis[0].update({categories: array_for_cats}, true);

  dweetio.listen_for(name, function(dweet){
    val = dweet.content[contentType];
    console.log("happened");
    var chart = $(containerLabel).highcharts();
    chart.series[0].addPoint(parseInt(val));
    array_for_cats.push(dweet.created);
    chart.xAxis[0].update({categories: array_for_cats}, true);

  });

  return data;
}

