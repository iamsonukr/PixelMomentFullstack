import React, { useEffect, useRef, useState } from 'react';
import './contact.scss';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';
import emailjs, { send } from '@emailjs/browser';



const variants = {
  initial: { y: 500, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.3 },
  },
};



export const Contact = ({url, setPaymentProgress,paymentProgress}) => {
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);
  const [paymentVerify, setPaymenVerify] = useState(false)
  const [amount,setAmount]=useState(null)
  const [submitting,setSubmitting]=useState(false)
  const ref = useRef();
  const formRef = useRef();

  const handleChange = (event) => {
    setAmount(Number(event.target.value) * 100);
  };

  const isInView = useInView(ref, { margin: '-100px' });

  
  const currency = 'INR';
  const receiptId = 'thisissonu';

  const sendEmail = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if(submitting){
      window.alert("Please wait payment in progress...")
      return
    }
    setSubmitting(true)
    try {
      setPaymentProgress(true)
      const response = await axios.post(
        `${url}/api/order/place`,
        { amount, currency, receipt: receiptId },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setPaymentProgress(false)
      const order = response.data;

      const paymentWindowConfig = {
        key: 'rzp_test_RakCckTlR6axJb',
        amount,
        currency,
        name: 'Pixel Moment',
        description: 'Best Photography For Memorable Events',
        image: './camera.png',
        order_id: order.id,
        handler: async (response) => {
          console.log('Payment Successful', response);
          try {
            await axios.post(`${url}/api/order/verify`, response);
            setPaymenVerify(true)
            await sendRealEmail()
            console.log("Payment verifyed")
            if (paymentVerify) {
              console.log("Sending order details")
              
            }
          } catch (error) {
            console.error('Payment validation failed:', error);
          }finally{
            setPaymentProgress(false)
          }
        },
        prefill: {
          name: 'Pixel Moment',
          email: 'pixelmoments@photography.com',
          contact: '9987574517',
        },
        notes: { address: 'Pixel Moment Office, Kolkata' },
        theme: { color: '#cc3333' },
      };

      const paymentWindow = new window.Razorpay(paymentWindowConfig);
      paymentWindow.on('payment.failed', (response) => {
        console.error('Payment Failed:', response);
        alert(response.error.description);
      });
      paymentWindow.open();
    } catch (error) {
      console.error('Payment initiation failed:', error);
    }finally{
      setSubmitting(false)
    }
  }
  // sending email
  const sendRealEmail = async () => {
    window.alert("Seding email")
    try {
      await emailjs.sendForm(
        'service_aerse5c',
        'template_oa1c2aj',
        formRef.current,
        'bJ3dniHL1UCn5A3bs'
      );
      setError(false);
      setSent(true);
      window.alert("Email Sent Successfully")
      console.log('Email Sent Successfully');
    } catch (error) {
      setError(true);
      setSent(true);
      console.error('Email Sending Failed:', error);
    }
  };



  return (
    <motion.div
      ref={ref}
      className="contact"
      variants={variants}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      id="contact-me"
    >
      <motion.div className="textContainer" variants={variants}>
        <motion.h1>Let's work together</motion.h1>
        <motion.div className="item" variants={variants}>
          <h2>Mail</h2>
          <span>hello@react.dev</span>
        </motion.div>
        <motion.div className="item" variants={variants}>
          <h2>Address</h2>
          <span>Sample Street, New York</span>
        </motion.div>
        <motion.div className="item" variants={variants}>
          <h2>Phone</h2>
          <span>+91 893 824 9842</span>
        </motion.div>
      </motion.div>

      {/* Form starts here */}
      <div className="formContainer">
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          ref={formRef}
          onSubmit={sendEmail}
        >
          <input type="text" placeholder="Name" name="from_name" required />
          <input type="email" placeholder="Email" name="email" required />
          <input type="phone" placeholder="Phone" name="phone" required />
          <input type="datetime-local" placeholder="Date and Time of Event" name="date" required />

          <input type="text" placeholder="Address" name="address" required />

          {/* Plan selection */}
          <div className="planSelection">
            <h3>Select a Package</h3>
            <label>
              <input type="radio" name="plan" value="4999" onChange={handleChange} />
              <span>Basic Package (₹4999 - 4 hours coverage)</span>
            </label>
            <label>
              <input type="radio" name="plan" value="9999" onChange={handleChange}/>
              <span>Premium Package (₹9999 - 8 hours coverage)</span>
            </label>
            <label>
              <input type="radio" name="plan" value="14999" onChange={handleChange} />
              <span>Ultimate Package (₹14999 - 12 hours coverage)</span>
            </label>
          </div>

          <button type="submit">Book Now</button>
          {sent && (error ? 'Booking Failed' : 'Order Sent Successfully')}
        </motion.form>
      </div>
    </motion.div>
  );
};
