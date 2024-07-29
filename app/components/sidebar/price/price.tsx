import { Box, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Select } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface PriceProps {
    setMaxPrice: Dispatch<SetStateAction<{ maxPrice: string }>>;
    setMinPrice: Dispatch<SetStateAction<{ minPrice: string }>>;
}

export const Price = ({ setMaxPrice, setMinPrice }: PriceProps) => {
    const [sliderValues, setSliderValues] = useState<[number, number]>([0, 30000]);
    const handleSliderChange = (value: [number, number]) => {
        setSliderValues(value);
        setMinPrice({ minPrice: value[0].toString() });
        setMaxPrice({ maxPrice: value[1].toString() });
    };
    const handleMinChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const minValue = Number(e.target.value);
        setSliderValues([minValue, sliderValues[1]]);
        setMinPrice({ minPrice: minValue.toString() });
    };
    const handleMaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const maxValue = Number(e.target.value);
        setSliderValues([sliderValues[0], maxValue]);
        setMaxPrice({ maxPrice: maxValue.toString() });
    };
    return (
        <form>
            <label className="block mb-2 text-black font-medium">PRICE</label>
            <RangeSlider
                aria-label={['min', 'max']}
                min={0}
                max={30000}
                step={1000}
                value={sliderValues}
                onChange={handleSliderChange}
                className="mb-4 w-full"
            >
                <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
            </RangeSlider>
            <Box className="flex items-center justify-between mb-4">
                <Box className='inline-block' >
                    <Select
                        placeholder='Min'
                        value={sliderValues[0]}
                        onChange={handleMinChange}
                        padding='0px 2px'
                        fontSize='14px'
                        fontWeight='600'


                    >
                        <option value='250'>250</option>
                        <option value='500'>500</option>
                        <option value='1000'>1000</option>
                        <option value='2000'>2000</option>
                        <option value='5000'>5000</option>
                        <option value='10000'>10000</option>
                    </Select>
                </Box>
                <span className='text-gray-500 text-md font-medium'>to</span>
                <Box>
                    <Select
                        placeholder='Max'
                        value={sliderValues[1]}
                        onChange={handleMaxChange}
                        padding='0px 2px'
                        fontSize='14px'
                        fontWeight='600'
                    >
                        <option value='250'>250</option>
                        <option value='500'>500</option>
                        <option value='1000'>1000</option>
                        <option value='2000'>2000</option>
                        <option value='5000'>5000</option>
                        <option value='10000'>10000</option>
                        <option value='20000'>20000</option>
                        <option value='30000'>30000+</option>
                    </Select>
                </Box>

            </Box>
        </form>
    );
};
