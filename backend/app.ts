import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse incoming requests
app.use(express.json());

// Define API routes
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

export default app;
