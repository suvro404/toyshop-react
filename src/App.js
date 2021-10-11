import './App.css';
import Nav from "./components/Nav";
import Home from "./views/Home";
import Popular from "./views/Popular";
import Upcoming from "./views/Upcoming";
import Product from "./views/Product";
import Cart from "./views/Cart";
import Auth from "./views/Auth";
import Test from "./views/Test";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ProductsContextProvider} from "./context/ProductsContextApi";
import {CartContextProvider} from "./context/CartContext";
import {AuthContextProvider} from "./context/AuthContext";

function App() {
    const productType = "all";
    const authorized = true;

    return (
        <AuthContextProvider status = {authorized}>
            <ProductsContextProvider productType = {productType}>
                <CartContextProvider>
                    <Router>
                        <div className="App">
                            <Nav />
                            <Switch>
                                <Route path={process.env.PUBLIC_URL + '/'} exact component={Home} />
                                <Route path={process.env.PUBLIC_URL + '/popular'} component={Popular} />
                                <Route path={process.env.PUBLIC_URL + '/upcoming'} component={Upcoming} />
                                <Route path={process.env.PUBLIC_URL + '/product/:id'} component={Product} />
                                <Route path={process.env.PUBLIC_URL + '/cart'} component={Cart} />
                                <Route path={process.env.PUBLIC_URL + '/auth'} component={Auth} />
                                <Route path={process.env.PUBLIC_URL + '/test'} component={Test} />
                            </Switch>
                        </div>
                    </Router>
                </CartContextProvider>
            </ProductsContextProvider>
        </AuthContextProvider>
    );
}

export default App;
