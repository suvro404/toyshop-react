import {useState, createContext, useContext} from 'react';

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    return (
        <CartContext.Provider value={{
            products,
            totalPrice,
            addProduct: (product, quantity) => {
                if(productExists(products, product)) {
                    let productIdx = getIndexOfExistingProduct(products, product);
                    let productToModify = products[productIdx];
                    productToModify.quantity += quantity;
                    productToModify.price = productToModify.quantity * productToModify.item.cost;
                    products.splice(productIdx, 1, productToModify);
                } else {
                    product.quantity = quantity;
                    product.price = product.quantity * product.item.cost;
                    products.push(product);
                    
                }
                setProducts(products);
                setTotalPrice(getTotalPrice(products));
            },
            removeProduct: (product) => {
                let productIdx = getIndexOfExistingProduct(products, product);
                products.splice(productIdx, 1);
                setProducts(products);
                setTotalPrice(getTotalPrice(products));
            },
            onCheckout: () => {
                setProducts([]);
            }
        }}
        >
            {children}
        </CartContext.Provider>
    );
}


function productExists(products, product) {
    if(!products.length) {
        return false;
    }
    return products.filter(p => {
        return (p.itemId === product.itemId);
    }).length > 0;
}

function getIndexOfExistingProduct(products, product) {
    return products.findIndex(p => p.itemId === product.itemId);
}

function getTotalPrice(products) {
    return products.reduce(function (acc, product) { return acc + product.price; }, 0);
}

export const useCart = () => useContext(CartContext);