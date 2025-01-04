import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  servicePackage: {  // Changed from 'package' to 'servicePackage'
    type: String,
  },
  photographerAssigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  paymentDetails: {
    orderId: String,
    paymentId: String,
    amount: Number,
    currency: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  }
}, { timestamps: true });

const OrderModel = mongoose.model('Orders', orderSchema);
export default OrderModel;