import { Address} from "./Address";

export default interface User {
    id: number;
    lastName: string;
    firstName: string;
    username: string;
    billingAddress: Address;
    deliveryAddress: Address;
  }