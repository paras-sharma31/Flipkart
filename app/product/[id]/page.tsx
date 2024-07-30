'use client';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingBasket, ShoppingCart } from 'lucide-react';
import { ProductDetails } from '../../components/productDetails';
import { SlideImages } from '../../components/sidebar/slideImage';
import { useRouter } from 'next/navigation';
import { fetchCart } from '../../cart/page';

interface Dimensions {
    Height: string;
    Width: string;
    weight: string;
    Depth: string;
}
interface Connectivity {
    USB_support: string;
    Wireless_Support: boolean;
}
interface Paper_Handling {
    Auto_Document_Feeder: boolean;
    Media_size_supported: [];
}
interface Scan {
    Optical_scanning_resolution: string;
}
interface Copy {
    Maximum_Multicopy: string;
}
interface System_Requirements {
    Compatible_Operating_System: [];
}
interface General {
    Printing_Method: string;
    type: string;
    Model_Name: string;
    Printing_Output: string;
    Functions: string;
    Brand: string;
    Refill_Type: string;
    Ideal_Usage: string;
    Voice_Assistant_Compatibility: string;
}
interface Specification {
    General: General;
    Dimensions_And_Weight: Dimensions;
    Connectivity: Connectivity;
    Paper_Handling: Paper_Handling;
    scan: Scan;
    Copy: Copy;
    System_Requirements: System_Requirements;
}
export interface ProductPage {
    _id: string;
    productTitle: string;
    price: number;
    discountPercentage: number;
    discountedPrice: number;
    headImage: string;
    rating: number;
    DescriptiveImages: [];
    Brand: string;
    productDetails: [];
    specifications: Specification;
}
export interface ProductDetailProps {
    params: { id: string };
}
export interface Product {
    product: ProductPage;
}

const fetchSingleProduct = async (id: string): Promise<ProductPage> => {
    const response = await fetch(`https://flipakartworking.onrender.com/api/printers/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    const result = await response.json();
    return result
};

const ProductButton = [
    { title: "ADD TO CART" },
    { title: "BUY NOW" }
];

const ProductDetail: FC<ProductDetailProps> = ({ params }) => {
    const router = useRouter();
    const [product, setProduct] = useState<ProductPage | null>(null);
    const [mainImage, setMainImage] = useState<ProductPage | string>("");

    console.log(product, 'dndih4dih')
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await fetchSingleProduct(params.id);
                setProduct(productData);
                setMainImage(productData.headImage)
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProduct();
    }, [params.id]);
    console.log(product, 'dec4cvd4d4fu')

    const handleProductCart = async () => {
        if (product) {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const token = user?.token;

            if (token) {
                try {
                    await fetchCart(product._id);
                    router.push(`/cart`);
                } catch (error) {
                    setError(error.message);
                }
            } else {
                const newCartItem = {
                    printerId: {
                        _id: product._id,
                        productTitle: product.productTitle,
                        headImage: product.headImage,
                        price: product.price,
                        discountPercentage: product.discountPercentage,
                        discountedPrice: product.discountedPrice,
                    },
                    quantity: 1,
                };

                // Retrieve the current cart data from localStorage
                let currentCart = [];
                try {
                    currentCart = JSON.parse(localStorage.getItem('productsData') || '[]');
                    if (!Array.isArray(currentCart)) {
                        currentCart = [];
                    }
                } catch (error) {
                    currentCart = [];
                }
                const updatedCart = [...currentCart, newCartItem];
                localStorage.setItem('productsData', JSON.stringify(updatedCart));
                setProduct((prev) => ({ ...prev, data: updatedCart }));

                router.push('/cart');
            }
        } else {
            console.log('No products in local storage');
            setError('No products in local storage');
        }
    };



    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className=''>
            <div className="p-4 w-full  bg-[#f1f3f5]">
                <div className='bg-[#fff] grid grid-cols-2 p-3'>
                    <div className=" h-[100vh]" style={{ position: 'sticky', top: '0', overflow: 'auto' }}>
                        <div className="px-4 border border-gray-200 rounded-xl max-w-[700px] h-[400px] 
                            text-lg" key={product._id}>
                            <div className="flex">
                                <div className="border-gray-200 border-r-2">
                                    <SlideImages product={product} onHover={setMainImage} />
                                </div>
                                <Image className="w-[90%] h-[400px] p-5 object-contain"
                                    src={mainImage || product.headImage} alt={product.productTitle}
                                    width={200} height={300} />
                            </div>
                        </div>
                        <div className=" pt-3 flex items-center justify-center gap-4">
                            {ProductButton.map((item) => (
                                item.title === "ADD TO CART" ? (
                                    <button
                                        className="rounded-sm text-md bg-[#ff9f00] text-white font-bold text-lg 
                                        flex items-center gap-2 justify-center"
                                        style={{ padding: "20px 60px" }}
                                        key={product._id}
                                        onClick={handleProductCart}
                                    >
                                        <ShoppingBasket />
                                        {item.title}
                                    </button>
                                ) : (
                                    <button
                                        className="rounded-sm text-md bg-[#fb641b] text-white font-bold text-lg 
                                        flex items-center gap-2 justify-center"
                                        style={{ padding: "20px 60px" }}
                                        key={product._id}
                                    >
                                        <ShoppingCart />
                                        {item.title}
                                    </button>
                                )
                            ))}
                        </div>
                    </div>
                    <ProductDetails product={product} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
