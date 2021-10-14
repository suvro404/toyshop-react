import ProductList from "../components/ProductList";
import LoadingSpinner from "../components/LoadingSpinner";
import {useProducts} from "../context/ProductsContext";

function Home() {
    const {products, loading} = useProducts("all");
    return (
        <div>
            {
                loading ? (
                    <LoadingSpinner />
                ) : (
                    products ? (
                        products.length ? (
                            <ProductList productsList={products} />
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

export default Home;
