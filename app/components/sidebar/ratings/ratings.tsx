import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Checkbox,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState, useEffect } from 'react';

interface RatingsProps {
    setRating: Dispatch<SetStateAction<number[]>>;
}

export const Ratings = ({ setRating }: RatingsProps) => {
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
    const ratings = [1, 2, 3, 4];

    const handleRatingChange = (rating: number) => {
        setSelectedRatings((prev) =>
            prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
        );
    };

    useEffect(() => {
        setRating(selectedRatings);
    }, [selectedRatings, setRating]);
    console.log(selectedRatings, 'selectedRatings')

    return (
        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex="1" textAlign="left" className=" text-black font-medium">
                            CUSTOMER RATINGS
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} className="grid gap-2">
                    {ratings.map((rating) => (
                        <Checkbox
                            id={"ratings-" + rating}
                            key={rating}
                            isChecked={selectedRatings.includes(rating)}
                            onChange={() => handleRatingChange(rating)}
                        >
                            {rating} & above
                        </Checkbox>
                    ))}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};
