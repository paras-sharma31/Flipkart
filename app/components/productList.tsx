'use client';
import { Product, Filter } from './clientComponent';
import Link from 'next/link';
import Image from 'next/image';
import { Sidebar } from './sidebar/sidebar';
import { Star, Heart } from 'lucide-react';
import SubHeader from './subHeader/subHeader';


interface ProductListProps {
    data: Product[];
    setFilters: React.Dispatch<React.SetStateAction<Filter>>;
}

const ProductList: React.FC<ProductListProps> = ({ data, setFilters }) => {

    return (
        <section>
            <SubHeader setFilters={setFilters} />
            <div className='bg-[#f1f3f5] pb-10'>
                <div className="container pt-5">
                    <div className=" w-ful flex gap-4">
                        <Sidebar setFilters={setFilters} />
                        <div className=" w-full flex gap-4 flex-wrap bg-[#fff]">
                            {data.map((product) => (
                                <div
                                    className="main-conatiner px-4 w-[24%] h-[400px] transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-103 hover:shadow-lg duration-300 ..."
                                    key={product._id}
                                >
                                    <Link href={`/product/${product._id}`}>
                                        <div className='flex justify-end pt-5'>
                                            <Heart fill='#c2c2c2' color='#c2c2c2' className='w-[15px]' />
                                        </div>
                                        <div className="flex justify-center">
                                            <Image
                                                className="h-[200px] pt-2 object-contain"
                                                src={product.headImage}
                                                alt={product.productTitle}
                                                width={200}
                                                height={300}
                                            />
                                        </div>
                                        <div className="pt-10 ">
                                            <h2 className="text-black text-sm font-normal uppercase line-clamp-2 title">
                                                {product.productTitle}
                                            </h2>
                                        </div>
                                        <div>
                                            <p className=' text-gray-400 font-bold text-sm flex items-center gap-1 pt-2'>
                                                <span className='flex  justify-center items-center text-white text-sm  
                                                    bg-[#388e3c] rounded-md' style={{ padding: '0px 10px', }}>
                                                    {product.rating}
                                                    <Star fill="#fff" className='w-[10px] ' />
                                                </span>
                                                (4,610)
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-black font-bold text-md max-w-[150px] text-center">₹{product.price}</p>
                                            <span className="text-gray-500 text-sm line-through text-center	">₹{product.discountedPrice}</span>
                                            <span className="text-green-600 text-sm font-bold text-center">{product.discountPercentage}% off </span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductList;
