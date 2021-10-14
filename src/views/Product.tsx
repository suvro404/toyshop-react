import {useState, useEffect, FC} from 'react'
import '../assets/styles/Product.css'
import CartProductModal from "../components/CartProductModal";
import {useAuth} from "../context/AuthContext"
import WarningModal from "../components/AuthWarningModal";
import {useHistory} from "react-router-dom";
import {IProduct} from "../type"

const Product: FC<{product:IProduct}> = (props): JSX.Element => {
    const [cartProductModalShow, setCartProductModalShow] = useState(false);
    const [authWarningModalShow, setAuthWarningModalShow] = useState(false);
    const {authorized} = useAuth();
    const history = useHistory();

    const openModal = () => {
        authorized ? (setCartProductModalShow(true)) : (setAuthWarningModalShow(true));
    };
    const closeCartProductModal = ()=>{
        setCartProductModalShow(false);
    }

    const closeAuthWarningModal = () => {
        setAuthWarningModalShow(false);
        history.push(`${process.env.PUBLIC_URL}/auth`);
    }

    return (
        <div>
            {
                props.product? (
                    <div>
                        <div className="product-container flex-container">
                            <div className="product-container-item">
                                <h1 className="product-name">{props.product.name}</h1>
                                <img src={props.product.imageUrl} alt="Avatar" className="product-img" />
                                <h3><i>"{props.product.description}..."</i></h3>
                            </div>
                            <div className="product-container-item">
                                <div className="flex-container">
                                    <table className="product-info-table">
                                        <thead>
                                        <tr>
                                            <th>Rating</th>
                                            <th>Point</th>
                                            <th>Vote</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{props.product.ratings.avg}</td>
                                            <td>{props.product.ratings.points}</td>
                                            <td>{props.product.ratings.votes}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="bottom-container flex-container">
                                    <div className="bottom-wrapper flex-container">
                                        <div className="product-price">$ {props.product.price} (USD)</div>
                                        <div>
                                            <button className="action-button" onClick={openModal}>
                                                ADD TO CART
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {cartProductModalShow && <CartProductModal onClose={closeCartProductModal} product={props.product} />}
                        {authWarningModalShow && <WarningModal onClose={closeAuthWarningModal} />}
                    </div>
                ): (
                    <div>No product to show</div>
                )
            }
        </div>
    );
}

export default Product;
