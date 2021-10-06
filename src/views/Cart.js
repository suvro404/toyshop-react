import {useCart} from "../context/CartContext";

function Cart() {
    const {cart, setCart} = useCart();
    console.log("cart : ", cart);


    return (
        <div>
            {/*<h1>*/}
            {/*    This page is under <span style={{color: "yellow", fontSize: "3rem"}}>*/}
            {/*    construction!</span>*/}
            {/*</h1>*/}
        </div>
    );
}

export default Cart;
