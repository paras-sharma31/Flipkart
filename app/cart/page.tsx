'use client';
import { useEffect, useState } from 'react';
import ProductCart from '../components/productCart/productCart';
import { useParams, useRouter } from 'next/navigation';

interface Items {
    printerId: string;
    quantity: number;
}

export interface Cart {
    _id: string;
    userId: string;
    items: Items[];
}

export const fetchCart = async (printerId: string): Promise<void> => {
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
        const data = await response.json();
        return data;
    }
    const currentData = JSON.parse(localStorage.getItem('productsData') || '[]');
    console.log(currentData, "Data from local storage");
}

const Cart = () => {
    // const params = useParams<{ id: string }>()
    // const [error, setError] = useState<string | null>(null);
    // const [cartData, setCartData] = useState<Cart | null>(null);
    // const router = useRouter();
    // const printerId = params.id
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const user = JSON.parse(localStorage.getItem('user') || '{}');
    //             const token = user.token;

    //             if (token) {
    //                 const data = await fetchCart(printerId);
    //                 setCartData(data);
    //                 router.push('/cart');
    //             } else {
    //                 const data = JSON.parse(localStorage.getItem('productsData') || '[]');
    //                 setCartData(data);
    //                 console.log(data, 'nd3nd3id')
    //                 if (data.length > 0) {
    //                     console.log("ENTERRRR")
    //                     router.push('/cart');
    //                 } else {
    //                     console.log('No products in local storage');
    //                     setError('No products in local storage');
    //                 }
    //             }
    //         } catch (error) {
    //             setError(error.message, "MESSAGE");
    //         }
    //     };

    //     fetchData();
    // }, [printerId, router]);

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <div>
            <div>
                <ProductCart />
            </div>
        </div>
    );
}
export default Cart;
