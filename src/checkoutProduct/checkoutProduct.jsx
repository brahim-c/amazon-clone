import React from "react";
import "./checkoutProduct.styles.css";

import { useStateValue } from "../stateProvider/statePovider";

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeItem = () => {
    dispatch({
      type: "REMOVE_ITEM_FROM_BASKET",
      payload: id,
    });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeItem}>remove from Basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
