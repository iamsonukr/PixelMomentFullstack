import React, { useState } from 'react'
import { motion } from 'framer-motion'

function Test() {
    const varient = {
        visible: {
            opacity: 1,
            // x: 300,
            transition: { staggerChildren: 0.84 }
        },
        hidden: { opacity: 0 }
    }

    const items=["item1","item2","item3","item4"]

  return (
    <div className='course'>
        <motion.ul variants={varient} initial="hidden" animate="visible"  className="ul">
            {items.map((item)=>(
                <motion.li variants={varient}  key={item}>{item}</motion.li>
            ))}
        </motion.ul>



        {/* <motion.div className="box" 
        variants={varient}
            initial={{opacity:0,scale:0.5}} 
            // animate={{opacity:1,scale:1}} 
            transition={{duration:2}}
            whileInView={open ?"visible":"hidden"}
            drag
            >
        </motion.div>
        <button onClick={()=>setOpen(prev=>!prev)}>Click</button> */}


        {/* <motion.div className="box" 
        variants={varient}
            initial={{opacity:0,scale:0.5}} 
            animate={{opacity:1,scale:1}} 
            transition={{duration:2}}
            whileInView={{opacity:2,scale:3,rotate:20}}
            drag
            >
        </motion.div> */}
    </div>
  )
}

export default Test