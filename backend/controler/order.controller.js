import Razorpay from "razorpay";
import crypto from 'crypto';
import OrderModel from '../models/orders.model.js';

const placeOrder = async (req, res) => {
  console.log("placing order")

  try {
    const { 
      name, 
      email, 
      phone, 
      date, 
      address, 
      servicePackage,  // Changed from 'package' to 'servicePackage'
      price:amount, 
      currency = 'INR',
      receipt,
    } = req.body.orderData;

    console.log(req.body)

    // Validate required fields
    const requiredFields = { name, email, phone, date, address, amount };
    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // Create Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RPAY_KEY_ID,
      key_secret: process.env.RPAY_SECRET,
    });

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount,
      currency,
      receipt: `order_${Date.now()}`,
    });

    // Create order in database
    const order = new OrderModel({
      name,
      email,
      phone,
      date,
      address,
      servicePackage,  // Changed from 'package' to 'servicePackage'
      status: 'pending',
      paymentDetails: {
        orderId: razorpayOrder.id,
        amount,
        currency,
        status: 'pending'
      }
    });

    await order.save();

    res.status(201).json({
      orderId: order._id,
      paymentDetails: razorpayOrder
    });

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const verifyOrder = async (req, res) => {
  try {
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature,
      orderId
    } = req.body;

    // Verify signature
    const sha = crypto.createHmac("sha256", process.env.RPAY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
      await OrderModel.findByIdAndUpdate(orderId, {
        'paymentDetails.status': 'failed',
        status: 'rejected'
      });
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // Update order status
    const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, {
      'paymentDetails.status': 'completed',
      'paymentDetails.paymentId': razorpay_payment_id,
      status: 'accepted'
    }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({
      message: "Payment verified successfully",
      order: updatedOrder
    });

  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { placeOrder, verifyOrder };

// api to place order
// const placeOrder = async (req, res) => {
//     try {
//       // Validate the incoming request payload
//       const { amount, currency, receipt } = req.body;
  
//       if (!amount || !currency || !receipt) {
//         return res.status(400).json({ error: "Invalid order details provided." });
//       }
  
//       // Create a new instance of Razorpay
//       const razorpay = new Razorpay({
//         key_id: process.env.RPAY_KEY_ID,
//         key_secret: process.env.RPAY_SECRET,
//       });
  
//       // Configure the options for the order
//       const options = {
//         amount, // Amount in smallest currency unit (e.g., paise for INR)
//         currency, // Currency code
//         receipt, // Unique receipt ID for the order
//       };
  
//       // Create the order using Razorpay SDK
//       const order = await razorpay.orders.create(options);
//       console.log("The order is ",order)
  
//       // If order creation fails
//       if (!order) {
//         return res.status(500).json({ error: "Failed to create order." });
//       }
  
//       // Respond with the created order details
//       res.status(201).json(order);
//     } catch (error) {
//       console.error("Error creating Razorpay order:", error);
//       res.status(500).json({ error: "Internal Server Error." });
//     }
//   };

//api to validate order
// const verifyOrder = async (req, res) => {
//     console.log("Verifying Razorpay payment...");
//     console.log(req.body)

//     try {
//         const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
//         console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);

//         if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
//             return res.status(400).json({ msg: "Missing required payment fields" });
//         }

//         const sha = crypto.createHmac("sha256", process.env.RPAY_SECRET);
//         sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//         const digest = sha.digest("hex");

//         if (digest !== razorpay_signature) {
//             console.error("Invalid signature: Transaction is not legit.");
//             return res.status(400).json({ msg: "Transaction is not legit!" });
//         }

//         console.log("Payment verified successfully!");
//         res.json({ msg: "success", orderId: razorpay_order_id, paymentId: razorpay_payment_id });
//     } catch (error) {
//         console.error("Error verifying payment:", error);
//         res.status(500).json({ msg: "Failed to verify the payment", error: error.message });
//     }
// };

// export {placeOrder,verifyOrder}




