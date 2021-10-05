//import {useState, useEffect} from 'react'
import ProductList from "../components/ProductList";
// import {FetchItems} from "../helpers/basic-helpers"
import LoadingSpinner from "../components/LoadingSpinner";
import {useProductsApi} from "../context/ProductsContextApi";

function Test() {
    // useEffect(() => {
    //     fetchProducts();
    // }, []);

    const products = useProductsApi();
    console.log("products x : ", products);
    //let [loading, setLoadingStatus] = useState(false);

    // const fetchProducts = async () => {
    //     setLoadingStatus(true);
    //     FetchItems('https://fortnite-api.theapinetwork.com/store/get', (d => {
    //         //console.log("All Products : ", d.data.slice(0, 50));
    //         setProducts(d.data.slice(0, 50));
    //         setLoadingStatus(false);
    //     }));
    // }

    return (
        <div>
            {
                products ? (
                    products.length ? (
                        <ProductList list={products} />
                    ) : (
                        <h2>No products to show</h2>
                    )
                ):(
                    <div>products not found</div>
                )

            }
        </div>
    );
}

export default Test;
