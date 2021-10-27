import App from "../App";
import { cartRoutes } from "../modules/cart/routes/cartRoutes";
import { authRoutes } from "../modules/auth/routes/authRoutes";
import { productsRoutes } from "../modules/products/routes/productsRoutes";

import {Route} from "react-router-dom";

export const appRoutes = (
  <Route path='' component={App}>
    {productsRoutes}
    {cartRoutes}
    {authRoutes}
  </Route>
)