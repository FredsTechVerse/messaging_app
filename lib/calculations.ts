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
