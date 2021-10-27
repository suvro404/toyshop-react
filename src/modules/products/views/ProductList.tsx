import {useState, FC} from 'react'
import {RouteComponentProps} from 'react-router';
import LoadingSpinner from "../../../libs/loading-spinner/LoadingSpinner";
import {useProducts} from "../contexts/ProductsContext"
import ProductListItem from "../components/ProductListItem"

interface MatchRouteParams {
    type: string;
}

const ProductList: FC<RouteComponentProps<MatchRouteParams>> = (props): JSX.Element => {
    const productQueryInfo = {queryType: "product-list", queryData: props.match.params.type}
    const {products, loading} = useProducts(productQueryInfo);


    return (
        <div>
            {
                loading ? (
                    <LoadingSpinner />
                ) : (
                    products ? (
                        products.length ? (
                            <div className="card-container">
                                {
                                    products.map(product => (
                                        <ProductListItem product={product} key={product.id} />
                                    ))
                                }
                            </div>
                        ) : (
                            <h2>No products to show</h2>
                        )
                    ):(
                        <div>Products not found</div>
                    )
                )
            }
        </div>
    );
}

export default ProductList;