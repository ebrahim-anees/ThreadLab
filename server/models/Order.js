import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart',
    },
    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        title: String,
        image: String,
        price: Number,
        quantity: {
          type: Number,
          min: 1,
        },
      },
    ],
    addressInfo: {
      addressId: String,
      address: String,
      city: String,
      pincode: String,
      phone: String,
      notes: String,
    },
    orderStatus: {
      type: String,
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      default: 'paypal',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    totalAmount: Number,
    orderDate: {
      type: Date,
      default: Date.now,
    },
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String,
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Order', orderSchema);
