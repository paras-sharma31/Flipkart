import Image from "next/image"
import { Product } from "../../product/[id]/page"

export const SlideImages = ({ product, onHover }: Product) => {
    console.log(product, "02840238402804280482")
    return (

        <div className="pr-3">
            <ul className="space-y-4 h-[390px] overflow-scroll">
                {
                    product.DescriptiveImages.map((image, index) =>
                        <li key={index}>
                            <div className="w-[70px] h-[70%] p-1">
                                <Image src={image} alt='' width={100} height={100}
                                    onMouseEnter={() => onHover(image)}
                                />
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}