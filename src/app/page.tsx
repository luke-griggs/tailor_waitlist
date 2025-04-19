"use client";

import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PhoneSlider from "@/components/PhoneSlider";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <PhoneSlider />
      </main>
      <Footer />
    </div>
  );
}
