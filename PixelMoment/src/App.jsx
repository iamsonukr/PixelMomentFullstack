import { useState } from 'react';
import './app.scss'
import { Contact } from './components/contacts/Contact';
import { Cursor } from './components/cursor/Cursor';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import Parallax from './components/parallax/Parallax';
import PleaseWait from './components/PleaseWait/PleaseWait';
import Portfolio from './components/portfolio/Portfolio';
import PricingSection from './components/pricing/PricingSection';
import Services from './components/services/Services';

function App() {
  const url='https://pixelmomentfullstack.onrender.com'
  // const url='http://localhost:5002'

  const [paymentProgress,setPaymentProgress]=useState(false)
  if(paymentProgress){
    return <PleaseWait/>
  }else{

    return (
      <div>
      {/* <Cursor/> */}
      <section id='Homepage'>

        <Navbar/>
        <Hero/>
      </section>
      <section id='Services'><Parallax type="services"/></section>
      <section><Services/></section>
      <section id='Portfolio'><Parallax type="portfolio"/></section>
      <Portfolio/>
      <PricingSection />
      <section id='Contact'><Contact url={url} paymentProgress={paymentProgress} setPaymentProgress={setPaymentProgress} /></section>
    </div>
  );
}
}

export default App;
