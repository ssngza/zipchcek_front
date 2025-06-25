import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import NaverCallback from "./components/auth/NaverCallback";
import AuthLayout from "./components/AuthLayout";
import Layout from "./components/Layout";
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
      <Routes>
        {/* 인증이 필요한 페이지 (간소화된 레이아웃) */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <SignupPage />
            </AuthLayout>
          }
        />

        {/* 네이버 로그인 콜백 처리 */}
        <Route path="/auth/callback/naver" element={<NaverCallback />} />

        {/* 레이아웃이 적용된 페이지 */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/upload"
          element={
            <Layout>
              <UploadPage />
            </Layout>
          }
        />
        <Route
          path="/loading"
          element={
            <Layout hideFooter>
              <LoadingPage />
            </Layout>
          }
        />
        <Route
          path="/result"
          element={
            <Layout>
              <ResultPage />
            </Layout>
          }
        />
        <Route
          path="/history"
          element={
            <Layout>
              <HistoryPage />
            </Layout>
          }
        />
        <Route
          path="/guide"
          element={
            <Layout>
              <RegistrationGuidePage />
            </Layout>
          }
        />
        <Route
          path="/dictionary"
          element={
            <Layout>
              <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
                  부동산 용어 사전
                </h1>
                <TermDictionary terms={termDefinitions} />
              </div>
            </Layout>
          }
        />

        {/* 404 페이지 */}
        <Route
          path="*"
          element={
            <Layout>
              <div className="flex flex-col items-center justify-center py-16">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  페이지를 찾을 수 없습니다
                </p>
                <a href="/" className="text-primary hover:underline">
                  홈으로 돌아가기
                </a>
              </div>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
