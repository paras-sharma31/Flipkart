interface Items {
    printerId: string,
    quantity: number,
}

interface Quantity {
    _id: string,
    userId: string,
    items: Items[]
}

export const AddQuantity = async (printerId: string, quantity: number): Promise<Quantity> => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = user.token;
    const response = await fetch(`https://flipakartworking.onrender.com/api/cart/${printerId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity })
    });
    const result = await response.json();
    console.log('result', result.quantity);
    return result;
};


export const DeleteItem = async (printerId: string): Promise<Quantity> => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = user.token;
    const response = await fetch(`https://flipakartworking.onrender.com/api/cart/${printerId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json();
    return result;
};