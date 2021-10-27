import App from "../App";
import { cartRoutes } from "../modules/cart/routes/cartRoutes";
import { authRoutes } from "../modules/auth/routes/authRoutes";
import { productsRoutes } from "../modules/products/routes/productsRoutes";

import {Route, Redirect} from "react-router-dom";

export const appRoutes = (
  <Route>
    <Route exact path="/">
      <Redirect to="/products/trending" />
    </Route>
    {productsRoutes}
    {cartRoutes}
    {authRoutes}
  </Route>
)