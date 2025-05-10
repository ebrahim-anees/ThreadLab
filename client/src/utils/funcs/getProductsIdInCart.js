import { createSelector } from 'reselect';
const EMPTY_ARRAY = [];

const selectProductsList = (state) => {
  return Array.isArray(state.shopProducts.productsList)
    ? state.shopProducts.productsList
    : EMPTY_ARRAY;
};
const selectCartItems = (state) =>
  Array.isArray(state.shopCart.cartItems?.items)
    ? state.shopCart.cartItems.items
    : EMPTY_ARRAY;
export const getProductsIdInCart = createSelector(
  [selectProductsList, selectCartItems],
  (productsList, cartItems) => {
    return productsList
      .filter((product) =>
        cartItems.some((item) => item?.productId === product._id)
      )
      .map((product) => product._id);
  }
);
