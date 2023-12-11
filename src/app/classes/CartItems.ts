export default interface Cart{
    id: number;
    productName: string;
    category: string;
    quantity: number;
    price: number;
    cartId: {
        id: number;
        userId: number;
        total: number;
        createdAt: Date;
        ordere: boolean
    }
    wantedQuantity: number;
}