import { useState, useEffect } from "react";
import { feedbackService } from "@/services/api/feedbackService";

export const useFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadFeedback = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await feedbackService.getAll();
      setFeedback(data);
    } catch (err) {
      setError(err.message || "Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async (feedbackData) => {
    setLoading(true);
    setError(null);
    
    try {
      const newFeedback = await feedbackService.create(feedbackData);
      setFeedback(prev => [...prev, newFeedback]);
      return newFeedback;
    } catch (err) {
      setError(err.message || "Failed to submit feedback");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  return {
    feedback,
    loading,
    error,
    loadFeedback,
    submitFeedback
  };
};