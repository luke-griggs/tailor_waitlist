"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Load Tally script after component mounts
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      script.onload = () => {
        // @ts-expect-error - Tally is not defined in the global scope
        if (typeof window.Tally !== 'undefined') {
          // @ts-expect-error - Tally.loadEmbeds is not defined in the global scope
          window.Tally.loadEmbeds();
        }
      };
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-[#2E4F4F] mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your AI Fashion Assistant
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-[#6c757d] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover your perfect style with AI-powered recommendations. Join
            thousands of fashion enthusiasts already on the waitlist.
          </motion.p>
        </div>
        
        {isMounted && (
          <iframe 
            data-tally-src="https://tally.so/embed/mRrpqP?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="174"
            frameBorder="0"
            title="Tailor Waitlist"
          />
        )}
        {!isMounted && (
          <div style={{ height: "174px" }} />
        )}         
      </div>
    </section>
  );
};

export default HeroSection;
