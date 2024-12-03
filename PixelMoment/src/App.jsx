import './app.scss'
import { Contact } from './components/contacts/Contact';
import { Cursor } from './components/cursor/Cursor';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import Parallax from './components/parallax/Parallax';
import Portfolio from './components/portfolio/Portfolio';
import PricingSection from './components/pricing/PricingSection';
import Services from './components/services/Services';

function App() {
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
      <PricingSection/>
      <section id='Contact'><Contact/></section>
    </div>
  );
}

export default App;
