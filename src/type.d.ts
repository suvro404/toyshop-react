export type SetBooleanFunction = (a: boolean) => void;
export type SetStringFunction = (a: string) => void;
export type SetObjectFunction = (a: object) => void;
export type SetAarrayFunction = (a: Array<object>) => void;
export type SetProductQueryInfoFunction = (a: IProductQueryInfo) => void;

export interface IKeyable {
    [key: string]: any;  
}

export interface IProduct {
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    price: number,
    ratings: {
        avg: number,
        points: number,
        votes: number
    },
    isNew: boolean | null,
    store?: IKeyable
}

export interface ICartItem {
    id: number,
    name: string,
    imageUrl: string,
    totalPrice: number,
    totalQuantity: number
}

export interface IProductQueryInfo {
    queryType: string,
    queryData: string
}

