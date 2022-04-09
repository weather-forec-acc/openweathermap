const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();

//const { Client, Query } = require('pg');
//const client = require('./lib/db') // Это использоваось
var colors = require('colors');

/*
if (process.env.DATABASE_URL) {
  var connectString = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
} else {
  var connectString = {
    user: 'postgres',
    password: 'postgres',
    database: 'openweathermap'
  };
}
*/

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'openweathermap',
    password: 'postgres',
    port: 5432,
});

client.connect();

// Configuration
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/css/fonts'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/utility/js'));

app.get('/',function(req,res){
  res.sendFile(__dirname + '/pages/index.html');
});

app.get('/home',function(req,res){
  res.sendFile(__dirname + '/pages/home.html');
});

app.get('/details',function(req,res){
  res.sendFile(__dirname + '/pages/details.html');
});

app.get('/service',function(req,res){
  res.sendFile(__dirname + '/pages/service.html');
});

app.get('/forecasts',function(req,res){
  res.sendFile(__dirname + '/pages/forecasts.html');
});

app.get('/about',function(req,res){
  res.sendFile(__dirname + '/pages/about.html');
});

app.get('/visitors',function(req,res){
  res.sendFile(__dirname + '/pages/visitors.html');
});

// Main route sends our HTML file
app.get('/get-forecasts-and-stat', function(req, res) {
  // Не используется. Необходима была только для показа всех прогнозов для ручной проверки сбора статистики. Вызывается как http://localhost:3000/get-all-forecasts
  res.sendFile(__dirname + '/utility/pages/get-forecasts-and-stat.html');
})

app.get('/stat-load', function(req, res) {
  // Загружаем всю статистику из БД с главной страницы home.html.
  // Возвращает статистику из БД. Вызывается из home-stat.js
  client.query('SELECT * from statistic')
  .then(result => {
    res.send(result.rows);
  })
  .catch(e => {
    console.log('Select from table statistic error:', e.message, e.stack);
  })
});

app.get('/average-load', function(req, res) {
  // Загружаем все средние т-ры из БД с главной страницы home.html.
  // Возвращает средние т-ры из БД. Вызывается из home-stat.js
  client.query('SELECT * from average')
  .then(result => {
    res.send(result.rows);
  })
  .catch(e => {
    console.log('Select from table average error:', e.message, e.stack);
  })
});

app.get('/all', function(req, res){
  // Все прогнозы
  client.query('SELECT * from forecasts')
  .then(result => {
    res.send(result.rows);
  })
  .catch(e => {
    console.log('Select from table forecasts error:', e.message, e.stack);
  })
});

app.get('/last', function(req, res){
  // Последние прогнозы
  //client.query('SELECT * from forecasts where utc_date in (select max(utc_date) from forecasts group by site_id, city_id)')
  client.query('SELECT * from forecasts where utc_date in (select max(utc_date) from forecasts)')
  .then(result => {
    res.send(result.rows);
  })
  .catch(e => {
    console.log('Select from table forecasts error:', e.message, e.stack);
  })
});

app.listen(PORT, function () {
  console.log(`Express server is listening on ${PORT}`);
});
