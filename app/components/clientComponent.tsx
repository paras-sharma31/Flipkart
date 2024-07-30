'use client';
import { useEffect, useState } from 'react';
import ProductList from './productList';
import { fetchProducts } from '../page';

export interface Product {
    _id: string;
    productTitle: string;
    price: number;
    description: string;
    headImage: string;
    rating: number;
    discountPercentage: number;
    discountedPrice: number;
}

export interface Filter {
    brand?: string[];
    rating?: number[];
    minPrice?: string;
    maxPrice?: string;
    createdAt?: string;
    sortOrder?: string;
    sortField?: string;
}
export interface PageProps {
    initialData: Product[],
    initialFilters: Filter
}

const ClientComponent = ({ initialData, initialFilters }: PageProps) => {
    const [data, setData] = useState<Product[]>(initialData);
    const [filters, setFilters] = useState<Filter>(initialFilters);
    useEffect(() => {
        const fetchFilteredProducts = async () => {
            const filteredData = await fetchProducts(filters);
            setData(filteredData);
        };
        fetchFilteredProducts();
    }, [filters]);

    return (
        <ProductList data={data} setFilters={setFilters} />
    )
};

export default ClientComponent;
