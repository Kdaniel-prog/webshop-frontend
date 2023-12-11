export default interface Order {
    id: number;
    userId: number;
    total: number;
    createdAt: string;
    ordered: boolean;
}