'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const redis = require('redis');
const fs = require('fs').promises;
const { promisify } = require("util");

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const {
  PORT:port = 9010,
  HOST:host = 'localhost'
} = process.env;

/**
 * Allow CORS
 */
 app.use(cors());

app.get('/', (req, res) => res.send('All good here.'));

app.get('/file/list', async (req, res) => {
  const data = await fs.readFile('./data/list.json');
  return res.status(200).json(JSON.parse(data));
});

app.get('/file/item', async (req, res) => {
  const data = await fs.readFile('./data/item.json');
  return res.status(200).json(JSON.parse(data));
});

app.get('/redis/list', async (req, res) => {
  let data = await getAsync('list');
  if (!data) {
    data = await fs.readFile('./data/list.json');
    await setAsync('list', data);
  }
  return res.status(200).json(JSON.parse(data));
});

app.get('/redis/item', async (req, res) => {
  let data = await getAsync('item');
  if (!data) {
    data = await fs.readFile('./data/item.json');
    await setAsync('item', data);
  }
  return res.status(200).json(JSON.parse(data));
});

/**
 * Start the server
 */
 http.listen(port, host, function(){
  console.log(`Server started at the address ${host}:${port}`);
})

module.exports = app;