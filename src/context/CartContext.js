import {useState, createContext, useContext, useEffect} from 'react';

const CartContext = createContext(null);

export const CartContextProvider = ({cartList, children}) => {
    const [cart, setCart] = useState(cartList);

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);