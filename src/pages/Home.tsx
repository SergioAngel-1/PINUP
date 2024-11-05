import React from 'react';
import Hero from '../components/Hero';
import DailyTip from '../components/DailyTip';
import Benefits from '../components/Benefits';
import Plans from '../components/Plans';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DailyTip />
      </div>
      <Benefits />
      <Plans />
      <Contact />
    </>
  );
}