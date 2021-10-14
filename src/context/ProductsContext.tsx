import React, {useState, createContext, useContext, useEffect, FC} from 'react';
import {FetchItems} from "../helpers/basic-helpers"

import {SetBooleanFunction, SetStringFunction, SetAarrayFunction, IProduct, IKeyable} from '../type'

type SetProductFunction = (a: Array<IProduct>) => void;

interface ContextInterface {
    products: Array<IProduct>,
    setProducts?: SetProductFunction,
    productType?: string,
    setProductType: SetStringFunction,
    loading: boolean,
    setLoading?: SetBooleanFunction
}

const apiPrefix = 'https://fortnite-api.theapinetwork.com';

const ProductsContext = createContext<ContextInterface | null>(null);

export const ProductsContextProvider: FC<ContextInterface> = ({children}) => {
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
        price: typeof Number(sourceProduct.item.cost) == 'number' ? Number(sourceProduct.item.cost) : 100, //setting a default value 100 for the sake of UI
        ratings: {
            avg: sourceProduct.item.avgStars,
            points: sourceProduct.item.totalPoints,
            votes: sourceProduct.item.numberVotes,
        },
        isNew: (sourceProduct.isNew ? sourceProduct.isNew : null),
    }
    return product as IProduct;
}

function getProducts(sourceProducts:Array<IKeyable>):IProduct[] {
    let products: IProduct[] = [];
    sourceProducts.forEach(p => {
        let product:IProduct = getProductWithEssentialProperties(p);
        products.push(product);
    });

    return products as IProduct[];
}

export const useProductsApi = (productType:string) => {
    let contextValues:ContextInterface | null = useContext<ContextInterface | null>(ProductsContext);
    useEffect(() => {
        if(contextValues && contextValues.setProductType) {
            contextValues.setProductType(productType);
        }
    }, [productType]);
    return useContext(ProductsContext);
};