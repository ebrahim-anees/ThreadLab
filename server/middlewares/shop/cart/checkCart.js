import Cart from '../../../models/Cart.js';

export const checkCart = async (req, res, next) => {
  let { userId } = req.params;
  if (!userId) userId = req.body.userId;
  try {
    req.cart = await Cart.findOne({ userId }).populate({
      /// takes the ObjectId stored in item.productId and fetches the corresponding Product document.
      /// The productId field in the result is replaced by the actual Product document, with all the fields you requested
      path: 'items.productId',
      select: 'image title price salePrice',
    });
    if (!req.cart) {
      return res.status(404).json({
        success: false,
        msg: 'Cart item is not found',
      });
    }
  } catch (error) {
    console.error('middleWare Error: ' + error);
    res.status(500).json({
      success: false,
      msg: 'MiddleWare: Internal Server Error',
    });
  }
  next();
};
