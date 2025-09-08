"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { addToWaitlist } from "@/services/waitlistService";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setError(null);
    try {
      await addToWaitlist(email);
      setIsSubmitted(true);
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 5000);
    } catch (e: unknown) {
      setError(
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Mobile headline (shorter, solid for better boldness) */}
          <motion.h1
            className="block md:hidden text-5xl font-extrabold leading-tight tracking-tight mb-6"
            style={{ color: "#2D1B14" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="block">Try it on.</span>
            <span className="block">Before you order.</span>
          </motion.h1>

          {/* Desktop headline */}
          <motion.h1
            className="hidden md:block text-6xl md:text-6xl font-black leading-tight mb-6"
            style={{ color: "#2D1B14" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Try On Clothes Instantly with
            <span style={{ color: "#2D1B14" }}> Tailor</span>
          </motion.h1>

          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ backgroundColor: "#F3EFE5", color: "#2D1B14" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <span className="animate-pulse">✨</span>
              Limited early access
            </motion.div>

            <p className="mb-8" style={{ color: "#2D1B14" }}>
              <span className="font-semibold" style={{ color: "#2D1B14" }}>
                Join 2,400+ people
              </span>{" "}
              waiting for exclusive early access.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for early access"
                    required
                    disabled={isLoading}
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 focus:border-[#5d4c44] focus:outline-none transition-colors disabled:opacity-50 placeholder:text-gray-400"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600 text-left">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white font-bold text-lg py-4 px-8 hover:shadow-lg transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#2D1B14" }}
                  whileHover={!isLoading ? { scale: 1.05 } : {}}
                  whileTap={!isLoading ? { scale: 0.95 } : {}}
                >
                  {isLoading ? "SECURING YOUR SPOT..." : "GET EARLY ACCESS →"}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border-2 border-green-500 rounded-2xl p-6"
              >
                <div className="text-green-600 text-xl font-bold mb-2">
                  ✅ You&apos;re in!
                </div>
                <p style={{ color: "#2D1B14" }}>
                  We&apos;ll email you when your invite is ready.
                </p>
              </motion.div>
            )}

            <div className="mt-6 space-y-2">
              <p
                className="text-xs flex items-center justify-center gap-1"
                style={{ color: "#2D1B14" }}
              >
                <span>🔒</span> No spam. Unsubscribe anytime.
              </p>
            </div>
            {/* Demo video */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                <video
                  src="/demo_vid.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>

            {/* How it works */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-2xl">🛍️</div>
                  <div
                    className="mt-2 font-semibold"
                    style={{ color: "#2D1B14" }}
                  >
                    Find your clothing
                  </div>
                  <div className="text-sm" style={{ color: "#2D1B14" }}>
                    Pick items you&apos;re curious about.
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-2xl">📸</div>
                  <div
                    className="mt-2 font-semibold"
                    style={{ color: "#2D1B14" }}
                  >
                    Take a picture
                  </div>
                  <div className="text-sm" style={{ color: "#2D1B14" }}>
                    Snap a quick photo of yourself.
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-2xl">⚡</div>
                  <div
                    className="mt-2 font-semibold"
                    style={{ color: "#2D1B14" }}
                  >
                    See your fit
                  </div>
                  <div className="text-sm" style={{ color: "#2D1B14" }}>
                    Preview how it looks on you.
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="fixed inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </motion.div>
    </div>
  );
}
