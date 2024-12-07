import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../interfaces/request';

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded as any; // Type appropriately based on token payload
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};
