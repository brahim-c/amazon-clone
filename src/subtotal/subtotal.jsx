import React from "react";
import "./subtotal.styles.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../stateProvider/statePovider";
import { getBasketTotal } from "../stateProvider/reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ( {basket?.length} items ) : <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={(e) => history.push("/payment")}>
        Proceed to checkout
      </button>
    </div>
  );
}

export default Subtotal;
