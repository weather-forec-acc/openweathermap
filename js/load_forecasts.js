var chartT, // 'chart-temperature'
    chartPH, // 'chart-press-humid'
	chartClPop, // 'chart-clouds-prec'
	chartClPop; // 'chart-wind'
function print_forecast(last_statistics) {
  var statistics = last_statistics[0];
  plotChart(statistics);
}

//Plot temperature in the temperature chart
function plotChart(jsonValue) {
  create_chart_temp('chart-temperature');
  create_chart_press_humid('chart-press-humid');
  create_chart_clouds_pop('chart-clouds-prec');
  create_chart_wind('chart-wind');
  var keys = Object.keys(jsonValue);
  //console.log("jsonValue.temp_max:",jsonValue.temp_max); // [7, 8, 13, 17, 13, 14, 12, 10]
  //console.log("jsonValue.dt:",jsonValue.dt); // ['2022-04-04T09:00:00.000Z', ..., '2022-04-11T09:00:00.000Z']
  var data = [];
  // 0 'id' 1 'dt' 2 'temp_max' 3 'temp_min' 4 'clouds' 5 'prob_prec' 6 'pressure'
  // 7 'humidity' 8 'wind_speed' 9 'wind_deg' 10 'uv_index' 11 'utc_date'
  for (var key = 0; key < keys.length; key++){
	//console.log(key,keys[key]);
	if ((key==2) || (key==3) || (key==6) || (key==7) || (key==4) || (key==5) || (key==8) || (key==9)) {
		var date = jsonValue[keys[1]];
		var param = jsonValue[keys[key]];
		//console.log("date:",date);
		date.forEach((element, index) => {
		  let date_z = new Date(element);//.setHours(0,0,0,0);
		  //console.log(date_z); // Mon Apr 04 2022 12:00:00 GMT+0300 (Восточная Европа, летнее время)
		  date_z = date_z.setHours(0,0,0,0);
		  date_z = new Date(date_z);
		  //console.log(date_z);
		  let currentTimeZoneOffsetInHours = date_z.getTimezoneOffset() / 60;
		  //console.log(currentTimeZoneOffsetInHours); // -3
		  date_z = new Date(date_z.getFullYear(), date_z.getMonth(), date_z.getDate(), -currentTimeZoneOffsetInHours, 0, 0);
		  let x = date_z.getTime();
		  if (key==8)
		    data.push([x,param[index]/100]);
		  else
			data.push([x,param[index]]);
		});
		if (key==2)
		  chartT.series[0].setData(data);
	    else if (key==3)
		  chartT.series[1].setData(data);
	    else if (key==6)
		  chartPH.series[0].setData(data);
	    else if (key==7)
		  chartPH.series[1].setData(data);
	    else if (key==4)
		  chartClPop.series[0].setData(data);
	    else if (key==5)
		  chartClPop.series[1].setData(data);
	    else if (key==8)
		  chartW.series[0].setData(data);
	    else if (key==9)
		  chartW.series[1].setData(data);
		data = [];
	}
  }
}

// Create Temperature Chart
function create_chart_temp(renderTo) {
  chartT = new Highcharts.chart(renderTo,{	
    chart: {
      type: 'spline',
      inverted: false
	},
	title: {
	  text: "Temperature",
	  align: 'left'
	},
	subtitle: {
        text: 'Source: openweathermap.org',
        align: 'left'
    },
	time: {
	  //useUTC: false, //timezone: 'Europe/Helsinki'
	},
	series: [
	  {
		name: 'Temp. max',
		type: 'line',
		color: Highcharts.getOptions().colors[3], //'#FF0000',
		marker: {
		  symbol: 'circle',
		  radius: 3,
		  fillColor: Highcharts.getOptions().colors[3]//'#FF0000',
		},
	  },
	  {
		name: 'Temp. min',
		type: 'line',
		color: Highcharts.getOptions().colors[0], //'#0000FF',
		marker: {
		  symbol: 'circle',
		  radius: 3,
		  fillColor: Highcharts.getOptions().colors[0] //'#0000FF',
		}
	  }
	],
	xAxis: {
	  type: 'datetime',
	  dateTimeLabelFormats: { day: '%d.%m' },
	  gridLineWidth: 1,
	},
	yAxis: {
	  title: {
		text: 'Temperature Celsius Degrees'
	  },
	  alignTicks: false,
      tickInterval: 5,
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
	  //headerFormat: '<b>{series.name}</b><br/>', //pointFormat: '{point.x:%H:%M:%S}: {point.y}°C'
	  //pointFormat: "Fecha: {point.x:%H:%M:%S} date, <br>Evento: {point.myData}  "
    }
  });
}

// Create Pressure - Humidity Chart
function create_chart_press_humid(renderTo) {
  chartPH = new Highcharts.chart(renderTo,{	
    chart: {
      type: 'spline',
      inverted: false,
	},
	title: {
	  text: "Pressure - Humidity",
	  align: 'left'
	},
	subtitle: {
        text: 'Source: openweathermap.org',
        align: 'left'
    },
	series: [
	  {
		name: 'Pressure',
		type: 'line',
		yAxis: 0,
		color: Highcharts.getOptions().colors[1],//'#B200FF',
		marker: {
		  symbol: 'circle',
		  radius: 3,
		  fillColor: Highcharts.getOptions().colors[1]//'#B200FF',
		},
	  },
	  {
		name: 'Humidity',
		type: 'line',
		yAxis: 1,
		color: Highcharts.getOptions().colors[7],//'#007F0E',
		marker: {
		  symbol: 'circle',
		  radius: 3,
		  fillColor: Highcharts.getOptions().colors[7]//'#007F0E',
		}
	  }
	],
	xAxis: {
	  type: 'datetime',
	  dateTimeLabelFormats: { day: '%d.%m' },
	  gridLineWidth: 1,
	},
	yAxis: [
	  { // Primary yAxis
	    title: {
          text: 'Pressure hPa',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        labels: {
          //format: '{value}°C',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
		alignTicks: false,
        tickInterval: 15,
      }, { // Secondary yAxis
	    title: {
            text: 'Humidity, %',
            style: {
                color: Highcharts.getOptions().colors[7]
            }
        },
        labels: {
            //format: '{value} mm',
            style: {
                color: Highcharts.getOptions().colors[7]
            }
        },
		max: 100,
		min: 0,
		alignTicks: false,
        tickInterval: 25,
        opposite: true
    }],
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
	  //headerFormat: '<b>{series.name}</b><br/>', //pointFormat: '{point.x:%H:%M:%S}: {point.y}°C'
	  //pointFormat: "Fecha: {point.x:%H:%M:%S} date, <br>Evento: {point.myData}  "
    }
  });
}

// Create Clouds - Probability of precipitation Chart
function create_chart_clouds_pop(renderTo) {
  chartClPop = new Highcharts.chart(renderTo,{	
    chart: {
      type: 'spline',
      inverted: false,
	},
	title: {
	  text: "Clouds - Probab. of precip.",
	  align: 'left'
	},
	subtitle: {
        text: 'Source: openweathermap.org',
        align: 'left'
    },
	series: [
	  {
		name: 'Clouds',
		type: 'line',
		color: Highcharts.getOptions().colors[0],//'#B200FF',
		marker: {
		  symbol: 'circle',
		  radius: 3,
		  fillColor: Highcharts.getOptions().colors[0]//'#B200FF',
		},
	  },
	  {
		name: 'Probab. of precip.',
		type: 'line',
		color: Highcharts.getOptions().colors[9],//'#007F0E',
		marker: {
		  symbol: 'circle',
		  radius: 3,
		  fillColor: Highcharts.getOptions().colors[9]//'#007F0E',
		}
	  }
	],
	xAxis: {
	  type: 'datetime',
	  dateTimeLabelFormats: { day: '%d.%m' },
	  gridLineWidth: 1,
	},
	yAxis: [
	  { // Primary yAxis
	    title: {
          text: '%'
        },
		max: 100,
		min: 0,
		alignTicks: false,
        tickInterval: 20,
    }],
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
    }
  });
}

// Create Wind Chart
function create_chart_wind(renderTo) {
  chartW = new Highcharts.chart(renderTo,{	
    chart: {
      type: 'spline',
      inverted: false,
	},
	title: {
	  text: "Wind",
	  align: 'left'
	},
	subtitle: {
        text: 'Source: openweathermap.org',
        align: 'left'
    },
	series: [
	  {
		name: 'Wind speed',
		type: 'line',
		yAxis: 0,
		color: Highcharts.getOptions().colors[7],//'#B200FF',
		marker: {
		  symbol: 'circle',
		  radius: 3,
		  fillColor: Highcharts.getOptions().colors[7]//'#B200FF',
		},
	  },
	  {
		name: 'Wind direct',
		type: 'line',
		yAxis: 1,
		color: Highcharts.getOptions().colors[2],//'#007F0E',
		marker: {
		  symbol: 'circle',
		  radius: 3,
		  fillColor: Highcharts.getOptions().colors[2]//'#007F0E',
		}
	  }
	],
	xAxis: {
	  type: 'datetime',
	  dateTimeLabelFormats: { day: '%d.%m' },
	  gridLineWidth: 1,
	},
	yAxis: [
	  { // Primary yAxis
	    title: {
          text: 'Speed m/s',
          style: {
            color: Highcharts.getOptions().colors[7]
          }
        },
        labels: {
          //format: '{value}°C',
          style: {
            color: Highcharts.getOptions().colors[7]
          }
        },
		min: 0,
		alignTicks: false,
        tickInterval: 5,
    }, { // Secondary yAxis
	    title: {
            text: 'Direction Degrees',
            style: {
                color: Highcharts.getOptions().colors[2]
            }
        },
        labels: {
            //format: '{value} mm',
            style: {
                color: Highcharts.getOptions().colors[2]
            }
        },
		max: 360,
		min: 0,
		alignTicks: false,
        tickInterval: 90,
        opposite: true
    }],
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
	  //headerFormat: '<b>{series.name}</b><br/>', //pointFormat: '{point.x:%H:%M:%S}: {point.y}°C'
	  //pointFormat: "Fecha: {point.x:%H:%M:%S} date, <br>Evento: {point.myData}  "
    }
  });
}