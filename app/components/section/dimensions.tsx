import { Product } from "../../product/[id]/page";

export const Dimensions = ({ product }: Product) => {
    return (
        <div className="p-4">
            <h2 className="text-black font-semibold pb-3">Dimensions And Weight</h2>
            <table className="w-full">
                <tbody>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2">Height:</td>
                        <td className="text-black py-2">{product.specifications.Dimensions_And_Weight.Height}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2">Width:</td>
                        <td className="text-black py-2">{product.specifications.Dimensions_And_Weight.Width}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2">Weight:</td>
                        <td className="text-black py-2">{product.specifications.Dimensions_And_Weight.weight}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2">Depth:</td>
                        <td className="text-black py-2">{product.specifications.Dimensions_And_Weight.Depth}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
} 