import {FC} from 'react'
import {RouteComponentProps} from 'react-router';
import LoadingSpinner from "libs/loading-spinner/LoadingSpinner";
import {useProducts} from "modules/products/contexts/ProductsContext"
import ProductListItem from "modules/products/components/ProductListItem"

interface MatchRouteParams {
    type: string;
}

const ProductList: FC<RouteComponentProps<MatchRouteParams>> = (props): JSX.Element => {
    const productQueryInfo = {queryType: "products", queryData: props.match.params.type}
    const {products, loading} = useProducts(productQueryInfo);
    
    return (
        <div data-test="trending">
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