import Order from '../../models/Order.js';

const getAllOrders = async (req, res) => {
  try {
    const userOrders = await Order.find();
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
      msg: 'orderAdminController: Internal Server Error',
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true } // returns the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        msg: 'Order not found',
      });
    }
    res.json({
      success: true,
      msg: 'Order updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'orderAdminController: Internal Server Error',
    });
  }
};
export { getAllOrders, updateOrderStatus };
