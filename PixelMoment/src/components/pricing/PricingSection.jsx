import React from 'react';
import { animate, motion } from 'framer-motion';
import { Camera, Clock, Building, Calendar } from 'lucide-react';
import './pricing.scss';

// Animation variants for reusability
const variants={
  
}
const fadeInUp = {
  initial: {
    x: -100,
    y: 100,
    opacity: 0,
},
animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
        duration: 1,
        staggerChildren: 0.1,
    }
}

};

const fadeInLeft = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

// Package type definition for each pricing package
const packages = [
  {
    title: 'Basic Package',
    price: '4999',
    hours: 4,
    isPopular: false,
    icon: Camera,
    features: ['Professional Photographer', 'High Resolution Images', 'Basic Photo Editing', 'Online Gallery'],
  },
  {
    title: 'Premium Package',
    price: '9999',
    hours: 8,
    isPopular: true,
    icon: Building,
    features: [
      '2 Professional Photographers',
      'High Resolution Images',
      'Advanced Photo Editing',
      'Online Gallery',
      'Printed Photo Album',
      'Same Day Preview',
    ],
  },
  {
    title: 'Ultimate Package',
    price: '14999',
    hours: 12,
    isPopular: false,
    icon: Calendar,
    features: [
      '2 Professional Photographers',
      'Videographer',
      'Drone Coverage',
      'High Resolution Images',
      'Premium Photo Editing',
      'Online Gallery',
      'Premium Photo Album',
      'Same Day Preview',
    ],
  },
];

const PhotoPackageCard = ({ title, price, hours, features, isPopular, icon: Icon }) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial='initial'
      whileInView='animate'
      className={`pricing-card ${isPopular ? 'pricing-card-popular' : ''}`}
    >
      {isPopular && <div className="pricing-card-popular-tag">Most Popular</div>}

      <div className="pricing-card-header">
        <div className="pricing-card-header-icon">
          <Icon size={24} />
        </div>
        <h3>{title}</h3>
      </div>

      <div className="pricing-card-price">
        <span className="amount">₹{price}</span>
        <span className="period">/package</span>
      </div>

      <div className="pricing-card-duration">
        <Clock size={20} />
        <span>{hours} hours of coverage</span>
      </div>

      <ul className="pricing-card-features">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            variants={fadeInLeft}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.1 }}
          >
            {feature}
          </motion.li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`pricing-card-button ${isPopular ? 'pricing-card-button-primary' : 'pricing-card-button-secondary'
          }`}
        onClick={() => (window.location.href = '#contact-me')}
      >
        Contact Now
      </motion.button>
    </motion.div>
  );
};

const PricingSection = () => {
  return (
    <section className="pricing-main">

      <section className="pricing-section">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pricing-header"
        >
          <h2>Capture Your Perfect Moments</h2>
          <p>Professional photography packages tailored to your special occasions</p>
        </motion.div>

        <div className="pricing-grid">
          {packages.map((pkg, index) => (
            <PhotoPackageCard key={pkg.title} {...pkg} />
          ))}
        </div>

      </section>
    </section>
  );
};

export default PricingSection;
