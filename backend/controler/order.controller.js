import Razorpay from "razorpay";
import crypto from 'crypto'

// api to place order
const placeOrder = async (req, res) => {
    try {
      // Validate the incoming request payload
      const { amount, currency, receipt } = req.body;
  
      if (!amount || !currency || !receipt) {
        return res.status(400).json({ error: "Invalid order details provided." });
      }
  
      // Create a new instance of Razorpay
      const razorpay = new Razorpay({
        key_id: process.env.RPAY_KEY_ID,
        key_secret: process.env.RPAY_SECRET,
      });
  
      // Configure the options for the order
      const options = {
        amount, // Amount in smallest currency unit (e.g., paise for INR)
        currency, // Currency code
        receipt, // Unique receipt ID for the order
      };
  
      // Create the order using Razorpay SDK
      const order = await razorpay.orders.create(options);
      console.log("The order is ",order)
  
      // If order creation fails
      if (!order) {
        return res.status(500).json({ error: "Failed to create order." });
      }
  
      // Respond with the created order details
      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  };

//api to validate order
const verifyOrder = async (req, res) => {
    console.log("Verifying Razorpay payment...");
    console.log(req.body)

    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);

        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return res.status(400).json({ msg: "Missing required payment fields" });
        }

        const sha = crypto.createHmac("sha256", process.env.RPAY_SECRET);
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = sha.digest("hex");

        if (digest !== razorpay_signature) {
            console.error("Invalid signature: Transaction is not legit.");
            return res.status(400).json({ msg: "Transaction is not legit!" });
        }

        console.log("Payment verified successfully!");
        res.json({ msg: "success", orderId: razorpay_order_id, paymentId: razorpay_payment_id });
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ msg: "Failed to verify the payment", error: error.message });
    }
};

export {placeOrder,verifyOrder}




