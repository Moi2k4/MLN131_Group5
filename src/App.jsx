import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import StrategyGame from './components/StrategyGame';
import AIUsage from './components/AIUsage';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Section1 />
        <Section2 />
        <Section3 />
        <StrategyGame />
        <AIUsage />
      </main>
      <Footer />
    </>
  );
}