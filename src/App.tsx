import 'App.css';
import {Suspense} from "react";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import {ProductsContextProvider} from "modules/products/contexts/ProductsContext";
import {CartContextProvider} from "modules/cart/contexts/CartContext";
import {AuthContextProvider} from "modules/auth/contexts/AuthContext";
import { appRoutes } from 'routes/routes-main';
import LoadingSpinner from 'libs/loading-spinner/LoadingSpinner';
import Nav from "modules/common/components/Nav";
import ErrorBoundary from 'utils/ErrorBoundary';

function App() {
    return (
        <AuthContextProvider>
            <ProductsContextProvider>
                <CartContextProvider>
                    <Router>
                        <div className="App">
                            <Nav />
                            <ErrorBoundary>
                                <Suspense fallback={<LoadingSpinner />}>
                                    <Switch>
                                        {appRoutes}
                                    </Switch>
                                </Suspense>
                            </ErrorBoundary>
                        </div>
                    </Router>
                </CartContextProvider>
            </ProductsContextProvider>
        </AuthContextProvider>
    );
}

export default App;
