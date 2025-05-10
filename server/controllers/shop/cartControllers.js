import Cart from '../../models/Cart.js';
import Product from '../../models/Product.js';

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        msg: 'product not found',
      });
    }
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) =>
      item.productId.equals(productId)
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};
const fetchCartItems = async (req, res) => {
  const { userId } = req.params;
  const cart = req.cart;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        msg: 'User Id is not valid',
      });
    }
    const validItems = cart.items.filter((product) => product.productId);
    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }
    const results = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: results,
      },
    });
  } catch (error) {
    console.error('cartController error: ' + error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};
const editCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = req.cart;

  try {
    const existingItem = cart.items.find((item) =>
      item.productId._id.equals(productId)
    );
    if (!existingItem) {
      return res.status(404).json({
        success: false,
        msg: 'Product Cart is not found',
      });
    }
    existingItem.quantity = quantity;
    await cart.save();

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: cart.items.map((item) => ({
          productId: item.productId ? item.productId._id : null,
          image: item.productId ? item.productId.image : null,
          title: item.productId ? item.productId.title : 'Product is not found',
          price: item.productId ? item.productId.price : null,
          salePrice: item.productId ? item.productId.salePrice : null,
          quantity: item.quantity,
        })),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};
const deleteCartItem = async (req, res) => {
  const { userId, productId } = req.params;
  const cart = req.cart;
  if (!userId || !productId) {
    return res.status(400).json({
      success: false,
      msg: 'Invalid data',
    });
  }
  try {
    cart.items = cart.items.filter(
      (item) => !item.productId._id.equals(productId)
    );
    cart.save();
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: cart.items.map((item) => ({
          productId: item.productId ? item.productId._id : null,
          image: item.productId ? item.productId.image : null,
          title: item.productId ? item.productId.title : 'Product is not found',
          price: item.productId ? item.productId.price : null,
          salePrice: item.productId ? item.productId.salePrice : null,
          quantity: item.quantity,
        })),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'cartController: Internal Server Error',
    });
  }
};

export {
  addToCart,
  fetchCartItems,
  editCartItem,
  deleteCartItem,
};
