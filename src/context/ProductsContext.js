import React, {useState, createContext, useContext, useEffect} from 'react';
import {FetchItems} from "../helpers/basic-helpers"

const apiPrefix = 'https://fortnite-api.theapinetwork.com';

const ProductsContext = createContext();

export const ProductsContextProvider = ({children}) => {
    const [products, setProducts] = useState(null);
    const [productType, setProductType] = useState('all');
    const [loading, setLoading] = useState(false);

    const url = getApiUrl(productType);

    useEffect(() => {
        setLoading(true);
        FetchItems(url, (d => {
            setProducts(d.data.slice(0, 50));
            setLoading(false);
        }));

    }, [url]);

    return (
        <ProductsContext.Provider value={{products, loading, setProductType}}>
            {children}
        </ProductsContext.Provider>
    );
}

function getApiUrl(productType) {
    switch (productType) {
        case 'all': return apiPrefix + '/store/get';
        case 'popular': return apiPrefix + '/items/list';
        case 'upcoming': return apiPrefix + '/upcoming/get';

        default: return apiPrefix + '/store/get';
    }
}

export const useProductsApi = (productType) => {
    const {setProductType} = useContext(ProductsContext);
    useEffect(() => {
        setProductType(productType);
    }, [productType]);
    return useContext(ProductsContext);
};

// export const useProductsApi = {
//     loadProducts: function(productType) {
//         const {setProductType} = useContext(ProductsContext);
//         setProductType(productType);
//         return useContext(ProductsContext);
//     }
// }