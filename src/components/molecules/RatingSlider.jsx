import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Slider from "@/components/atoms/Slider";
import ApperIcon from "@/components/ApperIcon";

const RatingSlider = ({ 
  label, 
  value, 
  onChange, 
  min = 1, 
  max = 5, 
  description,
  emojis = [],
  icons = []
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleChange = (newValue) => {
    setCurrentValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const getEmoji = () => {
    if (emojis.length > 0) {
      const index = Math.max(0, Math.min(currentValue - min, emojis.length - 1));
      return emojis[index];
    }
    return null;
  };

  const getIcon = () => {
    if (icons.length > 0) {
      const index = Math.max(0, Math.min(currentValue - min, icons.length - 1));
      return icons[index];
    }
    return null;
  };

  const getValueLabel = () => {
    if (max === 10 && min === 0) {
      if (currentValue <= 6) return "Detractor";
      if (currentValue <= 8) return "Passive";
      return "Promoter";
    }
    
    if (max === 5) {
      const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
      return labels[currentValue - 1] || "";
    }
    
    return "";
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">
          {label}
        </h3>
        {description && (
          <p className="text-gray-600 text-sm">
            {description}
          </p>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">{min}</span>
          <div className="flex items-center space-x-3">
            {getEmoji() && (
              <motion.span 
                className="text-3xl"
                key={currentValue}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {getEmoji()}
              </motion.span>
            )}
            {getIcon() && (
              <motion.div
                key={currentValue}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <ApperIcon 
                  name={getIcon()} 
                  className="w-8 h-8 text-purple-600" 
                />
              </motion.div>
            )}
            <motion.span 
              className="text-2xl font-bold gradient-text"
              key={currentValue}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {currentValue}
            </motion.span>
          </div>
          <span className="text-sm font-medium text-gray-500">{max}</span>
        </div>

        <Slider
          value={currentValue}
          onChange={handleChange}
          min={min}
          max={max}
          step={1}
          className="mb-4"
        />

        {getValueLabel() && (
          <motion.div 
            className="text-center"
            key={currentValue}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              {getValueLabel()}
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default RatingSlider;