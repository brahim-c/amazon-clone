import React from "react";
import CheckoutProduct from "../checkoutProduct/checkoutProduct";
import { useStateValue } from "../stateProvider/statePovider";
import Subtotal from "../subtotal/subtotal";
import { Link } from "react-router-dom";
import "./checkout.styles.css";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  const index = user?.email.indexOf("@");

  const signInLink = <a href="/login"> Sign in</a>;

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div>
          <h3>
            {(!user && "Hi There, Sign in And Start Shopping") ||
              (user && `Happy shopping ${user?.email.slice(0, index)}`)}
          </h3>
          <h2 className="checkout__title">shopping basket</h2>
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
