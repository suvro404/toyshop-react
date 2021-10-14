import {useState, useEffect, FC} from 'react'
import { useHistory } from "react-router-dom";
import '../assets/styles/ProductList.css';
import {IProduct} from "../type"

const ProductList: FC<{productsList:IProduct[]}> = (props): JSX.Element => {
    const history = useHistory();

    function goToProductPage(productId:number) {
        history.push(`${process.env.PUBLIC_URL}/product/${productId}`);
    }

    return (
        <div>
            {
                props.productsList ? (
                    <div className="card-container">
                        {
                            props.productsList.map(product => (
                                <div className="card" key={product.id} onClick={() => goToProductPage(product.id)}>
                                    <div className="card-header">
                                        <div className="rating-container">
                                            <div className="star">&nbsp;</div>
                                            <div className="rating">
                                                {product.ratings.avg}
                                            </div>
                                        </div>
                                        <div className="ribbon-container">
                                            {
                                                product.store ? (
                                                    product.isNew ? (
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
                                    <img src={product.imageUrl} alt="Avatar" className="card-img" />
                                    <div className="card-content">
                                        <h3><b>{product.name}</b></h3>
                                        <p>$ {product.price} (USD)</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div>&nbsp;</div>
                )
            }
        </div>
    );
}

export default ProductList;
