import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Checkbox,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from 'react';

interface BrandProps {
    selectedBrands: string[];
    setBrand: Dispatch<SetStateAction<string[]>>;
}

export const Brand = ({ selectedBrands, setBrand }: BrandProps) => {
    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setBrand((prev) =>
            prev.includes(value) ? prev.filter((brand) => brand !== value) : [...prev, value]
        );
        console.log(value)
    };

    const brands = ['HP', 'Canon', 'Epson'];

    return (
        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex="1" textAlign="left" className="text-black font-medium">
                            BRAND
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} className="grid gap-2">
                    {brands.map((brand, index) => (
                        <Checkbox
                            id={"brand-" + brand}
                            key={index}
                            value={brand}
                            isChecked={selectedBrands.includes(brand)}
                            onChange={handleBrandChange}
                        >
                            {brand}
                        </Checkbox>
                    ))}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};
