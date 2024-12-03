import React from 'react'
import { motion } from 'framer-motion' 

const variants={
  open:{
    transition:{staggerChildren:0.21},
  },
  closed:{
    transition:{staggerChildren:0.053},
  }
}
const itemVariants={
  open:{
    y:0,
    opacity:1,
    
  },
  closed:{
    y:50,
    opacity:0,  
  }
}



function Links() {
  const items=[
    "Homepage",
    "Services",
    "Portfolio",
    "Contact",
    "About",
  ]

  return (
    <motion.div className='links' variants={variants}>
      {
        items.map((item)=>( 
          <motion.a variants={itemVariants} whileTap={{scale:0.9}} whileHover={{scale:1.3}} href={`#${item}`} key={item}>{item}</motion.a>
        ))
      }
    </motion.div>
  )
}

export default Links