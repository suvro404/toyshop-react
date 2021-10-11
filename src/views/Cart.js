import '../assets/styles/Cart.css'
import {useCart} from "../context/CartContext";
import CheckoutConfirmationModal from "../components/CheckoutConfirmationModal";
import {useState} from "react";
import { useHistory } from "react-router-dom";

function Cart() {
    const history = useHistory();
    const {products, removeProduct, onCheckout, totalPrice} = useCart();
    const [modalShow, setModalShow] = useState(false);

    function checkOut() {
        onCheckout();
        setModalShow(true);
    }

    function closeModal () {
        setModalShow(false);
        history.push(`${process.env.PUBLIC_URL}/`);
    }

    return (
        <div className="flex-container">
            {
                products.length ? (
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
                                products.map(product => {
                                    return (
                                        <tr key={product.itemId}>
                                            <td>
                                                <img src={product.item.images.icon} alt="Avatar" className="cart-item-img" />
                                                <h4>{product.item.name}</h4>
                                            </td>
                                            <td>
                                                {product.quantity}
                                            </td>
                                            <td>
                                                {product.price}
                                            </td>
                                            <td>
                                                <button className="cart-table-btn" onClick={() => removeProduct(product)}>
                                                    REMOVE
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr className="final-result-row">
                                <td colSpan="2">Total</td>
                                <td>{totalPrice}</td>
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
                {modalShow && <CheckoutConfirmationModal onClose={closeModal} />}
            </div>
        </div>
    );
}

export default Cart;
