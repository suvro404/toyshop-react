import '../assets/styles/Cart.css'
import {useCart} from "../context/CartContext";

function Cart() {
    const {cart, setCart} = useCart();
    console.log("cart : ", cart);


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
                                            <td className="cart-table-btn-container">
                                                <button className="cart-table-btn">
                                                    ADD
                                                </button>
                                                <button className="cart-table-btn">
                                                    REMOVE
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>

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
        </div>
    );
}

export default Cart;
