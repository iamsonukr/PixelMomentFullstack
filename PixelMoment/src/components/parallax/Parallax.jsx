import React, { useRef } from 'react'
import './parallax.scss'
import { motion,useScroll,useTransform } from 'framer-motion' 

function Parallax({type}) {
    const ref=useRef();
    const{scrollYProgress}=useScroll({target:ref,offset:["start start","end start"]})

    const yBg=useTransform(scrollYProgress,[0,1],["0%","30%"])
    const yText=useTransform(scrollYProgress,[0,1],["0%","30%"])

    const sliderVariants={
        initial:{
            x:0,
        },
        animate:{
            x:"-220%",
            transition:{
                repeat:Infinity, 
                repeatType:"mirror",
                duration:20,
            }
        }
    }

  return (
        <div className='parallax' ref={ref}
            style={{
                background: type === "services"
                    ? "linear-gradient(180deg,#ffffff, #0a0041)"
                    : "linear-gradient(180deg,#111132, #505064)"
            }}>
            <motion.h1 style={{y:yText}}>{type === "services" ? "Professional Photoshoots for Every Occasion." : "Capture the Magic of Your Special Day with Us."}</motion.h1>
            <motion.div  className={type === "services" ? "flowers2" : "flowers"}></motion.div>

            <motion.div variants={sliderVariants} initial="initial" animate="animate" style={{y:yBg, backgroundImage:`url(${type=="services"?"/planets.png":"/sun.png"})`}} className="planets"></motion.div>

            <motion.div style={{y:yBg, backgroundImage:`url(${type==="services"?"/couple.png":"/couple-2.png"})`}} className={type==="services"?"couple":"ind-couple"}></motion.div>
            <motion.div style={{x:yBg}} className="couple-bg"></motion.div>
        </div>
    )
}

export default Parallax