import express from 'express';
const app = express();
const port = 3000;
import mongoose from 'mongoose'; //anything with database is asycronous
import { connect } from './db/db.js';
import dotenv from "dotenv"


dotenv.config()



app.get('/', function (req, res) {
  res.send('Hello World');
});

app.use(function (req, res) {
  res.status(404).json({ errMsg: 'route not found' });
});

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`http://localhost:${port}`);
      });
    } catch (error) {
      console.log('cannot connect to server' + error.message);
    }
  })
  .catch((error) => {
    console.log('invalid database connection' + error.message);
  });
