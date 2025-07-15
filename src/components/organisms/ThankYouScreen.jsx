import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ThankYouScreen = ({ feedbackData, onReset }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          onReset();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onReset]);

  const getSatisfactionLabel = (value) => {
    const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
    return labels[value - 1] || "";
  };

  const getNPSLabel = (value) => {
    if (value <= 6) return "Detractor";
    if (value <= 8) return "Passive";
    return "Promoter";
  };

  const getNPSColor = (value) => {
    if (value <= 6) return "text-red-600 bg-red-100";
    if (value <= 8) return "text-yellow-600 bg-yellow-100";
    return "text-green-600 bg-green-100";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-effect rounded-3xl p-12 max-w-lg w-full mx-4 text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring", bounce: 0.4 }}
          className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
        >
          <ApperIcon name="CheckCircle" className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl font-display font-bold text-gray-900 mb-4"
        >
          Thank You! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-gray-700 mb-8 leading-relaxed"
        >
          Your feedback has been successfully submitted. We appreciate you taking the time to share your thoughts with us!
        </motion.p>

        {/* Feedback Summary */}
        {feedbackData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-gray-50 rounded-2xl p-6 mb-8 text-left"
          >
            <h3 className="font-display font-semibold text-gray-900 mb-4 text-center">
              Your Feedback Summary
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Service Satisfaction:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-purple-600">{feedbackData.satisfaction}/5</span>
                  <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    {getSatisfactionLabel(feedbackData.satisfaction)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Ease of Use:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-purple-600">{feedbackData.easeOfUse}/5</span>
                  <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    {getSatisfactionLabel(feedbackData.easeOfUse)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Recommendation:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-purple-600">{feedbackData.nps}/10</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${getNPSColor(feedbackData.nps)}`}>
                    {getNPSLabel(feedbackData.nps)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-4"
        >
          <Button
            onClick={onReset}
            variant="accent"
            size="lg"
            className="w-full text-lg font-semibold"
          >
            <ApperIcon name="RotateCcw" className="w-5 h-5 mr-2" />
            Provide More Feedback
          </Button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-sm text-gray-600"
          >
            Returning to welcome screen in{" "}
            <span className="font-bold text-green-600">{countdown}</span> seconds
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ThankYouScreen;