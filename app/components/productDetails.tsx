import { Star } from "lucide-react"
import { Info } from 'lucide-react';
import { Product } from "../product/[id]/page"
import { General } from "./section/general"
import { Dimensions } from "./section/dimensions"
import { Connectivity } from "./section/connectivity"
import Image from "next/image";
import { PaperHandling } from "./section/paperHandling";

export const ProductDetails = ({ product }: Product) => {
    return (
        <div className=" flex max-w-[700px] ">
            <div className="space-y-2 py-2 container">
                <h2 className="text-gray-500 font-medium uppercase">{product.productTitle}</h2>
                <div>
                    <p className=' text-gray-400 font-bold font-medium flex items-center gap-2 p-2'>
                        <span className='flex  justify-center items-center text-white text-sm  bg-[#388e3c] rounded-md' style={{ padding: '0px 16px', }}>
                            {product.rating}.
                            <Star fill="#fff" className='w-[15px] ' />
                        </span>
                        4,610 Ratings & 564 Reviews
                        <Image src='/next.jpg ' alt="next" width={100} height={100} />
                    </p>
                </div>
                <hr />
                <p className='text-green-600 font-medium'>Special price</p>
                <div className="flex items-center gap-3">
                    <p className="text-black font-bold text-3xl	 max-w-[150px]">₹{product.price}</p>
                    <span className="text-gray-500 line-through	">₹{product.discountedPrice}</span>
                    <span className="text-green-600 font-bold">{product.discountPercentage}% off </span>
                    <Info className="text-gray-400" />
                </div>
                <p className="text-green-600 font-medium">inclusive of all taxes</p>

                <div className="pb-5">
                    <h2 className="font-bold text-xl">Product Details:</h2>
                    <div>
                        {
                            product.productDetails.map((item, index) => (
                                <ul key={index}>
                                    <li className="text-gray-500">{item}</li>
                                </ul>
                            ))}
                    </div>
                </div>
                <div>
                    <Image src='/super-coin.webp' alt="super-coin" className="w-1/2" width={200} height={200} />
                </div>

                <div className="border-gray-300 border w-full p-5">
                    <h2 className="font-bold text-xl pb-5">Specifications</h2>
                    <hr className="mb-5" />
                    <div>
                        <General product={product} />
                        <Dimensions product={product} />
                        <Connectivity product={product} />
                        <PaperHandling product={product} />
                    </div>
                </div>
            </div>
        </div>
    )
}
