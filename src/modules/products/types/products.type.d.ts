export type SetProductQueryInfoFunction = (a: IProductQueryInfo) => void;
export type SetProductsFunction = (a: Array<IProduct>) => void;
export type SetProductFunction = (a: Partial<IProduct>) => void;

export interface IProductQueryInfo {
    queryType: string,
    queryData: string
}