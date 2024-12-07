import express from 'express';
import { createProduct, getProducts } from '../controllers/productController';

const router = express.Router();

// POST endpoint to create a new product
router.post('/', createProduct);

// GET endpoint to fetch all products
router.get('/', getProducts);

export default router;
