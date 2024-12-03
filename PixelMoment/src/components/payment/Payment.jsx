import React from 'react'

const Payment = () => {


    const amount = 100;
    const currency = "INR";
    const receiptId = "thisissonu";

    const paymentHandler = async (e) => {
        const response = await axios.post('http://localhost:5009/api/order/place', { amount, currency, receipt: receiptId, },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        const order = response.data
        // console.log("This is the order generate from the backend and send to the server along with the order.id which is very essential")
        // console.log(order)


        // THESE ARE THE THINGS YOU WANT TO SHOW ON THE DASHBOARD LIKE COMPNAY NAME , NUMBER , AMOUNT , LOGO 
        // It uses the data obtained from the response to set up the dashboard like order.id
        var paymentWindowConfig = {
            // Enter the Key ID generated from the Dashboard
            "key": "rzp_test_RakCckTlR6axJb",
            // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "amount": amount,
            currency,
            "name": "Acme Corp",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "order_id": order.id,

            // 🔰🔰🔰 after the payment is made the control goes to the handler to verify the payment 🔰🔰🔰
            "handler": async function (response) {
                console.log('Payment Successful', response);
                try {
                    const validateRes = await axios.post('http://localhost:5000/api/order/verify', response);
                    console.log(validateRes.data);
                } catch (error) {
                    console.error("Payment validation failed:", error);
                }
            },
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#cc3333"
            }
        };

        // creating the payment window using the options
        var paymentWindow = new window.Razorpay(paymentWindowConfig);
        paymentWindow.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        paymentWindow.open();
        e.preventDefault();
    }

    // Form handle

    const [formData, setFormData] = useState({
        clientName: "",
        email: "",
        phoneNumber: "",
        clientAddress: "",
        dueDate: "",
        description: "",
        quantity: "1",
        price: "50",
        comments: "",
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        // Handle form submission logic here



        paymentHandler()
      };

  return (
    <div>Payment</div>
  )
}

export default Payment