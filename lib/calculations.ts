export const calculateTotalAmount = (items: any[]): number => {
    return items?.reduce((total: number, item: any) => {
        if (typeof item.amount === 'number') {
            return total + item.amount;
        } else {
            return total;
        }
    }, 0) || 0;
};

export const generateRandomString = async (length: number) => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};


export const extrapolateSMSCost = (inputString: string): number => {
    if (!inputString) {
        return 0;
    }

    // Split the string by space
    const parts = inputString.split(" ");

    // Get the last part which is the cost
    const costPart = parts[parts.length - 1];

    // Remove "KES" if needed
    const cost = costPart.startsWith("KES") ? costPart.substring(4) : costPart;

    // Convert the cost string to a floating-point number
    const totalCost = parseFloat(cost);

    // Check if totalCost is a valid number
    if (!isNaN(totalCost)) {
        return totalCost;
    } else {
        return 0;
    }
};