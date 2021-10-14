import ProductList from "../components/ProductList";
import LoadingSpinner from "../components/LoadingSpinner";
import {useProducts} from "../context/ProductsContext";

function Popular() {
    const {products, loading} = useProducts("popular");
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

export default Popular;
