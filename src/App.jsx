import React, { useState, useEffect } from "react";
import Options from "./components/Options";
import Feedback from "./components/Feedback";
import Notification from "./components/Notifcation";
import "./App.css";

const App = () => {
  const [feedback, setFeedback] = useState(() => {
    const saved = localStorage.getItem("feedback");
    return saved ? JSON.parse(saved) : { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (type) => {
    setFeedback((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positivePercentage = totalFeedback
    ? Math.round((feedback.good / totalFeedback) * 100)
    : 0;

  return (
    <div className="app-container">
      <h1>Sip Happens Café</h1>
      <p>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>

      <Options
        onLeaveFeedback={updateFeedback}
        onReset={resetFeedback}
        total={totalFeedback}
      />

      {totalFeedback > 0 ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          total={totalFeedback}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message="No feedback yet." />
      )}
    </div>
  );
};

export default App;
