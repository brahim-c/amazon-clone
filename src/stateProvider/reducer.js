export const initialState = {
  basket: [],
  user: null,
};

//Selector

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_ITEM_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.payload
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `can't remove product (id: ${action.payload}) as its not in the basket `
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
