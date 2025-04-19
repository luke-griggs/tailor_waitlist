import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      className="py-6 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center md:justify-start">
          <motion.div
            className="flex items-center space-x-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              
            </div>
            <span className="text-2xl font-bold text-[#2E4F4F] transition-all duration-300 group-hover:text-[#253f3f]">
              tailor
            </span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
