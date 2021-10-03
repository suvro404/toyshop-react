import './App.css';
import Nav from "./components/Nav";
import Home from "./views/Home";
import Cart from "./views/Cart";
import Popular from "./views/Popular";
import Upcoming from "./views/Upcoming";
import Product from "./views/Product";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
      <Router>
          <div className="App">
              <Nav />
              <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/popular" component={Popular} />
                  <Route path="/upcoming" component={Upcoming} />
                  <Route path="/product/:id" component={Product} />
              </Switch>
          </div>
      </Router>
  );
}

export default App;
