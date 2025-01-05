import express from "express";
import {
  getAllOrders,
  deleteOrder,
  updateOrderStatus,
  assignPhotographer,
} from '../controler/booking.controller.js'
  
  // } from "../controller/booking.controller.js";
const bookingRouter = express.Router();

// Get all orders
bookingRouter.get("/allbookings", getAllOrders);

// Delete an order
bookingRouter.delete("/remove/:orderId", deleteOrder);

// Update order status (pending/accepted/rejected)
bookingRouter.post("/status/:orderId", updateOrderStatus);

// Assign a photographer to an order
bookingRouter.post("/assign/:orderId/", assignPhotographer);

export default bookingRouter;
