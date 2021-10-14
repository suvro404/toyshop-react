export type SetBooleanFunction = (a: boolean) => void;
export type SetStringFunction = (a: string) => void;
export type SetObjectFunction = (a: object) => void;

interface Product {
    itemId: number,
    name: string,
    description: string,
    imageUrl: string,
    quantity: number,
    price: number,
    rating: number,
    isNew: boolean
}

