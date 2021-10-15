import {useState, createContext, useContext, FC, ReactNode} from 'react';
import {IProduct, ICartItem} from '../type'

type AddProductFunction = (product: IProduct, quantity: number) => void;
type RemoveProductFunction = (product: ICartItem) => void;
type OnCheckoutFunction = () => void;

interface ContextInterface {
    products: Array<ICartItem>,
    totalPrice: number,
    addProduct: AddProductFunction,
    removeProduct: RemoveProductFunction,
    onCheckout: OnCheckoutFunction
}

const CartContext = createContext<ContextInterface | null>(null);

export const CartContextProvider: FC<ReactNode> = ({children}) => {
    const [products, setProducts] = useState<ICartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const providerValues:ContextInterface = {
        products, totalPrice,
        addProduct: (product, quantity) => {
            if(productExists(products, product)) {
                let productIdx = getIndexOfExistingProduct(products, product.id);
                let productToModify:ICartItem = products[productIdx];
                productToModify.totalQuantity += quantity;
                productToModify.totalPrice = productToModify.totalQuantity * product.price;
                products.splice(productIdx, 1, productToModify);
            } else {
                let newProduct = {
                    id: product.id,
                    name: product.name,
                    imageUrl: product.imageUrl,
                    totalPrice: quantity * product.price,
                    totalQuantity: quantity
                }
                products.push(newProduct);
                
            }
            setProducts(products);
        },
        removeProduct: (product) => {
            let productIdx = getIndexOfExistingProduct(products, product.id);
            products.splice(productIdx, 1);
            setProducts(products);
        },
        onCheckout: () => {
            setProducts([]);
        }

    };

    return (
        <CartContext.Provider value={providerValues}>
            {children}
        </CartContext.Provider>
    );
}


function productExists(products:ICartItem[], product:IProduct) {
    if(!products.length) {
        return false;
    }
    return products.filter(p => {
        return (p.id === product.id);
    }).length > 0;
}

function getIndexOfExistingProduct(products:ICartItem[], productId:number) {
    return products.findIndex(p => p.id === productId);
}

function getTotalPrice(products:IProduct[]) {
    return products.reduce(function (acc, product) { return acc + product.price; }, 0);
}

export const useCart = () => {
    let contextValues:ContextInterface | null = useContext<ContextInterface | null>(CartContext);
    console.log("contextValues : ", contextValues);
    return contextValues as ContextInterface;
}