import { Request, Response } from 'express';
import Product from '../models/product/productModel';

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
    try {
        // Destructure the body to get product data
        const { name, description, price, category, stock } = req.body;

        // Create a new product instance
        const newProduct = new Product({ name, description, price, category, stock });

        // Save the product to the database
        await newProduct.save();

        // Respond with the newly created product
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// Get all products
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};
