import { useHistory } from "react-router-dom";
import '../assets/styles/ProductList.css';

function ProductList(props) {
    const history = useHistory();

    function goToProductPage(productId) {
        history.push(`/product/${productId}`);
    }

    return (
        <div className="card-container">
            {
                props.list.map(product => (
                    <div className="card" key={product.itemId} onClick={() => goToProductPage(product.itemId)}>
                        <div className="card-header">
                            <div className="rating-container">
                                <div className="star">&nbsp;</div>
                                <div className="rating">
                                    {product.item.ratings.avgStars}
                                </div>
                            </div>
                            <div className="ribbon-container">
                                {
                                    product.store ? (
                                        !product.store.isNew ? (
                                            <div className="ribbon"><span>New</span></div>
                                        ): (
                                            <div>&nbsp;</div>
                                        )
                                    ): (
                                        <div>&nbsp;</div>
                                    )
                                }

                            </div>
                        </div>
                        <img src={product.item.images.icon} alt="Avatar" className="card-img" />
                        <div className="card-content">
                            <h3><b>{product.item.name}</b></h3>
                            {
                                product.store ? (
                                    <p>$ {product.store.cost} (USD)</p>
                                ): (
                                    <p>$ {product.item.cost} (USD)</p>
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default ProductList;
