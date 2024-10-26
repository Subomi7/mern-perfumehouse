import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import mongoose from 'mongoose'; //anything with database is asycronous
import { connect } from './db/db.js';
import dotenv from 'dotenv';
import productRoute from './routes/productRoute.js';
import authRoute from './routes/authRoute.js';
import orderRoute from './routes/orderRoute.js';
import cors from 'cors';

dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/api/product', productRoute);
app.use('/api/auth', authRoute);
app.use('/api/order', orderRoute);
app.get('/', function (req, res) {
  res.status(200).json({ success: true, message: 'server is live' });
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
