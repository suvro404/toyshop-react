import React from "react";
import {Route} from "react-router-dom";

const ProductList = React.lazy(() => import("modules/products/views/ProductList"));
const Product = React.lazy(() => import("modules/products/views/Product"));

export const productsRoutes = (
  <Route>
    <Route path='/products/:type' component={ProductList} />
    <Route path='/product/:id' component={Product} />
  </Route>
)