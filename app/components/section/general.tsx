import { Product } from "../../product/[id]/page"

export const General = ({ product }: Product) => {
    return (

        <div className="p-4">
            <h2 className="text-black font-semibold pb-3">General</h2>
            <table className="w-full">
                <tbody>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2">Printing Method:</td>
                        <td className="text-black py-2">{product.specifications.General.Printing_Method}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2">Type:</td>
                        <td className="text-black py-2">{product.specifications.General.type}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2">Model Name:</td>
                        <td className="text-black py-2">{product.specifications.General.Model_Name}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2">Printing Output:</td>
                        <td className="text-black py-2">{product.specifications.General.Model_Name}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2">Functions:</td>
                        <td className="text-black py-2">{product.specifications.General.Functions}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2">Brand:</td>
                        <td className="text-black py-2">{product.specifications.General.Brand}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2">Refill Type:</td>
                        <td className="text-black py-2">{product.specifications.General.Refill_Type}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2">Ideal Usage:</td>
                        <td className="text-black py-2">{product.specifications.General.Ideal_Usage}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2 flex flex-wrap w-[150px]">Voice Assistant Compatibility:</td>
                        <td className="text-black py-2">{product.specifications.General.Voice_Assistant_Compatibility}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}