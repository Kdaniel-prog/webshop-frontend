export default interface Cart{
    productId: number;
    quantity: number;
    cartId: number;
    isIncrease: boolean;
    category: string;
    productName: string;
    price: number;
    fullPrice: number;
}