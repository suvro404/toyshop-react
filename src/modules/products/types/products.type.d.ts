export type SetProductQueryInfoFunction = (a: IProductQueryInfo) => void;

export interface IProductQueryInfo {
    queryType: string,
    queryData: string
}