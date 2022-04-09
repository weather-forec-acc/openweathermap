// 15-01-18 Тествая программа для проверки новых скриптов, получающих прогноз и переделанных из PHP
// Сбор и запись в БД прогнозов по всем сайтам и н.п.
// Последнее использование 27-04-20.
// 31-03-2022 Новое использование для подготовки сервера прогноза погоды на ESP8266.
// 07-04-2022 Соединение с БД облака ElethantSQL.

/*
	Возвращает массив, каждый элемент массива:
	dt: 1648717200, GMT: Thursday, 31 March 2022 г., 9:00:00 Your time zone: четверг, 31 марта 2022 г., 12:00:00 GMT+03:00 DST
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
    weather: [ {
			"id":803,
			"main":"Clouds",
			"description":"broken clouds", облачность с просветами разорванные облака Рваные облака разорванные облака
			"icon":"04d"} ],
    clouds: 100,
    pop: 0.78,
    uvi: 2.75
  */
  
const colors = require('colors');
const pg = require('pg');

const openweathermap = require('./openweathermap');

const config = {
    host: 'manny.db.elephantsql.com',
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: 'mbpmvews',     
    password: 'h5wF7FdzZSm3QswPt88ak9LaZU72jQHi',
    database: 'mbpmvews',
    port: 5432,
    ssl: true
};
const client = new pg.Client(config);

//var temp_max = [12, 12, 16, 4, 12];
//var temp_min = [6, 5, 8, -2, 0];

var dt = new Array(); 
var clouds = new Array();
var temp_min = new Array();
var temp_max = new Array();
var prob_prec = new Array();
var pressure = new Array();
var humidity = new Array();
var wind_speed = new Array();
var wind_deg = new Array();
var uv_index = new Array();

// 1 Прогнозы от openweathermap
var urls = openweathermap.URLs;
openweathermap.forec(urls[0])
  .then(response => {
  //Возвращает массив, каждый элемент массива: см. выше.
  response.forEach((item, index) => {
	dt[index] = new Date(item.dt*1000); // var date = new Date(unix_timestamp * 1000); 
	clouds[index] = item.clouds;
	temp_min[index] = Math.round(item.temp.min);
	temp_max[index] = Math.round(item.temp.max);
	prob_prec[index] = Math.round(item.pop*100);
	pressure[index] = Math.round(item.pressure);
	humidity[index] = Math.round(item.humidity);
	wind_speed[index] = Math.round(item.wind_speed*100);
	wind_deg[index] = Math.round(item.wind_deg);
	uv_index[index] = Math.round(item.uvi*100);
  });
  console.log(colors.yellow("dt:"));
  console.log(dt);
  console.log(colors.yellow("Clouds:"));
  console.log(clouds);
  console.log(colors.yellow("Temp_min:"));
  console.log(temp_min);
  console.log(colors.yellow("Temp_max:"));
  console.log(temp_max);
  console.log(colors.yellow("Probability of precipitation:"));
  console.log(prob_prec);
  console.log(colors.yellow("Pressure:"));
  console.log(pressure);
  console.log(colors.yellow("Humidity:"));
  console.log(humidity);
  console.log(colors.yellow("Wind_speed:"));
  console.log(wind_speed);
  console.log(colors.yellow("Wind_deg:"));
  console.log(wind_deg);
  console.log(colors.yellow("UVI:"));
  console.log(uv_index);
  
  client.connect(err => {
	if (err) throw err;
	else {
	  queryDatabase();
	}
  });
})
.catch(error => {
  console.log(error);
});

// 2 Запись в БД
function queryDatabase() {
  const sql_create = 'CREATE TABLE IF NOT EXISTS forecasts (id SERIAL PRIMARY KEY, dt TIMESTAMP[], temp_max INTEGER[], temp_min INTEGER[], clouds INTEGER[], prob_prec INTEGER[], pressure INTEGER[], humidity INTEGER[], wind_speed INTEGER[], wind_deg INTEGER[], uv_index INTEGER[], utc_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now())';
  const sql_insert = 'INSERT INTO forecasts (dt, temp_max, temp_min, clouds, prob_prec, pressure, humidity, wind_speed, wind_deg, uv_index) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)';
  client.query(sql_create)		
    .then(() => {
      console.log('Table created successfully if it did not exist before)!');
      return client.query(sql_insert,[dt, temp_max, temp_min, clouds, prob_prec, pressure, humidity, wind_speed, wind_deg, uv_index])
    })
    .catch(err => console.log(err))
	.then(() => {
	  console.log('Table updeted successfully!');
	  return client.end(console.log('Closed client connection'));
	})
    .then(() => {
      console.log('Finished execution, exiting now');
      process.exit();
    });
}
