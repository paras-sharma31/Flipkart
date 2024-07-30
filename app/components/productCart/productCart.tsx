import { Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text, Flex } from "@chakra-ui/react";
import { MinusCircle, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PrinterId {
    _id: string;
    productTitle: string;
    price: number;
    discountPercentage: number;
    discountedPrice: number;
    headImage: string;
}

interface Items {
    printerId: PrinterId;
    quantity: number;
}

interface Cart {
    _id: string;
    userId: string;
    items: Items[];
}

const ProductCart = () => {
    const [products, setProducts] = useState<Cart | null>(null);
    const [cartData, setCartData] = useState<Items[]>([])
    const fetchProductCart = async () => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const token = user.token;
        if (token) {
            console.log(token, 'token')

            const response = await fetch(`https://flipakartworking.onrender.com/api/cart/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();//
            setProducts(result);
        }
        const currentData = localStorage.getItem('productsData' || '[]')
        const parseData = JSON.parse(currentData)
        setCartData(parseData)
    };

    useEffect(() => {
        fetchProductCart();
    }, []);

    const updateQuantity = async (id: string, quantity: number): Promise<void> => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = user.token;

        if (token) {
            try {
                const response = await fetch(`https://flipakartworking.onrender.com/api/cart/${id}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ quantity })
                });

                if (!response.ok) {
                    throw new Error('Failed to update quantity');
                }

                const result = await response.json();
                setProducts(result);
            } catch (error) {
                console.error('Error updating quantity:', error);
            }
        } else {
            // Handle localStorage case
            const updatedCartData = cartData.map(item =>
                item.printerId._id === id ? { ...item, quantity } : item
            );
            setCartData(updatedCartData);
            localStorage.setItem('productsData', JSON.stringify(updatedCartData));
        }
    };

    const incrementQuantity = (id: string, currentQuantity: number) => {
        const newQuantity = currentQuantity + 1;
        updateQuantity(id, newQuantity);
    };

    const decrementQuantity = (id: string, currentQuantity: number) => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            updateQuantity(id, newQuantity);
        }
    };


    const removeCartItem = async (itemId: string) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = user.token;
        if (token) {
            await fetch(`https://flipakartworking.onrender.com/api/cart/${itemId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
        }
        fetchProductCart(); // Re-fetch the cart to update the UI
        const updateCartData = cartData.filter(item => item.printerId._id !== itemId)
        setCartData(updateCartData)
        localStorage.setItem('productsData', JSON.stringify(updateCartData))

    };

    const calculatePriceDetails = () => {
        let totalAmount = 0;
        let totalDiscount = 0;
        const items = products ? products.items : cartData;
        items.forEach(item => {
            totalAmount += item.printerId.discountedPrice * item.quantity;
            totalDiscount += (item.printerId.price - item.printerId.discountedPrice) * item.quantity;
        });

        return {
            totalAmount: totalAmount.toFixed(2),
            totalDiscount: totalDiscount.toFixed(2),
        };
    };

    const priceDetails = calculatePriceDetails();

    return (
        < Box bg="gray.100" height='100vh' >
            <Box p={4} bg="gray.100" display="flex" justifyContent="center" gap="20px">
                <Box maxW="4xl" bg="white" shadow="lg" rounded="lg" height='fit-content' >
                    <Box borderBottom="1px" borderColor="gray.200" p={4}>
                        <Heading size="sm" color="#2a55e5" borderBottom="3px solid #2a55e5">Flipkart ({products?.items.length || cartData.length})</Heading>
                        <Flex justifyContent="space-between" mt={2}>
                            <Box>
                                <Text fontWeight="bold">Deliver to: Paras Sharma, 133302</Text>
                                <Text>#1434A kamla Nagar kalka, Near ram bhag road, Kalka</Text>
                            </Box>
                            <Button variant="link" colorScheme="blue">
                                Change
                            </Button>
                        </Flex>
                    </Box>

                    <Box>
                        {(products && products.items.length > 0 || cartData.length > 0) ? (
                            (products ? products.items : cartData).map((item: Items) => (
                                <Card
                                    direction={{ base: "column", sm: "row" }}
                                    overflow="hidden"
                                    key={item.printerId._id}
                                    border="none"
                                    boxShadow="none"
                                    m={4}
                                    h='200px'
                                >
                                    <Image
                                        objectFit="contain"
                                        maxW={{ base: "100%", sm: "200px" }}
                                        src={item.printerId.headImage}
                                        alt={item.printerId.productTitle}
                                    />

                                    <Stack flex="1">
                                        <CardBody>
                                            <Heading size="sm" fontWeight={400}>{item.printerId.productTitle}</Heading>
                                            <Flex mt={2} alignItems="center">
                                                <Text as="del" color="gray.500">
                                                    ₹{item.printerId.price}
                                                </Text>
                                                <Text ml={2} fontWeight="bold">
                                                    ₹{item.printerId.discountedPrice}
                                                </Text>
                                                <Text ml={2} color="green.600" fontWeight="bold">
                                                    {item.printerId.discountPercentage}%
                                                </Text>
                                            </Flex>
                                        </CardBody>

                                        <CardFooter>
                                            <Flex alignItems="center">
                                                <Button variant="ghost" onClick={() => decrementQuantity(item.printerId._id, item.quantity)}>
                                                    <MinusCircle />
                                                </Button>
                                                <Text mx={2}>{item.quantity}</Text>
                                                <Button variant="ghost" onClick={() => incrementQuantity(item.printerId._id, item.quantity)}>
                                                    <PlusCircle />
                                                </Button>
                                                <Link href="" passHref>
                                                    <Button variant="link" ml={4} colorScheme="blue" onClick={() => removeCartItem(item.printerId._id)}>
                                                        Remove
                                                    </Button>
                                                </Link>
                                            </Flex>
                                        </CardFooter>
                                    </Stack>
                                </Card>
                            ))
                        ) : (
                            <Box p={4}>Loading...</Box>
                        )}
                    </Box>


                    <Box bg='white' p="16px 30px" display="flex" justifyContent="end" borderTop="1px solid #f0f0f0"
                        boxShadow="0 -2px 10px 0 rgba(0, 0, 0, .1)" className="sticky top-[64px] bottom-0 z-2">
                        <Button bg="#fb641b" color="white" w="full" py={2} rounded="sm" width="200px">
                            PLACE ORDER
                        </Button>
                    </Box>
                </Box>

                <Box borderTop="1px" borderColor="gray.200" p={4} bg="white" shadow="lg" rounded="lg" className="sticky top-0 h-[300px]">
                    <Heading size="sm" className="text-gray-500">PRICE DETAILS</Heading>
                    <Box mt={2}>
                        <hr />
                        <Flex justifyContent="space-between" gap="20px">
                            <Text>Price ({products?.items.length || cartData.length})</Text>

                            <Text>₹{priceDetails.totalAmount}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" mt={2}>
                            <Text>Discount</Text>
                            <Text color="green.600">- ₹{priceDetails.totalDiscount}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" mt={2} borderBottom="1px dashed lightgray">
                            <Text>Delivery Charges</Text>
                            <Text color="green.600">₹40 Free</Text>
                        </Flex>
                        <Flex justifyContent="space-between" mt={4} fontWeight="bold" borderBottom="1px dashed lightgray">
                            <Text>Total Amount</Text>
                            <Text>₹{(parseFloat(priceDetails.totalAmount) - parseFloat(priceDetails.totalDiscount)).toFixed(2)}</Text>
                        </Flex>
                        <Text mt={2} color="green.600">
                            You will save ₹{priceDetails.totalDiscount} on this order
                        </Text>

                    </Box>
                </Box>
            </Box>
        </Box >
    );
};

export default ProductCart;
