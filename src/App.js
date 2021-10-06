import './App.css';
import Nav from "./components/Nav";
import Home from "./views/Home";
import Cart from "./views/Cart";
import Popular from "./views/Popular";
import Upcoming from "./views/Upcoming";
import Product from "./views/Product";
import Test from "./views/Test";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ProductsContextProvider} from "./context/ProductsContextApi";
import {CartContextProvider} from "./context/CartContext";

function App() {
      const productType = "all";
      const cartList = new Array();

      return (
          <ProductsContextProvider productType = {productType}>
              <CartContextProvider cartList = {cartList}>
                  <Router>
                      <div className="App">
                          <Nav />
                          <Switch>
                              <Route path='/' exact component={Home} />
                              <Route path='/cart' component={Cart} />
                              <Route path='/popular' component={Popular} />
                              <Route path='/upcoming' component={Upcoming} />
                              <Route path='/product/:id' component={Product} />
                              <Route path='/test' component={Test} />
                          </Switch>
                      </div>
                  </Router>
              </CartContextProvider>
          </ProductsContextProvider>
      );
}

export default App;
