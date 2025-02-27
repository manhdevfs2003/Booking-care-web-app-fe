// SideNav.js
import React from "react";
import { motion } from "framer-motion";

const SideNav = ({ isOpen, onClose }) => {
  return (
    <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -100 }} transition={{ duration: 0.3 }} className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg p-4 ${isOpen ? "block" : "hidden"}`}>
      <button onClick={onClose} className="text-right text-xl">
        &times;
      </button>
      <ul className="mt-4">
        <li className="py-2">Menu 1</li>
        <li className="py-2">Menu 2</li>
        <li className="py-2">Menu 3</li>
      </ul>
    </motion.div>
  );
};

export default SideNav;
