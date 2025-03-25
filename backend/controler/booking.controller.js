

import OrderModel from "../models/orders.model.js";

// Controller functions for Order management

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting order',
      error: error.message,
    });
  }
};

// Update order status (pending/accepted/rejected)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status value. Valid values are: ${validStatuses.join(', ')}`,
      });
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message,
    });
  }
};

// Assign photographer to order
const assignPhotographer = async (req, res) => {
  console.log("assinging phototgrapher")
  console.log(req.body)
  try {
    const { orderId } = req.params;
    const { photographerId } = req.body;

    if (!photographerId) {
      return res.status(400).json({
        success: false,
        message: 'Photographer ID is required',
      });
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { photographerAssigned: photographerId },
      { new: true }
    ).populate('photographerAssigned');

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Photographer assigned successfully',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error assigning photographer:', error);
    return res.status(500).json({
      success: false,
      message: 'Error assigning photographer',
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  // getAllOrders: async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate('photographerAssigned') // This will only populate if photographer is assigned
      .sort({ createdAt: -1 }); // Most recent first

    // Map through orders to format response
    const formattedOrders = orders.map(order => ({
      ...order._doc,
      hasPhotographer: !!order.photographerAssigned // Boolean flag for easier frontend handling
    }));

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders: formattedOrders
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
}





export { getAllOrders, deleteOrder, updateOrderStatus, assignPhotographer };
