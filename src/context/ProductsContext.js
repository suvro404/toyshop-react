import React, {useState, createContext, useContext, useEffect} from 'react';
import {FetchItems} from "../helpers/basic-helpers"

const apiPrefix = 'https://fortnite-api.theapinetwork.com';

const ProductsContext = createContext(null);

export const ProductsContextProvider = ({productType, children}) => {
    const [products, setProducts] = useState(null);
    const [pType, setProductType] = useState(productType);
    const [loading, setLoading] = useState(false);

    const url = getApiUrl(pType);

    useEffect(() => {
        setLoading(true);
        FetchItems(url, (d => {
            setProducts(d.data.slice(0, 50));
            setLoading(false);
        }));

    }, [url]);

    return (
        <ProductsContext.Provider value={{products: products, loading:loading, setProductType: setProductType}}>
            {children}
        </ProductsContext.Provider>
    );
}

function getApiUrl(productType) {
    switch (productType) {
        case 'all': return apiPrefix + '/store/get';
        case 'popular': return apiPrefix + '/items/list';
        case 'upcoming': return apiPrefix + '/upcoming/get';

        default: return "";
    }
}

export const useProductsApi = (productType) => {
    const {products, setProductType, loading} = useContext(ProductsContext);
    useEffect(() => {
        setProductType(productType);
    });
    return {products, setProductType, loading};
};