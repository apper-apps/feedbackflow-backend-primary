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

const calculateAverages = () => {
    if (feedback.length === 0) return null;
    
    const totals = feedback.reduce((acc, item) => ({
      satisfaction: acc.satisfaction + item.satisfaction,
      easeOfUse: acc.easeOfUse + item.easeOfUse,
      nps: acc.nps + item.nps
    }), { satisfaction: 0, easeOfUse: 0, nps: 0 });
    
    return {
      satisfaction: (totals.satisfaction / feedback.length).toFixed(1),
      easeOfUse: (totals.easeOfUse / feedback.length).toFixed(1),
      nps: (totals.nps / feedback.length).toFixed(1)
    };
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  return {
    feedback,
    loading,
    error,
    loadFeedback,
    submitFeedback,
    calculateAverages
  };
};