import React from "react";
import {Route} from "react-router-dom";

const Auth = React.lazy(() => import("modules/auth/views/Auth"));

export const authRoutes = (
  <Route path='/auth' component={Auth} />
)