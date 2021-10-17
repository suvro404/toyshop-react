import {useState, useEffect, FC} from 'react'
import { RouteComponentProps } from 'react-router';
import {FetchItems} from "../helpers/basic-helpers"
import '../assets/styles/Product.css'
import LoadingSpinner from "../components/LoadingSpinner";
import CartModal from "../components/CartProductModal";
import {useAuth} from "../context/AuthContext"
import WarningModal from "../components/AuthWarningModal";
import {useHistory} from "react-router-dom";
import {IProduct, IKeyable} from "../type"
import {useProducts} from "../context/ProductsContext"

interface MatchParams {
    id: string;
}

const Product: FC<RouteComponentProps<MatchParams>> = (props): JSX.Element => {
    const [cartProductModalShow, setCartProductModalShow] = useState(false);
    const [authWarningModalShow, setAuthWarningModalShow] = useState(false);
    const {authorized, setAuthorized} = useAuth();
    const {product, loading} = useProducts({queryType: "product", queryData: props.match.params.id});
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
                loading ? (
                    <LoadingSpinner />
                ) : (
                    product ? (
                        <div>
                            <div className="product-container flex-container">
                                <div className="product-container-item">
                                    <h1 className="product-name">{product.name}</h1>
                                    <img src={product.imageUrl} alt="Avatar" className="product-img" />
                                    <h3><i>"{product.description}..."</i></h3>
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
                                                {
                                                    product.ratings && 
                                                    <tr>
                                                        <td>{product.ratings.avg}</td>
                                                        <td>{product.ratings.points}</td>
                                                        <td>{product.ratings.votes}</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="bottom-container flex-container">
                                        <div className="bottom-wrapper flex-container">
                                            <div className="product-price">$ {product.price} (USD)</div>
                                            <div>
                                                <button className="action-button" onClick={openModal}>
                                                    ADD TO CART
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {cartProductModalShow && <CartModal onClose={closeCartProductModal} product={product as IProduct} />}
                            {authWarningModalShow && <WarningModal onClose={closeAuthWarningModal} />}
                        </div>
                    ) : (
                        <h3>No product found</h3>
                    )
                )
            }
        </div>
    );
}

export default Product;