export const calculateTotalItemsPrice = (cartItems = []) => {
  return cartItems.reduce((total, item) => {
    const price = item.salePrice ?? item.price;
    return total + item.quantity * price;
  }, 0);
};
