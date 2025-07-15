import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ title = "No feedback yet", message = "Be the first to share your thoughts!", onAction, actionText = "Get Started" }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-12 shadow-lg max-w-md w-full mx-4 text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="MessageSquare" className="w-10 h-10 text-purple-600" />
        </div>
        
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
          {title}
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {message}
        </p>
        
        {onAction && (
          <button
            onClick={onAction}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium py-3 px-6 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {actionText}
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default Empty;