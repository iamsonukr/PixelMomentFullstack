import './services.scss'
import { motion } from 'framer-motion'

const variants = {
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
}

function Services() {
    return (
        <motion.div className='services' variants={variants} initial="initial" whileInView="animate">
            <motion.div className="textContainer" variants={variants}>
                <p>Capturing moments that last <br /> a lifetime</p>
                <hr />
            </motion.div>

            <motion.div className="titleContainer" variants={variants} >
                <div className="title">
                    <img src="/camera.png" alt="Professional-camera" />
                    <h1><motion.b whileHover={{ color: "#666666" }}>Professional</motion.b> Photography</h1>
                </div>
                <div className="title">
                    <h1>
                        <motion.b whileHover={{ color: "#666666" }}>and</motion.b> Videography
                    </h1>
                    {/* <button>View Our Work</button> */}
                </div>
            </motion.div>
            

            <motion.div className="listContainer" variants={variants}>
                <motion.div className="box portrait" whileHover={{ backgroundColor: "white", color: "#1A1A1A" , scale:1.1}}>
                    <h2>Portrait Photography</h2>
                    <p>Professional portrait sessions capturing your best angles. Perfect for individuals, families, and corporate headshots. Using state-of-the-art equipment to ensure stunning results.</p>
                    {/* <button>Learn More</button> */}
                </motion.div>
                <motion.div className="box event" whileHover={{ backgroundColor: "white", color: "#1A1A1A" , scale:1.1 }}>
                    <h2>Event Coverage</h2>
                    <p>Comprehensive event photography and videography services. From weddings to corporate events, we capture every meaningful moment with attention to detail.</p>
                    {/* <button>Learn More</button> */}
                </motion.div>

            </motion.div>
            
            <motion.div className='listContainer' variants={variants} >

                <motion.div className="box commerce" whileHover={{ backgroundColor: "white", color: "#1A1A1A" , scale:1.1 }}>
                    <h2>Commercial Shoots</h2>
                    <p>Professional product photography and promotional videos for your business. High-quality visuals that showcase your products and services in the best light.</p>
                    {/* <button>Learn More</button> */}
                </motion.div>
                <motion.div className="box video" whileHover={{ backgroundColor: "white", color: "#1A1A1A" , scale:1.1 }}>
                    <h2>Video Production</h2>
                    <p>Full-service video production including pre-production planning, shooting, and post-production editing. Creating compelling visual stories for your brand.</p>
                    {/* <button>Learn More</button> */}
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default Services