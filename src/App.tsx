import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<div>Login Page (Coming Soon)</div>} />
          <Route
            path="/signup"
            element={<div>Signup Page (Coming Soon)</div>}
          />
          <Route
            path="/upload"
            element={<div>Upload Page (Coming Soon)</div>}
          />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
