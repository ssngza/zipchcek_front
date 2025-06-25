import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import TermDictionary from "./components/TermDictionary";
import termDefinitions from "./data/termDefinitions";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import LoadingPage from "./pages/LoadingPage";
import LoginPage from "./pages/LoginPage";
import RegistrationGuidePage from "./pages/RegistrationGuidePage";
import ResultPage from "./pages/ResultPage";
import SignupPage from "./pages/SignupPage";
import UploadPage from "./pages/UploadPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route
            path="/registration-guide"
            element={<RegistrationGuidePage />}
          />
          <Route
            path="/dictionary"
            element={
              <div className="container mx-auto px-4 py-8 max-w-4xl">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
                  부동산 용어 사전
                </h1>
                <TermDictionary terms={termDefinitions} />
              </div>
            }
          />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
