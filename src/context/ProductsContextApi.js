import {useState, createContext, useContext, useEffect} from 'react';
import {FetchItems} from "../helpers/basic-helpers"

const apiPrefix = 'https://fortnite-api.theapinetwork.com';

const ProductsContextApi = createContext(null);

export const ProductsContextProvider = ({productType, children}) => {
    const [products, setProducts] = useState(null);
    const url = getApiUrl(productType);

    useEffect(() => {
        FetchItems(url, (d => {
            //console.log("Products : ", d.data.slice(0, 50));
            setProducts(d.data.slice(0, 50));
        }));

    }, [url]);

    return (
        <ProductsContextApi.Provider value={products}>
            {children}
        </ProductsContextApi.Provider>
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

export const useProductsApi = () => (useContext(ProductsContextApi));