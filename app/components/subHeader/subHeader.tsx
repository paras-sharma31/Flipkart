import { useEffect, useState } from "react";
import { Filter } from "../clientComponent";
import SortBy from "./sortBy/sortBy";

interface SortBy {
    setFilters: React.Dispatch<React.SetStateAction<Filter>>;
}
const SubHeader = ({ setFilters }: SortBy) => {
    const [createdAt, setCreatedAt] = useState<string>("")
    const [sortOrder, setSortOrder] = useState<string>("")
    const [sortField, setSortField] = useState<string>("")

    useEffect(() => {
        const filters: Filter = {}
        if (createdAt.length > 0) filters.createdAt = createdAt
        if (sortOrder.length > 0) filters.sortOrder = sortOrder
        if (sortField.length > 0) filters.sortField = sortField
        setFilters(filters);
    }, [createdAt, sortField, sortOrder])

    return (
        <div className="bg-white p-2" >
            <SortBy
                setCreatedAt={setCreatedAt}
                setSortOrder={setSortOrder}
                setSortField={setSortField}
            />
        </div>
    )
}
export default SubHeader;