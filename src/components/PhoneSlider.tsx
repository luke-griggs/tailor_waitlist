"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const sliderImages = [
  "/SCREENSHOT1.PNG",
  "/SCREENSHOT2.PNG",
  "/SCREENSHOT3.PNG",
  "/SCREENSHOT4.PNG",
];

const PhoneSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Auto slide functionality
  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoplay]);

  // Pause autoplay when user interacts
  const pauseAutoplay = () => {
    setIsAutoplay(false);
    // Resume after inactivity
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const nextSlide = () => {
    pauseAutoplay();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    pauseAutoplay();
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + sliderImages.length) % sliderImages.length
    );
  };

  return (
    <section className="py-16 md:py-24 bg-[#f8f9fa] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="relative"
      >
        {/* Phone Frame */}
        <div className="relative w-[320px] aspect-[9/19.5] mx-auto overflow-visible">
          {/* Phone Shadow */}
          <div
            className="absolute -inset-1 rounded-[48px] bg-black/5 blur-lg -z-10"
            aria-hidden="true"
          ></div>

          {/* Phone Body */}
          <div className="absolute inset-0 rounded-[40px] bg-black overflow-hidden border-[8px] border-black">
            {/* Phone Screen */}
            <div className="relative w-full h-full overflow-hidden bg-white">
              {/* Status Bar */}


              {/* Slider Content */}
              <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={sliderImages[currentIndex]}
                      alt={`App Screenshot ${currentIndex + 1}`}
                      fill
                      quality={90}
                      sizes="320px"
                      priority={currentIndex === 0}
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md text-[#2E4F4F] transition-all duration-300 hover:bg-white focus:outline-none"
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md text-[#2E4F4F] transition-all duration-300 hover:bg-white focus:outline-none"
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>

          {/* Dots Indicator */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex space-x-2">
            {sliderImages.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  pauseAutoplay();
                  setCurrentIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-[#2E4F4F] w-4"
                    : "bg-[#2E4F4F]/30 hover:bg-[#2E4F4F]/50 w-2"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PhoneSlider;
