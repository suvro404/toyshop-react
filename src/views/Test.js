
import ProductList from "../components/ProductList";
import LoadingSpinner from "../components/LoadingSpinner";
import {useProductsApi} from "../context/ProductsContextApi";

function Test() {
    const {products, loading} = useProductsApi("upcoming");
    return (
        <div>
            {
                loading ? (
                    <LoadingSpinner />
                ) : (
                    products ? (
                        products.length ? (
                            <ProductList list={products} />
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

export default Test;
