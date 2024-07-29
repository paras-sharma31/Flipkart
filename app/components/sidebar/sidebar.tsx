import { useState, useEffect } from 'react';
import { Price } from './price/price';
import { Brand } from './brand/brand';
import { Ratings } from './ratings/ratings';
import { Filter } from '../clientComponent';

interface SidebarProps {
    setFilters: React.Dispatch<React.SetStateAction<Filter>>;
}

export const Sidebar = ({ setFilters }: SidebarProps) => {
    const [brand, setBrand] = useState<string[]>([]);
    const [rating, setRating] = useState<number[]>([]);
    const [minPrice, setMinPrice] = useState<{ minPrice: string }>({ minPrice: '' })
    const [maxPrice, setMaxPrice] = useState<{ maxPrice: string }>({ maxPrice: '' })

    useEffect(() => {
        const filters: Filter = {};
        if (brand.length > 0) filters.brand = brand;
        if (rating.length > 0) filters.rating = rating;
        if (minPrice.minPrice) filters.minPrice = minPrice.minPrice;
        console.log(minPrice, 'efswsswswscee')
        if (maxPrice.maxPrice) filters.maxPrice = maxPrice.maxPrice;
        setFilters(filters);
    }, [brand, rating, minPrice, maxPrice]);

    return (
        <div className="max-w-[280px] flex-shrink-0  bg-[#fff] border-none shadow-lg p-3 ">
            <div className="">
                <h2 className="text-black font-medium text-xl mb-4">Filters</h2>
                <hr className="mb-4" />
                <div>
                    <Price setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
                    <Brand selectedBrands={brand} setBrand={setBrand} />
                    <Ratings setRating={setRating} />
                </div>
            </div>
        </div>
    );
};
