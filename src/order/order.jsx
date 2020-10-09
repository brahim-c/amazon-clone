import React from "react";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "../checkoutProduct/checkoutProduct";

import "./order.styles.css";

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY,h:mma")}</p>
      <p className="order__id">
        <small> order id : {order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          id={item.id}
          image={item.image}
          title={item.title}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order__total">
            Order Total : <strong>{value}</strong>
          </h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Order;
