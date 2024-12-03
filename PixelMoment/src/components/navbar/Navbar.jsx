import Sidebar from '../sidebar/Sidebar'
import './navbar.scss'
import { motion } from 'framer-motion'

function Navbar() {
  return (
    <div className='navbar'>
        {/* sidebar */}
        <Sidebar/>
        <div className="wrapper">
            <motion.span 
            initial={{opacity:0,scale:0.5}}
            whileInView={{opacity:1,scale:1}}
            transition={{duration:0.4}}

            >Pixel Moments</motion.span>
            <div className="social">
                <a href="https://www.facebook.com/"><img src="/facebook.png" alt="" /></a>
                <a href="https://www.instagram.com/"><img src="/instagram.png" alt="" /></a>
                <a href="https://www.dribble.com/"><img src="/dribbble.png" alt="" /></a>
                <a href="https://www.youtube.com/"><img src="/youtube.png" alt="" /></a>
            </div>
        </div>
    </div>
  )
}

export default Navbar