import { IProduct } from './product';

export interface IOrder {
    _id?: string;
    userId: string;
    products: Array<{
        product: IProduct;
        quantity: number;
    }>;
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt?: Date;
    updatedAt?: Date;
}
