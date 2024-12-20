import { Router } from "express";
import { placeOrder, verifyOrder } from "../controler/order.controller.js";
const orderRouter=Router()

orderRouter.post("/place",placeOrder)
orderRouter.post("/verify",verifyOrder)

export {orderRouter}


