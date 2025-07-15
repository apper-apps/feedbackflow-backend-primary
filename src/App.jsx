import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreen from "@/components/organisms/WelcomeScreen";
import FeedbackForm from "@/components/organisms/FeedbackForm";
import ThankYouScreen from "@/components/organisms/ThankYouScreen";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useFeedback } from "@/hooks/useFeedback";

const SCREENS = {
  WELCOME: "welcome",
  FORM: "form",
  THANK_YOU: "thank_you"
};

function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.WELCOME);
  const [submittedFeedback, setSubmittedFeedback] = useState(null);
  const { submitFeedback, loading, error } = useFeedback();

  const handleStartSurvey = () => {
    setCurrentScreen(SCREENS.FORM);
  };

  const handleBackToWelcome = () => {
    setCurrentScreen(SCREENS.WELCOME);
    setSubmittedFeedback(null);
  };

  const handleSubmitFeedback = async (feedbackData) => {
    try {
      const result = await submitFeedback(feedbackData);
      setSubmittedFeedback(result);
      setCurrentScreen(SCREENS.THANK_YOU);
      toast.success("Feedback submitted successfully! Thank you for your input.");
    } catch (err) {
      toast.error("Failed to submit feedback. Please try again.");
    }
  };

  const handleReset = () => {
    setCurrentScreen(SCREENS.WELCOME);
    setSubmittedFeedback(null);
  };

  if (loading && currentScreen === SCREENS.FORM) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={handleReset} />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <AnimatePresence mode="wait">
          {currentScreen === SCREENS.WELCOME && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <WelcomeScreen onStart={handleStartSurvey} />
            </motion.div>
          )}

          {currentScreen === SCREENS.FORM && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <FeedbackForm
                onSubmit={handleSubmitFeedback}
                onBack={handleBackToWelcome}
              />
            </motion.div>
          )}

          {currentScreen === SCREENS.THANK_YOU && (
            <motion.div
              key="thank-you"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ThankYouScreen
                feedbackData={submittedFeedback}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;