import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from '../../interfaces/product';

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        stock: { type: Number, default: 0 },
        
    },
    { timestamps: true }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
