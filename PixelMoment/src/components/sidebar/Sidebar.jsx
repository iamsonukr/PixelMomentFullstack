import { useEffect, useState } from 'react'
import Links from './links/Links'
import './sidebar.scss'
import ToggleButton from './toggleButton/ToggleButton'
import { motion } from 'framer-motion'

function Sidebar() {
    const [open,setOpen]=useState(false)

    useEffect(()=>{
        if(open){
            console.log("Open")
        }
        else{
            console.log("closed")
        }

    },[open])
    
    const variants={
        open:{
            clipPath:"circle(1200px at 10px 10px)",
            transition:{
                type:"spring",
                stiffness:20,
            }
        },
        closed:{
            clipPath:"circle(0px at 10px 10px)",
            transition:{
                delay:0.2,
                type:"spring",
                stiffness:400,
                damping:40,
            }
        }
    }
    return (
        <motion.div className="sidebar" animate={open ? "open":"closed"}>
            <motion.div className='bg2' variants={variants}>
                <Links/>
            </motion.div>
            <ToggleButton setOpen={setOpen}/>
        </motion.div>
  )
}

export default Sidebar