import { createPaypalOrder, capturePaypalOrder } from '../../configs/paypal.js';
import Order from '../../models/Order.js';
import Cart from '../../models/Cart.js';
import Product from '../../models/Product.js';

const handleCreateOrder = async (req, res) => {
  try {
    const orderDetails = req.body;
    if (!Array.isArray(orderDetails.cartItems)) {
      return res
        .status(400)
        .json({ success: false, msg: 'Invalid cartItems format' });
    }

    /// 1. Create PayPal order via new API
    const paypalOrder = await createPaypalOrder(
      orderDetails.totalAmount.toFixed(2),
      orderDetails.cartItems
    );

    /// 2. Extract the approval link for the frontend to redirect user
    const approvalLink = paypalOrder.links.find(
      (link) => link.rel === 'approve'
    )?.href;

    if (!approvalLink) {
      return res.status(500).json({
        success: false,
        msg: 'No approval URL found from PayPal.',
      });
    }
    const newOrder = new Order({
      ...orderDetails,
      paymentId: paypalOrder.id,
    });
    await newOrder.save();

    res.status(201).json({
      success: true,
      approvalURL: approvalLink,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error('orderShopController:' + error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};
const handleCaptureOrder = async (req, res) => {
  try {
    const { orderId, payerId } = req.body;

    /// Step 1: Validate that both orderId and payerId are present
    if (!orderId || !payerId) {
      return res.status(400).json({
        success: false,
        msg: 'Missing PayPal orderId',
      });
    }

    /// Step 2: Capture the PayPal payment
    const captureResult = await capturePaypalOrder(orderId);

    /// Step 3: Check the capture status from PayPal response
    const captureStatus = captureResult.status; // "COMPLETED" if successful

    if (captureStatus !== 'COMPLETED') {
      return res.status(500).json({
        success: false,
        msg: 'Payment capture failed',
      });
    }

    /// Step 4: Find the order in the database using the paymentId (orderId)
    const updatedOrder = await Order.findOneAndUpdate(
      { paymentId: orderId }, // Match the order by paymentId
      {
        paymentStatus: 'paid', // Update payment status to 'paid'
        payerId, // Store the payerId from PayPal
        orderUpdateDate: new Date(), // Update order date to capture time
      },
      { new: true } // Return the updated order
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        msg: 'Order not found',
      });
    }

    const cartId = updatedOrder.cartId;
    for (let item of updatedOrder.cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          msg: `Product with id: ${item.productId} not found`,
        });
      }
      if (product.totalStock < item.quantity) {
        return res.status(400).json({
          success: false,
          msg: `Not enough stock for product: ${product.title}`,
        });
      }
      product.totalStock -= item.quantity;
      await product.save();
    }

    const deletedCart = await Cart.findByIdAndDelete(cartId);
    if (!deletedCart) {
      res.status(404).json({
        success: false,
        msg: "Can't find the Cart to delete",
      });
    }
    await updatedOrder.save();

    res.status(200).json({
      success: true,
      msg: 'Order confirmed',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('handleCaptureOrder:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      msg: 'Error capturing PayPal payment.',
    });
  }
};
const getAllUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const userOrders = await Order.find({ userId });
    if (!userOrders.length) {
      return res.status(404).json({
        success: false,
        msg: 'Orders not found',
      });
    }
    res.status(200).json({
      success: true,
      data: userOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'orderShopController: Internal Server Error',
    });
  }
};

export { handleCreateOrder, handleCaptureOrder, getAllUserOrders };
