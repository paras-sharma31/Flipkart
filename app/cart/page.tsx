'use client';
import { FC } from 'react';
import ProductCart from '../components/productCart/productCart';

interface Items {
    printerId: string;
    quantity: number;
}

export interface Cart {
    _id: string;
    userId: string;
    items: Items[];
}

// Async function to fetch the cart data
export const fetchCart = async (printerId: string): Promise<Cart | undefined> => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;

    if (token) {
        const response = await fetch(`https://flipakartworking.onrender.com/api/cart/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ printerId })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch product cart');
        }

        const data: Cart = await response.json();
        return data;
    } else {
        const currentData: Cart = JSON.parse(localStorage.getItem('productsData') || '[]');
        return currentData;
    }
}
const CartPage: FC = () => {
    return (
        <div>
            <ProductCart />
        </div>
    );
}
export default CartPage; 