import {useState, useEffect} from 'react'
import {FetchItems} from "../helpers/basic-helpers"
import '../assets/styles/Product.css'
import LoadingSpinner from "../components/LoadingSpinner";
import CartModal from "../components/CartProductModal";
import {useAuth} from "../context/AuthContext"
import WarningModal from "../components/AuthWarningModal";
import {useHistory} from "react-router-dom";

function Product(props) {
    const [product, setProduct] = useState({});
    const [loading, setLoadingStatus] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [warningModalShow, setWarningModalShow] = useState(false);
    const {authorized, setAuthorized} = useAuth();
    const history = useHistory();

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        setLoadingStatus(true);
        FetchItems(`https://fortnite-api.theapinetwork.com/item/get?id=${props.match.params.id}`, (d => {
            //console.log("Product : ", d.data);
            setProduct(d.data);
            setLoadingStatus(false);
        }));
    }

    const openModal = () => {
        authorized ? (setModalShow(true)) : (setWarningModalShow(true));
    };
    const closeModal = ()=>{
        setModalShow(false);
    }

    const closeWarningModal = () => {
        setWarningModalShow(false);
        history.push(`${process.env.PUBLIC_URL}/auth`);
    }

    return (
        <div>
            {
                loading ? (
                    <LoadingSpinner />
                ) : (
                    product.item? (
                            <div>
                                <div className="product-container flex-container">
                                    <div className="product-container-item">
                                        <h1 className="product-name">{product.item.name}</h1>
                                        <img src={product.item.images.icon} alt="Avatar" className="product-img" />
                                        <h3><i>"{product.item.description}..."</i></h3>
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
                                                    <td>{product.item.ratings.avgStars}</td>
                                                    <td>{product.item.ratings.totalPoints}</td>
                                                    <td>{product.item.ratings.numberVotes}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="tag-container flex-container">
                                            <div className="tag">{product.item.type}</div>
                                            <div className="tag">{product.item.rarity}</div>
                                            {
                                                product.itemSet.setName ? (
                                                    <div className="tag">{product.itemSet.setName}</div>
                                                ) : (
                                                    <div>&nbsp;</div>
                                                )
                                            }
                                        </div>
                                        <div className="bottom-container flex-container">
                                            <div className="bottom-wrapper flex-container">
                                                <div className="product-price">$ {product.item.cost} (USD)</div>
                                                <div>
                                                    <button className="action-button" onClick={openModal}>
                                                        ADD TO CART
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {modalShow && <CartModal onClose={closeModal} product={product} />}
                                {warningModalShow && <WarningModal onClose={closeWarningModal} />}
                            </div>
                    ): (
                        <div>No product to show</div>
                    )
                )
            }
        </div>
    );
}

export default Product;
