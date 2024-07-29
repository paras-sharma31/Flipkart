import Image from "next/image"

interface propsType {
    img: string,
}
export const Slide: React.FC<propsType> = ({ img }) => {
    return (
        <div className="outline-none border-none relative ">
            <div className="absolute left-[30px] bottom-0  md:left-[70px] max-w-[250px] sm:max-w-[350px] top-[50%] 
            translate-y-[50%] space-y-2 lg:space-y-4 bg-[#ffffa2] sm: bg-transparent p-4 sm:p-0 rounded-lg sm:rounded-none ">
                <div className="bg-accent text-white text-[14px] md:text-[16px] p-2 px-4 rounded-lg inline-block
                cursor-pointer hover:bg-black">
                    Shop Now
                </div>
            </div>
            <Image
                src={img} alt="banner"
                width={2000}
                height={2000}
                loading="eager"
            />
        </div>
    )
} 