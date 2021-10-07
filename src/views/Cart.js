import '../assets/styles/Cart.css'
import {useCart} from "../context/CartContext";
import CheckoutModal from "../components/CheckoutModal";
import {useState} from "react";
import { useHistory } from "react-router-dom";


function Cart() {
    const history = useHistory();
    const {cart, setCart} = useCart();
    const [modalShow, setModalShow] = useState(false);

    function removeProductFromCart(product) {
        let currentCart = JSON.parse(JSON.stringify(cart));

        currentCart.splice(getPositionOfProductInCart(currentCart, product), 1);

        setCart(currentCart);
    }

    function getPositionOfProductInCart(cart, product) {
        return cart.findIndex(p => p.product.itemId === product.itemId);
    }

    function checkOut() {
        setModalShow(true);
    }

    function closeModal () {
        setModalShow(false);
        setCart([]);
        history.push('/');
    }

    function getFinalPrice() {
        return cart.reduce((sum, p) => sum + p.totalPrice, 0);
    }

    return (
        <div className="flex-container">
            {
                cart.length ? (
                    <div className="cart-table-container">
                        <table className="cart-table">
                            <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price (USD)</th>
                                <th>&nbsp;</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                cart.map(product => {
                                    return (
                                        <tr key={product.product.itemId}>
                                            <td>
                                                <img src={product.product.item.images.icon} alt="Avatar" className="cart-item-img" />
                                                <h4>{product.product.item.name}</h4>
                                            </td>
                                            <td>
                                                {product.quantity}
                                            </td>
                                            <td>
                                                {product.totalPrice}
                                            </td>
                                            <td>
                                                <button className="cart-table-btn" onClick={() => removeProductFromCart(product.product)}>
                                                    REMOVE
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr className="final-result-row">
                                <td colSpan="2">Total</td>
                                <td>{getFinalPrice()}</td>
                                <td className="btn-container">
                                    <button className="cart-table-btn checkout-btn" onClick={() => checkOut()}>
                                        CHECKOUT
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <h1>You don't have any products in your cart.</h1>
                    </div>
                )
            }
            <div>
                {modalShow && <CheckoutModal  onClose={closeModal} />}
            </div>
        </div>
    );
}

export default Cart;
