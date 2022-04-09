/*
 Прогноз от openweathermap 31-03-22
 По предоставленному коду  Вызов:https://api.openweathermap.org/data/2.5/onecall?lat=50&lon=36.2&exclude=current,minutely,hourly,alerts&units=metric&appid=25446dc6c2ea52216ff635d00e0fcca9
 
 Переделано под axios из-за ошибки 404. 04-04-18
 На основе модуля allmetsat.js
 response.data.daily - массив [8].
 Каждый элемент daily:
	dt: 1648717200,
    sunrise: 1648696470,
    sunset: 1648742645,
    moonrise: 1648696920,
    moonset: 1648739040,
    moon_phase: 0.97,
    temp: {
      day: 12.1,
      min: 6.84,
      max: 16.45,
      night: 12.59,
      eve: 15.31,
      morn: 6.84
    },
    feels_like: { day: 11.12, night: 11.52, eve: 14.28, morn: 5.1 },
    pressure: 1007,
    humidity: 67,
    dew_point: 5.92,
    wind_speed: 7.32,
    wind_deg: 205,
    wind_gust: 13.72,
    weather: [ [Object] ],
    clouds: 100,
    pop: 0.78,
    uvi: 2.75
*/

var cheerio = require('cheerio');
const axios = require("axios");

function getCoffee() {
  return new Promise(resolve => {
    setTimeout(() => resolve('☕'), 1000); // it takes 2 seconds to make coffee
  });
}

module.exports.forec = async function(url) {
  var coffee = await getCoffee();
  
  // Данные
  var data = {};
  var t_max = [];
  var t_min = [];
  var arr = new Array(8);
    
  try {
	url = 'https://api.openweathermap.org/data/2.5/onecall?' + url + '&exclude=current,minutely,hourly,alerts&units=metric&appid=25446dc6c2ea52216ff635d00e0fcca9';
    const response = await axios.get(url); // Функция async может содержать выражение await, которое приостанавливает выполнение функции async и ожидает ответа от переданного Promise, затем возобновляя выполнение функции async и возвращая полученное значение.
	//response.data.daily.forEach((item, index) => {
	//  arr[index] = item.clouds;//.clouds;
	//});
	//return arr;
	
	return response.data.daily;
  } catch (error) {
    //console.error('--- error:',error);
    //console.log('--- status:',response.status) // 200
    //console.log('--- statusText:',response.statusText) // OK
    //console.log('--- headers:',response.headers) 
    //console.log('--- config:',response.config) 
    //console.log(response.request)
    return error
  }
};

var URLs = [];
URLs.push('lat=50.0&lon=36.2');          // 0 Kharkiv
URLs.push('lat=-89.0&lon=36.2');         // 1 New York
URLs.push('http://en.allmetsat.com/weather-forecast/asia.php?city=beijing-cn');                            // 2 Beijing
URLs.push('http://en.allmetsat.com/weather-forecast/germany.php?city=berlin-de');                          // Berlin (3 Anadyr)
URLs.push('http://en.allmetsat.com/weather-forecast/alaska-anchorage-fairbanks.php?city=anchorage-us-ak'); // 4 Anchorage, Alaska, USA
URLs.push('http://en.allmetsat.com/weather-forecast/north-america.php?city=los-angeles-us-ca');            // 5 Los Angeles
URLs.push('http://en.allmetsat.com/weather-forecast/north-america.php?city=mexico-mx');                    // 6 Mexico
URLs.push('http://en.allmetsat.com/weather-forecast/north-america.php?city=calgary-ca-ab');                // Calgary (7 Hammerfest)
URLs.push('http://en.allmetsat.com/weather-forecast/europe.php?city=istanbul-tr');                         // 8 Istanbul
URLs.push('http://en.allmetsat.com/weather-forecast/europe.php?city=paris-fr');                            // Paris (9 Krasnoyarsk Opytnoe Pole)
URLs.push('http://en.allmetsat.com/weather-forecast/europe.php?city=stockholm-se');                        // Stockholm (10 Lahore City)
URLs.push('http://en.allmetsat.com/weather-forecast/united-kingdom-ireland.php?city=london-eng');          // 11 London
URLs.push('http://en.allmetsat.com/weather-forecast/south-atlantic.php?city=buenos-aires-ar');             // Buenos-Aires (12 Moscow)
URLs.push('http://en.allmetsat.com/weather-forecast/north-america.php?city=toronto-ca-on');                // Toronto (13 Santiago)
URLs.push('http://en.allmetsat.com/weather-forecast/south-america.php?city=rio-de-janeiro-br-rj');         // Rio de Janeiro (14 Sao Paulo)
URLs.push('http://en.allmetsat.com/weather-forecast/asia.php?city=seoul-kr');                              // 15 Seoul
URLs.push('http://en.allmetsat.com/weather-forecast/asia.php?city=shanghai-cn');                           // 16 Shanghai
URLs.push('http://en.allmetsat.com/weather-forecast/antarctic.php?city=amundsen-scott-south-pole-station-aq'); // 17 South Pole
URLs.push('http://en.allmetsat.com/weather-forecast/north-america.php?city=chicago-us-il');                // Chicago (18 Saint Petersburg)
URLs.push('http://en.allmetsat.com/weather-forecast/australia-oceania.php?city=sydney-au');                // 19 Sydney
URLs.push('http://en.allmetsat.com/weather-forecast/japan-tokyo.php?city=tokyo-jp');                       // 20 Tokyo
module.exports.URLs = URLs;