import 'App.css';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import Nav from "modules/common/components/Nav";
import {ProductsContextProvider} from "modules/products/contexts/ProductsContext";
import {CartContextProvider} from "modules/cart/contexts/CartContext";
import {AuthContextProvider} from "modules/auth/contexts/AuthContext";

import { appRoutes } from 'routes/routes-main';

function App() {
    return (
        <AuthContextProvider>
            <ProductsContextProvider>
                <CartContextProvider>
                    <Router>
                        <div className="App">
                            <Nav />
                            <Switch>
                                {appRoutes}
                            </Switch>
                        </div>
                    </Router>
                </CartContextProvider>
            </ProductsContextProvider>
        </AuthContextProvider>
    );
}

export default App;
