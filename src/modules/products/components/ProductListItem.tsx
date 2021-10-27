import {useState, useEffect, FC} from 'react'
import { useHistory } from "react-router-dom";
import '../styles/ProductListItem.css';
import {IProduct} from "../../../type"

const ProductListItem: FC<{product:IProduct}> = (props): JSX.Element => {
    const history = useHistory();

    function goToProductPage(productId:number) {
        history.push(`${process.env.PUBLIC_URL}/product/${productId}`);
    }

    return (
        <div>
            {
                props.product ? (
                    <div className="card" key={props.product.id} onClick={() => goToProductPage(props.product.id)}>
                                    <div className="card-header">
                                        <div className="rating-container">
                                            <div className="star">&nbsp;</div>
                                            <div className="rating">
                                                {props.product.ratings.avg}
                                            </div>
                                        </div>
                                        <div className="ribbon-container">
                                            {
                                                props.product.store ? (
                                                    props.product.isNew ? (
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
                                    <img src={props.product.imageUrl} alt="Avatar" className="card-img" />
                                    <div className="card-content">
                                        <h3><b>{props.product.name}</b></h3>
                                        <p>$ {props.product.price} (USD)</p>
                                    </div>
                                </div>
                ) : (
                    <div>&nbsp;</div>
                )
            }
        </div>
    );
}

export default ProductListItem;
