import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import RatingSlider from "@/components/molecules/RatingSlider";
import ApperIcon from "@/components/ApperIcon";

const FeedbackForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    satisfaction: 3,
    easeOfUse: 3,
    nps: 7
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const questions = [
    {
      key: "satisfaction",
      label: "How satisfied are you with our service?",
      description: "Rate your overall satisfaction with our product or service",
      min: 1,
      max: 5,
      emojis: ["😞", "😐", "🙂", "😊", "🤩"]
    },
    {
      key: "easeOfUse",
      label: "How easy was it to use our product?",
      description: "Rate the user-friendliness and ease of navigation",
      min: 1,
      max: 5,
      emojis: ["😤", "😕", "😊", "😄", "🎉"]
    },
    {
      key: "nps",
      label: "How likely are you to recommend us?",
      description: "On a scale of 0-10, how likely are you to recommend us to others?",
      min: 0,
      max: 10,
      icons: ["Frown", "Frown", "Frown", "Frown", "Frown", "Frown", "Frown", "Meh", "Meh", "Smile", "Smile"]
    }
  ];

  const handleValueChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Clear error for this field
    if (errors[key]) {
      setErrors(prev => ({
        ...prev,
        [key]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    questions.forEach(question => {
      const value = formData[question.key];
      if (value < question.min || value > question.max) {
        newErrors[question.key] = `Please select a value between ${question.min} and ${question.max}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCompletionPercentage = () => {
    const validAnswers = questions.filter(q => {
      const value = formData[q.key];
      return value >= q.min && value <= q.max;
    }).length;
    return Math.round((validAnswers / questions.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <button
            onClick={onBack}
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4 transition-colors"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back
          </button>
          
          <h1 className="text-3xl font-display font-bold gradient-text mb-4">
            Share Your Feedback
          </h1>
          
          <div className="bg-white rounded-xl p-4 shadow-sm max-w-sm mx-auto">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{getCompletionPercentage()}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getCompletionPercentage()}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((question, index) => (
            <motion.div
              key={question.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <RatingSlider
                label={question.label}
                description={question.description}
                value={formData[question.key]}
                onChange={(value) => handleValueChange(question.key, value)}
                min={question.min}
                max={question.max}
                emojis={question.emojis}
                icons={question.icons}
              />
              {errors[question.key] && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-2 flex items-center"
                >
                  <ApperIcon name="AlertCircle" className="w-4 h-4 mr-1" />
                  {errors[question.key]}
                </motion.p>
              )}
            </motion.div>
          ))}

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="pt-4"
          >
            <Button
              type="submit"
              size="lg"
              loading={isSubmitting}
              className="w-full text-lg font-semibold"
            >
              {isSubmitting ? (
                "Submitting Feedback..."
              ) : (
                <>
                  <ApperIcon name="Send" className="w-5 h-5 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </motion.div>
        </form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            Your responses are anonymous and help us improve our service
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackForm;