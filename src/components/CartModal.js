import '../assets/styles/CartModal.css';
import {useState} from 'react'
import {useCart} from "../context/CartContext";

function CartModal(props) {
    const {cart, setCart} = useCart();
    const [noOfItems, setNoOfItems] = useState(1);
    let totalPrice = noOfItems * Number(props.product.item.cost);


    function closeModal() {
        props.onClose();
    }

    function confirm() {
        let cartProduct = {
            product: props.product,
            quantity: getProductQuantity(cart, props.product, noOfItems),
            totalPrice: getGrossPrice(cart, props.product, totalPrice)
        }

        //useCart(cartProduct, 'add');
        //setCart([cartProduct]);

        updateCart(cart, cartProduct);

        props.onClose();
    }

    function updateCart(cart, product) {
        cart = JSON.parse(JSON.stringify(cart));
        //let tempCart = cart.map(object => ({ ...object }));

        if(cart.length) {
            cart.forEach((p, idx) => {
                if(p.product.itemId === product.product.itemId) {
                    cart.splice(idx, 1, product);
                } else {
                    cart.push(product);
                }
            });
        } else {
            cart.push(product);
        }

        setCart(cart);
    }


    function getProductQuantity(cart, product, noOfItems) {
        let totalQuantity = 0;
        cart.forEach((p) => {
            totalQuantity = (p.itemId == product.itemId ? (totalQuantity + noOfItems) : noOfItems);
        });
        return totalQuantity;
    }

    function getGrossPrice(cart, product, totalPrice) {
        let grossPrice = 0;
        cart.forEach((p) => {
            grossPrice = (p.itemId == product.itemId ? (grossPrice + totalPrice) : totalPrice);
        });
        return grossPrice;
    }

    function changeItemNo(action) {
        (action === 'add' ? setNoOfItems(noOfItems < 10 ? noOfItems+1 : 10): setNoOfItems(noOfItems > 1 ? noOfItems-1 : 1));

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
                                <td>{noOfItems}</td>
                                <td>{totalPrice}</td>
                                <td className="purchase-table-btn-container">
                                    <button className="purchase-table-btn" onClick={() => changeItemNo('add')}>
                                        +
                                    </button>
                                    <button className="purchase-table-btn" onClick={() => changeItemNo('remove')}>
                                        -
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <button className="modal-action-button" onClick={confirm}>CONFIRM</button>
                    <button className="modal-action-button" onClick={closeModal}>CANCEL</button>
                </div>
            </div>
        </div>
    );
}

export default CartModal;
