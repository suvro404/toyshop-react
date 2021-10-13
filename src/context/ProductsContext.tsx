import React, {useState, createContext, useContext, useEffect, FC} from 'react';
import {FetchItems} from "../helpers/basic-helpers"

type SetBooleanFunction = (a: boolean) => void;
type SetStringFunction = (a: string) => void;
type SetAarrayFunction = (a: Array<object>) => void;

interface ContextInterface {
    products: Array<object>,
    setProducts?: SetAarrayFunction,
    productType?: string,
    setProductType: SetStringFunction,
    loading: boolean,
    setLoading?: SetBooleanFunction
}

const apiPrefix = 'https://fortnite-api.theapinetwork.com';

const ProductsContext = createContext<ContextInterface | null>(null);

export const ProductsContextProvider: FC<ContextInterface> = ({children}) => {
    const [products, setProducts] = useState([]);
    const [productType, setProductType] = useState('all');
    const [loading, setLoading] = useState(false);

    const url = getApiUrl(productType);

    const providerValues:ContextInterface = {products, loading, setProductType};

    useEffect(() => {
        setLoading(true);
        FetchItems(url, ((d:any) => {
            setProducts(d.data.slice(0, 50));
            setLoading(false);
        }));

    }, [url]);

    return (
        <ProductsContext.Provider value={providerValues}>
            {children}
        </ProductsContext.Provider>
    );
}

function getApiUrl(productType:string) {
    switch (productType) {
        case 'all': return apiPrefix + '/store/get';
        case 'popular': return apiPrefix + '/items/list';
        case 'upcoming': return apiPrefix + '/upcoming/get';

        default: return apiPrefix + '/store/get';
    }
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