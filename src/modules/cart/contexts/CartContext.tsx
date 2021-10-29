import {useState, createContext, useContext, FC, ReactNode} from 'react';
import {IProduct} from 'type.global'
import {ICartItem} from 'modules/cart/types/cart.type'

type OnAddProductFunction = (product: IProduct, quantity: number) => void;
type OnRemoveProductFunction = (product: ICartItem) => void;
type OnCheckoutFunction = () => void;

interface ContextInterface {
    products: Array<ICartItem>,
    totalPrice: number,
    onAddProduct: OnAddProductFunction,
    onRemoveProduct: OnRemoveProductFunction,
    onCheckout: OnCheckoutFunction
}

const CartContext = createContext<ContextInterface | null>(null);

export const CartContextProvider: FC<ReactNode> = ({children}) => {
    const [products, setProducts] = useState<ICartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const providerValues:ContextInterface = {
        products, totalPrice,
        onAddProduct: (product, quantity) => {
            addProduct(products, product, quantity).then((productList:ICartItem[]) => {
                setProducts(productList);
                setTotalPrice(getTotalPrice(productList));
            }).catch((err) =>{
                console.log("Error occurred while adding item to cart : ", err); // take actions dependeing on this error
            })
        },
        onRemoveProduct: (product) => {
            removeProduct(products, product).then((productList:ICartItem[]) => {
                setProducts(productList);
                setTotalPrice(getTotalPrice(productList));
            }).catch((err) =>{
                console.log("Error occurred while removing item form cart : ", err); // take actions dependeing on this error
            })
        },
        onCheckout: () => {
            setProducts([]);
            setTotalPrice(0);
        }

    };

    return (
        <CartContext.Provider value={providerValues}>
            {children}
        </CartContext.Provider>
    );
}

function removeProduct(products:ICartItem[], product:ICartItem):Promise<ICartItem[]> {
    return new Promise((resolve, reject) => {
        let productsClone = [...products];
        let productIdx = getIndexOfExistingProduct(products, product.id);
        try {
            productsClone.splice(productIdx, 1); // this is demo purpose. Here rest api will be called.
            resolve(productsClone); // result is received from server and resolved if successful
        } catch(err) {
            reject(err); // result is received from server and rejected if failed
        }
    })
}

function addProduct(products:ICartItem[], product:IProduct, quantity: number):Promise<ICartItem[]> {
    return new Promise((resolve, reject) => {
        let productsClone = [...products];
        try {
            if(productExists(products, product)) {
                let productIdx = getIndexOfExistingProduct(products, product.id);
                let productToModify:ICartItem = products[productIdx];
                productToModify.totalQuantity += quantity;
                productToModify.totalPrice = productToModify.totalQuantity * product.price;
                productsClone.splice(productIdx, 1, productToModify); // this is demo purpose. Here rest api will be called.
            } else {
                let newProduct = {
                    id: product.id,
                    name: product.name,
                    imageUrl: product.imageUrl,
                    totalPrice: quantity * product.price,
                    totalQuantity: quantity
                }
                productsClone.push(newProduct); // this is demo purpose. Here rest api will be called.
            }
            resolve(productsClone); // result is received from server and resolved if successful
        } catch(err) {
            reject(err); // result is received from server and rejected if failed
        }
    })
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

function getTotalPrice(products:ICartItem[]) {
    return products.reduce(function (acc, product) { 
        return (acc + product.totalPrice); 
    }, 0);
}

export const useCart = () => {
    let contextValues:ContextInterface | null = useContext<ContextInterface | null>(CartContext);
    return contextValues as ContextInterface;
}