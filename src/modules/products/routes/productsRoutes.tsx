import ProductList from "../views/ProductList";
import Product from "../views/Product";

import {Route} from "react-router-dom";

export const productsRoutes = (
  <div>
    <Route path='/products/:type' component={ProductList}></Route>
    <Route path='/product/:id' component={Product}></Route>
  </div>
)