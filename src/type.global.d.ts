export type SetBooleanFunction = (a: boolean) => void;
export type SetStringFunction = (a: string) => void;
export type SetObjectFunction = (a: object) => void;
export type SetAarrayFunction = (a: Array<object>) => void;

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

export interface ICredentials {
    email: string,
    password: string
}
