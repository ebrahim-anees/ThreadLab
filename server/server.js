import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './configs/mongodb.js';
import authRouter from './routes/auth/authRoutes.js';
import adminProductsRouter from './routes/admin/productsRoutes.js';
import adminOrdersRouter from './routes/admin/ordersRoutes.js';
import shopProductRouter from './routes/shop/productsRoutes.js';
import shopCartRouter from './routes/shop/cartRoutes.js';
import shopAddressRouter from './routes/shop/addressRoutes.js';
import shopOrderRouter from './routes/shop/orderRoutes.js';
import shopSearchRouter from './routes/shop/searchRoutes.js';
import productReviewRouter from './routes/shop/productReviewRoutes.js';
import commonFeaturesRouter from './routes/common/featuresRoutes.js';
const app = express();
try {
  await connectDB();
  console.log('✅ Connected to MongoDB');
} catch (err) {
  console.error('❌ Failed to connect to MongoDB:', err);
  // Optionally rethrow or handle
}
app.use(
  /// CORS (Cross-Origin Resource Sharing) allows your backend to accept requests from different domains (like your frontend running on localhost:5173 — probably Vite or React).
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5174', /// Only allow requests from this frontend URL
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
console.log('🟣 Middleware setup complete');

app.use(cookieParser());
app.use(express.json());
app.get('/', (req, res) => res.send('API works!'));

console.log('🟠 Registering routes...');
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/admin/orders', adminOrdersRouter);
app.use('/api/shop/products', shopProductRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/review', productReviewRouter);
app.use('/api/common/features', commonFeaturesRouter);

console.log('✅ All routes registered');

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log('Server is running on port: ' + PORT));

export default app;
