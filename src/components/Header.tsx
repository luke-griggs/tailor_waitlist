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
              <motion.svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#2E4F4F] transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0001 5.24882C10.7001 2.74882 7.79998 1.99882 5.69998 3.61882C3.59998 5.23882 3.59998 8.50882 5.69998 10.1188L11.8401 15.3988C11.9296 15.476 12.0706 15.476 12.1601 15.3988L18.3001 10.1188C20.4001 8.50882 20.4001 5.23882 18.3001 3.61882C16.2001 1.99882 13.3001 2.74882 12.0001 5.24882Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </div>
            <span className="text-2xl font-medium text-[#2E4F4F] transition-all duration-300 group-hover:text-[#253f3f]">
              tailor
            </span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
