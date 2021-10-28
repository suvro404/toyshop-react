import 'modules/cart/styles/CartProductModal.css';
import {useState, FC, MouseEvent} from 'react'
import {useCart} from "modules/cart/contexts/CartContext";
import {IProduct} from "type.common"

type ClickHandler = (event: MouseEvent<HTMLButtonElement>) => void;

const CartProductModal: FC<{product:IProduct, onClose:ClickHandler}> = (props): JSX.Element => {
    const {onAddProduct} = useCart();
    const [quantity, setQuantity] = useState(1);

    function closeModal(e: MouseEvent<HTMLButtonElement>) {
        props.onClose(e);
    }

    function confirm(e: MouseEvent<HTMLButtonElement>) {
        onAddProduct(props.product, quantity);
        closeModal(e);
    }

    function onChangeQuantity(inc:number) {
        setQuantity(getValidQuantity(quantity, inc));
    }

    function getValidQuantity(quantity:number, inc:number) {
        let totalQty = quantity + inc;
        return (totalQty > 0 ? totalQty : quantity);
    }

    return (
        <div className="modal">
            <div className="modal-content-container">
                <div className="flex-container">
                    <div>
                        <h1 className="product-title">{props.product.name}</h1>
                        <img src={props.product.imageUrl} alt="Avatar" className="cart-product-img" />
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
                                <td>{quantity * props.product.price}</td>
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
                    <button className="modal-action-button" onClick={(e) => confirm(e)}>CONFIRM</button>
                    <button className="modal-action-button" onClick={(e) => closeModal(e)}>CANCEL</button>
                </div>
            </div>
        </div>
    );
}

export default CartProductModal;
