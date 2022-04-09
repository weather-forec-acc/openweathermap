var chartT; // 'chart-temperature'
function print_forecast(last_statistics) {
  //console.log(last_statistics[0]);
  var myObj = last_statistics[0];
  console.log(myObj);
  plotTemperature(myObj);
}

//Plot temperature in the temperature chart
function plotTemperature(jsonValue) {
  create_chart('chart-temperature');
  var keys = Object.keys(jsonValue);
  console.log(keys);
  console.log(keys.length);

  console.log("jsonValue.temp_max:",jsonValue.temp_max);
  console.log("jsonValue['temp_max']:",jsonValue['temp_max']);
  for (var i = 0; i < keys.length; i++){
	console.log(i,keys[i]);
	if (i==1) {
		var x = [1,2,3,4,5,6,7,8];
		console.log("x:",x);
		//console.log(jsonValue[keys[i]]);
		var y = jsonValue[keys[i]];
		y = [-10,2,3,4,5];
		console.log("y:",y);
        chartT.series[0].addPoint([x,y]);
	}
  }
}

/*
window.chart = new Highcharts.Chart({
        chart: {
            renderTo: container,
            height: 400
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
*/

// Create Temperature Chart
function create_chart(renderTo) {
  chartT = new Highcharts.chart(renderTo,{	
  chart: {
    type: 'spline',
    inverted: false
  },
  time: {
    // timezoneOffset: -120
	//useUTC: false,
	//timezone: 'Europe/Helsinki'
  },
  series: [
    {
      name: 'Temperature max',
      type: 'line',
      color: '#FF0000',
      marker: {
        symbol: 'circle',
        radius: 3,
        fillColor: '#FF0000',
      },
	  //data: [1, 3, 2, 4]
    }
  ],
  title: {
    text: undefined
  },
  xAxis: {
    //type: 'datetime',
    //dateTimeLabelFormats: { second: '%H:%M:%S' }
  },
  yAxis: {
    title: {
      text: 'Temperature Celsius Degrees'
    }
  },
  credits: {
    enabled: false
  },
  plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
  },
  legend: {
    itemStyle: {
      fontWeight: 'normal'
    }
  },
  tooltip: {
        //headerFormat: '<b>{series.name}</b><br/>',
        //pointFormat: '{point.x:%H:%M:%S}: {point.y}°C'
		//pointFormat: "Fecha: {point.x:%H:%M:%S} date, <br>Evento: {point.myData}  "
  }
});
}