import React from "react";
import {Route} from "react-router-dom";

const Cart = React.lazy(() => import("modules/cart/views/Cart"));

export const cartRoutes = (
  <Route path='/cart' component={Cart} />
)