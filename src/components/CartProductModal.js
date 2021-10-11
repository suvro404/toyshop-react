import '../assets/styles/CartModal.css';
import {useState} from 'react'
import {useCart} from "../context/CartContext";

function CartProductModal(props) {
    const {addProduct} = useCart();
    const [quantity, setQuantity] = useState(1);

    function closeModal() {
        props.onClose();
    }

    function confirm() {
        addProduct(props.product, quantity);
        closeModal();
    }

    function onChangeQuantity(inc) {
        setQuantity(getValidQuantity(quantity, inc));
    }

    function getValidQuantity(quantity, inc) {
        let totalQty = quantity + inc;
        return (totalQty > 0 ? totalQty : quantity);
    }

    return (
        <div className="modal">
            <div className="modal-content-container">
                <div className="flex-container">
                    <div>
                        <h1 className="product-title">{props.product.item.name}</h1>
                        <img src={props.product.item.images.icon} alt="Avatar" className="cart-product-img" />
                        <table className="purchase-table">
                            <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>&nbsp;</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{quantity}</td>
                                <td>{quantity * props.product.item.cost}</td>
                                <td className="purchase-table-btn-container">
                                    <button className="purchase-table-btn" onClick={() => onChangeQuantity(1)}>
                                        +
                                    </button>
                                    <button className="purchase-table-btn" onClick={() => onChangeQuantity(-1)}>
                                        -
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <button className="modal-action-button" onClick={() => confirm()}>CONFIRM</button>
                    <button className="modal-action-button" onClick={() => closeModal()}>CANCEL</button>
                </div>
            </div>
        </div>
    );
}

export default CartProductModal;
