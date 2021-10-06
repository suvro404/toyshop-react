import {useState, createContext, useContext, useEffect} from 'react';

const CartContext = createContext(null);

export const CartContextProvider = ({cartList, children}) => {
    const [cart, setCart] = useState(cartList);
    console.log("cartList : ", cartList);

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = (product, action) => {
    const {cart, setCart} = useContext(CartContext);
    if(product && action) {
        console.log("found");
    }

    return {cart, setCart};
};