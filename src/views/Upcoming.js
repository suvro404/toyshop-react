import {useState, useEffect} from 'react'
import ProductList from "../components/ProductList";
import {FetchItems} from "../helpers/basic-helpers"
import LoadingSpinner from "../components/LoadingSpinner";

function Upcoming() {
    useEffect(() => {
        fetchProducts();
    }, []);

    const [products, setProducts] = useState([]);
    let [loading, setLoadingStatus] = useState(false);

    const fetchProducts = async () => {
        setLoadingStatus(true);
        FetchItems('https://fortnite-api.theapinetwork.com/upcoming/get', (d => {
            //console.log("Upcoming Products : ", d.data);
            setProducts(d.data.slice(0, 50));
            setLoadingStatus(false);
        }));
    }

    return (
        <div className="main-container">
            {
                loading ? (
                    <LoadingSpinner />
                ) : (
                    products.length ? (
                        <ProductList list={products} />
                    ) : (
                        <h2>No products to show</h2>
                    )
                )
            }
        </div>
    );
}

export default Upcoming;
