'use strict';
require('dotenv').config();
const db = require('./app/lib/pg');
const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')

var userRouter = require('./app/api/user')
var drugRouter = require('./app/api/drug')
var prescriptionRouter = require('./app/api/prescription')
var labRouter = require('./app/api//lab')

var { jwtDecode } = require('./app/utils/middleware')

const cookieParser = require('cookie-parser');

// Constants
const PORT = 1000;
const HOST = '0.0.0.0';

db.migrate()
  .then()
  .catch()

// App
const app = express();

//for test
app.use(cors({
  origin: '*'
}));
app.use(cookieParser());


// app.options('http://localhost:3000', cors());  // enable pre-flight
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log(process.env.DB_HOST)
  // res.status(200)
  res.send(' aaass: ');
});

app.use('/user', userRouter);
app.use('/drug', drugRouter);
app.use('/prescription', prescriptionRouter);
app.use('/lab', labRouter);

app.listen(PORT, HOST);
console.log(`Running on PORT 1000`);
