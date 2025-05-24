import { Navigate, Route, Routes } from "react-router";
import UploadPage from "./routes/UploadPage";
import InterviewPage from "./routes/InterviewPage";
import FeedbackPage from "./routes/FeedbackPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UploadPage />} />
      <Route path="/interview/:interviewId" element={<InterviewPage />} />
      <Route path="/feedback/:feedbackId" element={<FeedbackPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
