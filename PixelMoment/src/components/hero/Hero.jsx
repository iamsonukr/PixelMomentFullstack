import React from 'react'
import './hero.scss'
import { motion } from 'framer-motion'

function Hero() {
    const textVariants = {
        initial: {
            x: -500,
            opaCity: 0,
        },
        animate: {
            x: 0,
            opaCity: 1,
            transition: {
                duration: 1,
                staggerChildren: 0.1,
            }
        },
        scrollButton: {
            opacity: 0,
            y: 10,
            transition: {
                duration: 2,
                repeat: Infinity
            }
        }
    }

    const sliderVariants = {
        initial: {
            x: 0,
        },
        animate: {
            x: "-220%",
            transition: {
                repeat: Infinity,
                repeatType: "mirror",
                duration: 20,
            }
        }
    }
    return (
        <div className='hero'>
            <div className="wrapper">
                {/* Text container here */}
                <motion.div className="textContainer"
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                >
                    <motion.h1>Pixel Moments</motion.h1>
                    <motion.h2>Photography</motion.h2>
                    <motion.p className='hero-para'>
                        From breathtaking photos to cinematic videos, our team of professionals ensures that every detail, emotion, and smile is preserved beautifully. Let us tell your story through our lens, creating keepsakes that you’ll treasure for a lifetime.
                    </motion.p>
                    <motion.div className="buttons">
                        <button>See the latest work</button>
                        <button>Contact Us</button>
                    </motion.div>
                    <motion.img src="/scroll.png" variants={textVariants}
                        animate='scrollButton' alt="" />
                </motion.div>
                {/* Sliding text */}
                <motion.div className="slidingTextContainer" variants={sliderVariants} initial="initial" animate="animate">
                    Birthday Photoshoot, Marraige Photshoot ,Event Photography and VideoGraphy
                </motion.div>

                {/* Image container here */}
                <motion.div className="imageContainer">
                    <img className='heroImg' src="https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_840.jpg" alt="" />
                </motion.div>
            </div>
        </div>
    )
}

export default Hero