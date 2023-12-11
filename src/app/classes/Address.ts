export interface Address {
    id: number;
    zipCode: string;
    city: string;
    street: string;
    houseNumber: number;
    stairs: number | null;
    flat: number | null;
    door: number | null;
  }