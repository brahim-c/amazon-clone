import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "../checkoutProduct/checkoutProduct";
import { useStateValue } from "../stateProvider/statePovider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../stateProvider/reducer";
import { db } from "../firebase/firebase";

import "./payment.styles.css";
import axios from "../axios/axios";

function Payment() {
  const history = useHistory();

  const [{ user, basket }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setsucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("the clientSecret is >>", clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    //all stripe functonnalities

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        /*paymentIintent = payment confirmation*/

        setsucceeded(true);
        setError(false);
        setProcessing(false);

        //pushing the order into firestore
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    //listen for changes in CardElement
    //display any kind of errors
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout [ <Link to="/checkout">{basket?.length} Items</Link> ]
        </h1>

        {/*Delivery Adress*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>street 9 beside the corner</p>
            <p>CALIFORNIA BA</p>
          </div>
        </div>
        {/*Review Items*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items And Delivery</h3>
          </div>
          <div className="payment__items">
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
        {/*Payment method*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/*stripe payment*/}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
            </form>
            <div className="payment__priceContainer">
              <CurrencyFormat
                renderText={(value) => (
                  <h3>
                    Order Total : <strong>{value}</strong>
                  </h3>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              <button
                onClick={handleSubmit}
                disabled={processing || disabled || succeeded}
              >
                <span>{processing ? <p>processing...</p> : "Buy Now"}</span>
              </button>
            </div>
            {/* dispalying Errors*/}
            {error && <div>{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
