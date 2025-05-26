import express from 'express';
import dotenv from 'dotenv';
import { initDB, sql } from './config/db.js'; // Adjust the path as necessary
import rateLimiter from './middleware/rateLimiter.js';

import transactionsRoutes from './routes/transactionsRoutes.js'; // Adjust the path as necessary

dotenv.config();

const app = express();

app.use(rateLimiter); // Apply rate limiting middleware
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 5001;


app.use("/api/transactions", transactionsRoutes);
app.use("/api/products", transactionsRoutes); 


initDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on http://localhost:PORT', PORT);
  });
  
});


