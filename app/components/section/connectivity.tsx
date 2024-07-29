import { Product } from "../../product/[id]/page";

export const Connectivity = ({ product }: Product) => {
    return (
        <div className="p-4">
            <h2 className="text-black font-semibold pb-3">Connectivity</h2>
            <table className="w-full">
                <tbody>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2 block">USB Support:</td>
                        <td className="text-black py-2">{product.specifications.Connectivity.USB_support}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2 ">Wireless Support:</td>
                        <td className="text-black py-2 ">{product.specifications.Connectivity.Wireless_Support}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}