import React, {useState, createContext, useContext, useEffect, FC, ReactNode} from 'react';
import {FetchItems} from "../helpers/basic-helpers"

import {SetBooleanFunction, SetStringFunction, IProduct, IKeyable, IProductQueryInfo, SetProductQueryInfoFunction} from '../type'

type SetProductsFunction = (a: Array<IProduct>) => void;
type SetProductFunction = (a: Partial<IProduct>) => void;

interface ContextInterface {
    products: Array<IProduct>,
    setProducts?: SetProductsFunction,
    product?: Partial<IProduct>,
    setProduct?: SetProductFunction,
    loading: boolean,
    setLoading?: SetBooleanFunction,
    queryInfo: IProductQueryInfo
    setQueryInfo: SetProductQueryInfoFunction
}

const apiPrefix = 'https://fortnite-api.theapinetwork.com';

const ProductsContext = createContext<ContextInterface | null>(null);

export const ProductsContextProvider: FC<ReactNode> = ({children}) => {
    const [queryInfo, setQueryInfo] = useState<IProductQueryInfo>({queryType: 'product-list', queryData: 'all'});
    const [products, setProducts] = useState<IProduct[]>([]);
    const [product, setProduct] = useState<Partial<IProduct>>({});
    const [loading, setLoading] = useState(false);

    const providerValues:ContextInterface = {products, product, loading, queryInfo, setQueryInfo};

    const url = getApiUrl(queryInfo);

    useEffect(() => {
        setLoading(true);
        FetchItems(url, ((d:any) => {
            if(queryInfo.queryType == "product-list") {
                setProducts(getProducts(d.data.slice(0, 50)));
            } else if(queryInfo.queryType == "product") {
                setProduct(getProductWithEssentialProperties(d.data));
            }
            setLoading(false);
        }));
    }, [url]);

    return (
        <ProductsContext.Provider value={providerValues}>
            {children}
        </ProductsContext.Provider>
    );
}

function getApiUrl(queryInfo:IProductQueryInfo):string {
    switch (true) {
        case ((queryInfo.queryType === 'product-list') && (queryInfo.queryData === 'all')):
            return apiPrefix + '/store/get';
        case ((queryInfo.queryType === 'product-list') && (queryInfo.queryData === 'popular')):
            return apiPrefix + '/items/list';
        case ((queryInfo.queryType === 'product-list') && (queryInfo.queryData === 'upcoming')):
            return apiPrefix + '/upcoming/get';
        case (queryInfo.queryType === 'product'):
            return apiPrefix + '/item/get?id=' + queryInfo.queryData;

        default: return apiPrefix + '/store/get';
    }
}

// source product is received from the server and is used to generate product with essential properties
function getProductWithEssentialProperties(sourceProduct:IKeyable):IProduct {
    let product : IProduct = {
        id: sourceProduct.itemId,
        name: sourceProduct.item.name,
        description: sourceProduct.item.description,
        imageUrl: sourceProduct.item.images.icon,
        price: getProductPrice(sourceProduct),
        ratings: {
            avg: sourceProduct.item.ratings.avgStars,
            points: sourceProduct.item.ratings.totalPoints,
            votes: sourceProduct.item.ratings.numberVotes,
        },
        isNew: (sourceProduct.isNew ? sourceProduct.isNew : null),
    }
    return product as IProduct;
}

function getProductPrice(sourceProduct:IKeyable):number {
    let price = (sourceProduct.store ? sourceProduct.store.cost : sourceProduct.item.cost);
    price = typeof(price) == 'number' ? price : 100; //setting a default value for undefined price
    return price;
}

function getProducts(sourceProducts:Array<IKeyable>):IProduct[] {
    let products: IProduct[] = [];
    sourceProducts.forEach(p => {
        let product:IProduct = getProductWithEssentialProperties(p);
        products.push(product);
    });

    return products as IProduct[];
}

export const useProducts = (queryInfo: IProductQueryInfo) => {
    let contextValues:ContextInterface | null = useContext<ContextInterface | null>(ProductsContext);
    useEffect(() => {
        if(contextValues && contextValues.setQueryInfo) {
            contextValues.setQueryInfo(queryInfo);
        }
    }, [queryInfo.queryData]);
    return contextValues as ContextInterface;
};