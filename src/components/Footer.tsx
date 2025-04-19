import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-8 w-full border-t border-[#eeeeee] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#6c757d]">
            &copy; {new Date().getFullYear()} tailor. All rights reserved.
          </p>

          <div className="flex items-center space-x-6">
            <motion.a
              href="#"
              className="text-sm text-[#6c757d] transition-colors duration-200 hover:text-[#2E4F4F]"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-sm text-[#6c757d] transition-colors duration-200 hover:text-[#2E4F4F]"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
