import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './configs/mongodb.js';
import authRouter from './routes/auth/authRoutes.js';
import adminRouter from './routes/admin/productsRoutes.js';
import shopRouter from './routes/shop/productsRoutes.js';
const app = express();
await connectDB();
app.use(
  /// CORS (Cross-Origin Resource Sharing) allows your backend to accept requests from different domains (like your frontend running on localhost:5173 — probably Vite or React).
  cors({
    origin: 'http://localhost:5173', /// Only allow requests from this frontend URL
    methods: ['GET', 'POST', 'DELETE', 'PUT'], ///  Allow these HTTP methods
    allowedHeaders: [
      /// Headers allowed in requests
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma',
    ],
    credentials: true, /// this tells the browser to send cookies/auth
  })
);
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminRouter);
app.use('/api/shop/products', shopRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server is running on port: ' + PORT));
