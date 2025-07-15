import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Slider = React.forwardRef(({ 
  value = 0, 
  onChange, 
  min = 0, 
  max = 10, 
  step = 1,
  className,
  ...props 
}, ref) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e) => {
    if (onChange) {
      onChange(parseInt(e.target.value));
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative h-8 flex items-center">
        {/* Track Background */}
        <div className="absolute inset-0 h-2 bg-gray-200 rounded-full top-1/2 transform -translate-y-1/2"></div>
        
        {/* Progress Fill */}
        <motion.div 
          className="absolute h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full top-1/2 transform -translate-y-1/2"
          style={{ width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        ></motion.div>
        
        {/* Slider Input */}
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute inset-0 w-full h-8 opacity-0 cursor-pointer z-10"
          {...props}
        />
        
        {/* Custom Thumb */}
        <motion.div
          className="absolute w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full border-3 border-white shadow-lg z-20 pointer-events-none"
          style={{ left: `calc(${percentage}% - 12px)` }}
          animate={{ 
            scale: isDragging ? 1.3 : 1,
            boxShadow: isDragging 
              ? "0 8px 25px rgba(0, 0, 0, 0.25)" 
              : "0 4px 12px rgba(0, 0, 0, 0.15)"
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </div>
      
      {/* Value Display */}
      <motion.div
        className="absolute -top-12 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg font-medium z-30"
        style={{ left: `calc(${percentage}% - 20px)` }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isDragging ? 1 : 0,
          scale: isDragging ? 1 : 0.8 
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {value}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </motion.div>
    </div>
  );
});

Slider.displayName = "Slider";

export default Slider;