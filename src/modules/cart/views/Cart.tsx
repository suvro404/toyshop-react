import 'modules/cart/styles/Cart.css'
import {useCart} from "modules/cart/contexts/CartContext";
import CheckoutConfirmationModal from "modules/cart/components/CheckoutConfirmationModal";
import {useState} from "react";
import { useHistory } from "react-router-dom";

function Cart() {
    const history = useHistory();
    const {products, onRemoveProduct, onCheckout, totalPrice} = useCart();
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
                                        <tr key={product.id}>
                                            <td>
                                                <img src={product.imageUrl} alt="Avatar" className="cart-item-img" />
                                                <h4>{product.name}</h4>
                                            </td>
                                            <td>
                                                {product.totalQuantity}
                                            </td>
                                            <td>
                                                {product.totalPrice}
                                            </td>
                                            <td>
                                                <button className="cart-table-btn" onClick={() => onRemoveProduct(product)}>
                                                    REMOVE
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr className="final-result-row">
                                <td colSpan={2}>Total</td>
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
