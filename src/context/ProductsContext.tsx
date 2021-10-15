import React, {useState, createContext, useContext, useEffect, FC, ReactNode} from 'react';
import {FetchItems} from "../helpers/basic-helpers"

import {SetBooleanFunction, SetStringFunction, IProduct, IKeyable} from '../type'

type SetProductsFunction = (a: Array<IProduct>) => void;

interface ContextInterface {
    products: Array<IProduct>,
    setProducts?: SetProductsFunction,
    productType?: string,
    setProductType: SetStringFunction,
    loading: boolean,
    setLoading?: SetBooleanFunction
}

const apiPrefix = 'https://fortnite-api.theapinetwork.com';

const ProductsContext = createContext<ContextInterface | null>(null);

export const ProductsContextProvider: FC<ReactNode> = ({children}) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [productType, setProductType] = useState('all');
    const [loading, setLoading] = useState(false);

    const url = getApiUrl(productType);

    const providerValues:ContextInterface = {products, loading, setProductType};

    useEffect(() => {
        setLoading(true);
        FetchItems(url, ((d:any) => {
            setProducts(getProducts(d.data.slice(0, 50)));
            setLoading(false);
        }));

    }, [url]);

    return (
        <ProductsContext.Provider value={providerValues}>
            {children}
        </ProductsContext.Provider>
    );
}

function getApiUrl(productType:string):string {
    switch (productType) {
        case 'all': return apiPrefix + '/store/get';
        case 'popular': return apiPrefix + '/items/list';
        case 'upcoming': return apiPrefix + '/upcoming/get';

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

export const useProducts = (productType:string) => {
    let contextValues:ContextInterface | null = useContext<ContextInterface | null>(ProductsContext);
    useEffect(() => {
        if(contextValues && contextValues.setProductType) {
            contextValues.setProductType(productType);
        }
    }, [productType]);
    return contextValues as ContextInterface;
};