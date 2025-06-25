import { Container } from "@/components/ui/base";
import React from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps): React.ReactNode {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 간소화된 헤더 */}
      <header className="py-4 border-b border-border">
        {/* 로고 섹션 */}
        <Container className="text-center mb-8">
          <Link
            to="/"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ZipCheck</h1>
            <p className="text-gray-600">안전한 부동산 거래의 시작</p>
          </Link>
        </Container>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex-grow flex items-center justify-center py-12">
        <Container className="max-w-md w-full">{children}</Container>
      </main>

      {/* 간소화된 푸터 */}
      <footer className="py-4 border-t border-border">
        <Container>
          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} 집체크. All rights reserved.</p>
            <div className="mt-2 flex justify-center space-x-4">
              <Link to="/terms" className="hover:text-primary">
                이용약관
              </Link>
              <Link to="/privacy" className="hover:text-primary">
                개인정보처리방침
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
