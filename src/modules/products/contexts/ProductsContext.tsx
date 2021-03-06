import {useState, createContext, useContext, useEffect, FC, ReactNode} from 'react';
import ApiService from 'api/ApiService';

import {SetBooleanFunction, IProduct, IKeyable} from 'type.global';
import {SetProductQueryInfoFunction, SetProductsFunction, SetProductFunction, IProductQueryInfo} from 'modules/products/types/products.type'

interface ContextInterface {
    products: Array<IProduct>,
    setProducts?: SetProductsFunction,
    product?: Partial<IProduct>,
    setProduct?: SetProductFunction,
    loading: boolean,
    setLoading?: SetBooleanFunction,
    productQueryInfo?: IProductQueryInfo
    setProductQueryInfo: SetProductQueryInfoFunction
}

const ProductsContext = createContext<ContextInterface | null>(null);

export const ProductsContextProvider: FC<ReactNode> = ({children}) => {
    const [productQueryInfo, setProductQueryInfo] = useState<IProductQueryInfo>({queryType: 'products', queryData: 'trending'});
    const [products, setProducts] = useState<IProduct[]>([]);
    const [product, setProduct] = useState<Partial<IProduct>>({});
    const [loading, setLoading] = useState(false);

    const providerValues:ContextInterface = {products, product, loading, setProductQueryInfo};

    const apiQueryInfo = getApiQueryInfo(productQueryInfo);

    const onLoadProductData = () => {
        setLoading(true);
        const apiService = new ApiService("products");

        apiService.getProductData(apiQueryInfo).then((data:IKeyable) => {
            if(productQueryInfo.queryType === "products") {
                setProducts(getProducts(data.slice(0, 50)));
            } else if(productQueryInfo.queryType === "product") {
                setProduct(getProductWithEssentialProperties(data));
            }
        }).catch(err => {
            console.error(err); // take actions depending on this error
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        onLoadProductData();
    }, [apiQueryInfo, productQueryInfo.queryType, productQueryInfo.queryData]);

    return (
        <ProductsContext.Provider value={providerValues}>
            {children}
        </ProductsContext.Provider>
    );
}

function getApiQueryInfo(queryInfo:IProductQueryInfo):string {
    switch (true) {
        case ((queryInfo.queryType === 'products') && (queryInfo.queryData === 'trending')):
            return 'store/get';
        case ((queryInfo.queryType === 'products') && (queryInfo.queryData === 'popular')):
            return 'items/list';
        case ((queryInfo.queryType === 'products') && (queryInfo.queryData === 'upcoming')):
            return 'upcoming/get';
        case (queryInfo.queryType === 'product'):
            return 'item/get?id=' + queryInfo.queryData;

        default: return 'store/get';
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
        if(contextValues && contextValues.setProductQueryInfo) {
            contextValues.setProductQueryInfo(queryInfo);
        }
    }, [queryInfo.queryData]);
    return contextValues as ContextInterface;
};