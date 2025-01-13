import express from 'express';
import cors from 'cors';

import connectDB from './db/index.js';
import { addToCart, removeFromCart, getAllCart } from './controllers/cartController.js';

const app = express();

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const start = async () => {
  try {
    connectDB();
    app.listen(8080, console.log('Server is up and running'))
  } catch (error) {
    console.log('Error from app', error);
  }
};

start();

app.put('/add-to-cart', addToCart);
app.get('/all-cart', getAllCart);
app.delete('/remove-from-cart', removeFromCart);
