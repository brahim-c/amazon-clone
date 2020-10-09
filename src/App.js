import React, { useEffect } from "react";

import Header from "./header/header";
import Home from "./home/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./stateProvider/statePovider";
import { auth } from "./firebase/firebase";
import Checkout from "./checkout/checkout";
import Login from "./login/login";
import Payment from "./payment/payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./orders/orders";

const promise = loadStripe(
  "pk_test_51HYuT7F7CYPluLVkicDoLdkY5DFY4JM7l7n4iy3kXpIjQO9o1z690dW8PRcqlw9cNL5l0RIf0gHSHCgl7kiR2FBT00q4Vsbxut"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("the current user is >>> ", authUser);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route exact path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
