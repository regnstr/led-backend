const express = require('express');
const morgan = require('morgan');

const moment = require('moment');
const _ = require('lodash');

const chalk = require('chalk');
require('log-timestamp')(() => '[' + chalk.gray(moment().format(moment.HTML5_FMT.DATETIME_LOCAL_MS)) + ']');

const fs = require('fs').promises;

const app = express();

const cors = require('cors');

const axios = require('axios');


const NUM_LEDS = 1000;

const initialData = Array(NUM_LEDS).fill(false);

let ledData = initialData;
let index = 0;

setInterval(() => {
  ledData[index] = !ledData[index];
  index++;
  if(index == NUM_LEDS) {
    index = 0;
  }
}, 1000);


function toggleLed(index) {
  ledData[index] = !ledData[index];
}


// Use 'dev' for logging
app.use(morgan('dev'));

app.use(cors());
app.use(express.json());

app.get('/', (req, res)  => {
  res.send(JSON.stringify(ledData));
});

app.post('/', (req, res) => {
  //console.log(req.body);
  console.log(req.body.index);
  toggleLed(req.body.index);
  res.send(JSON.stringify(ledData));
});

const PORT = 5001;

// run the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});