import { Product } from "../../product/[id]/page"

export const PaperHandling = ({ product }: Product) => {
    return (
        <div className="p-4">
            <h2 className="text-black font-semibold pb-3">Paper Handling</h2>
            <table className="w-full">
                <tbody>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2">Auto Document Feeder:</td>
                        <td className="text-black py-2">{product.specifications.Paper_Handling?.Auto_Document_Feeder}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="text-gray-500 font-semibold py-2">Media Size Supported:</td>
                        <td className="text-black py-2">
                            <ul className="flex flex-wrap">
                                {product.specifications.Paper_Handling?.Media_size_supported?.map((item, index) => (
                                    <li key={index} className="text-sm" >{item},</li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-gray-500 font-semibold py-2">Auto Document Feeder:</td>
                        <td className="text-black py-2">{product.specifications.Paper_Handling?.Auto_Document_Feeder}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}
