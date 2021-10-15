import {useState, useEffect, FC} from 'react'
import {FetchItems} from "../helpers/basic-helpers"
import '../assets/styles/Product.css'
import LoadingSpinner from "../components/LoadingSpinner";
import CartModal from "../components/CartProductModal";
import {useAuth} from "../context/AuthContext"
import WarningModal from "../components/AuthWarningModal";
import {useHistory} from "react-router-dom";
import {IProduct, IKeyable} from "../type"

interface MatchParams {
    id: string;
}

const Product: FC<MatchParams> = (props): JSX.Element => {
    const [product, setProduct] = useState<Partial<IProduct>>({});
    const [loading, setLoadingStatus] = useState(false);
    const [cartProductModalShow, setCartProductModalShow] = useState(false);
    const [authWarningModalShow, setAuthWarningModalShow] = useState(false);
    const {authorized, setAuthorized} = useAuth();
    const history = useHistory();

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        setLoadingStatus(true);
        FetchItems(`https://fortnite-api.theapinetwork.com/item/get?id=${props.match.params.id}`, ((d:any) => {
            setProduct(getProductWithEssentialProperties(d.data));
            setLoadingStatus(false);
        }));
    }

    // source product is received from the server and is used to generate product with essential properties
    function getProductWithEssentialProperties(sourceProduct:IKeyable):IProduct {
        let product : IProduct = {
            id: sourceProduct.itemId,
            name: sourceProduct.item.name,
            description: sourceProduct.item.description,
            imageUrl: sourceProduct.item.images.icon,
            price: getProductPrice(sourceProduct),
            ratings: {
                avg: sourceProduct.item.ratings.avgStars,
                points: sourceProduct.item.ratings.totalPoints,
                votes: sourceProduct.item.ratings.numberVotes,
            },
            isNew: (sourceProduct.isNew ? sourceProduct.isNew : null),
        }
        return product as IProduct;
    }

    function getProductPrice(sourceProduct:IKeyable):number {
        let price = (sourceProduct.store ? sourceProduct.store.cost : sourceProduct.item.cost);
        price = typeof(price) == 'number' ? price : 100; //setting a default value for undefined price
        return price;
    }

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
                        {cartProductModalShow && <CartModal onClose={closeCartProductModal} product={product} />}
                        {authWarningModalShow && <WarningModal onClose={closeAuthWarningModal} />}
                    </div>
                )
            }
        </div>
    );
}

export default Product;