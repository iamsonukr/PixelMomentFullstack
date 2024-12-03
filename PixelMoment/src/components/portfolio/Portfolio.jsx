import './portfolio.scss'
import { useRef, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const portfolioItems = [
  {
    id: 1,
    title: "Wedding Photography",
    category: "Events",
    img: "/wedding-work.png",
    desc: "Capturing beautiful moments of celebration and love. Our wedding photography service focuses on both candid emotions and styled shots, ensuring every precious moment is preserved forever.",
    metrics: {
      location: "Grand Plaza Hotel",
      date: "Summer 2023",
      photos: "200+ delivered"
    }
  },
  {
    id: 2,
    title: "Corporate Brand Story",
    category: "Commercial",
    img: "/corporate-work.png",
    desc: "A comprehensive visual branding project for TechCorp, including executive portraits, office culture shots, and product photography that elevated their brand image.",
    metrics: {
      location: "TechCorp HQ",
      date: "Fall 2023",
      deliverables: "Brand Photo Kit + 4K Video"
    }
  },
  {
    id: 3,
    title: "Fashion Look Book",
    category: "Commercial",
    img: "/fashion-work.png",
    desc: "Professional fashion photography for Season's latest collection. Studio and location shoots combining dramatic lighting with dynamic poses to showcase the designs.",
    metrics: {
      location: "Urban Studio",
      date: "Winter 2023",
      photos: "50+ edited shots"
    }
  },
  {
    id: 4,
    title: "Nature Documentary",
    category: "Videography",
    img: "/wildlife-work.png",
    desc: "A stunning 4K nature documentary capturing local wildlife and landscapes. Combining drone footage with ground-level cinematography for a comprehensive perspective.",
    metrics: {
      location: "National Park",
      duration: "15 minutes",
      format: "4K HDR"
    }
  },
]

const Single = ({ item }) => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const screenWidth = window.innerWidth;
  const imageY = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const textY = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  return (
    <section className='project' ref={ref}>
      {screenWidth > 1200 ? (
        <div className="container">
          <div className="wrapper">
            <motion.div className="imageContainer" style={{ y: imageY }}>
              <img src={item.img} alt={item.title} />
              <div className="category-tag">{item.category}</div>
            </motion.div>
            <motion.div className="textContainer" style={{ y: textY }}>
              <h2>{item.title}</h2>
              <p className='discription'>{item.desc}</p>
              <div className="metrics">
                {Object.entries(item.metrics).map(([key, value]) => (
                  <div key={key} className="metric">
                    <span className="label">{key}:</span>
                    <span className="value">{value}</span>
                  </div>
                ))}
              </div>
              <div className="buttons">
                <button className="primary">View Gallery</button>
                <button className="secondary">Project Details</button>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="container mobile">
          <div className="wrapper">
            <div className="imageContainer">
              <img src={item.img} alt={item.title} />
              <div className="category-tag">{item.category}</div>
            </div>
            <div className="textContainer">
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <div className="metrics">
                {Object.entries(item.metrics).map(([key, value]) => (
                  <div key={key} className="metric">
                    <span className="label">{key}:</span>
                    <span className="value">{value}</span>
                  </div>
                ))}
              </div>
              <div className="buttons">
                <button className="primary">View Gallery</button>
                <button className="secondary">Project Details</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

function Portfolio() {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(v => console.log(v));
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div className='portfolio' ref={ref}>
      <div className="progress">
        <h1>Featured Work</h1>
        <p>Browse through our most impactful projects</p>
        <motion.div className="progressBar" style={{ scaleX }}></motion.div>
      </div>
      {portfolioItems.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
}

export default Portfolio;