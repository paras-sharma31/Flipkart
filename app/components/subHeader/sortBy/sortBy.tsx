import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

interface SortByProps {
    setCreatedAt: Dispatch<SetStateAction<string>>;
    setSortOrder: Dispatch<SetStateAction<string>>;
    setSortField: Dispatch<SetStateAction<string>>;
}

const SortBy = ({ setCreatedAt, setSortOrder, setSortField }: SortByProps) => {
    const sortOptions = [
        { key: "asc", label: "Price - Low to High" },
        { key: "desc", label: "Price - High to Low" },
        { key: "createdAt", label: "Newest First" },
    ];

    const [activeSort, setActiveSort] = useState("");

    const handleSortBy = (sortOrder: string) => {
        setActiveSort((prevSortOrder) => {
            const newSortOrder = prevSortOrder === sortOrder ? "" : sortOrder;
            if (newSortOrder === "createdAt") {
                setCreatedAt(new Date().toISOString());
                setSortOrder("");
                setSortField("");
            } else {
                setCreatedAt("");
                setSortOrder(newSortOrder);
                setSortField("price");
            }
            return newSortOrder;
        });
    };

    return (
        <Box display={{ base: "none", md: "unset" }}>
            <ButtonGroup
                variant="outline"
                size="sm"
                ml={{ base: "0", md: "225px" }}
                color="black"
                flexWrap={{ base: "wrap", md: "nowrap" }}
            >
                <Text
                    fontSize="sm"
                    mt="6px"
                    fontWeight="bold"
                    whiteSpace="nowrap"
                >
                    Sort By
                </Text>
                {sortOptions.map(({ key, label }) => (
                    <Button
                        key={key}
                        onClick={() => handleSortBy(key)}
                        _hover={{ bg: "blue.300", color: "white", fontWeight: "bold" }}
                        bg={activeSort === key ? "blue.500" : ""}
                        color={activeSort === key ? "white" : ""}
                    >
                        {label}
                    </Button>
                ))}
            </ButtonGroup>
        </Box>
    );
};

export default SortBy;
