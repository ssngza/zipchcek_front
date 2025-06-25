import { Container } from "@/components/ui/base";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 로고 및 소개 */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-primary">집체크</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              전세사기 예방을 위한 안전한 부동산 검증 서비스
            </p>
          </div>

          {/* 서비스 링크 */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-foreground mb-4">서비스</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/upload"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  등기부등본 분석
                </Link>
              </li>
              <li>
                <Link
                  to="/guide"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  등기부등본 발급 안내
                </Link>
              </li>
              <li>
                <Link
                  to="/dictionary"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  부동산 용어 사전
                </Link>
              </li>
            </ul>
          </div>

          {/* 회사 정보 */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-foreground mb-4">회사</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  회사 소개
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-foreground mb-4">고객지원</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  문의하기
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@zipcheck.kr"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  support@zipcheck.kr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 정보 */}
        <div className="border-t border-border mt-8 pt-6 text-center text-muted-foreground text-sm">
          <p>© {currentYear} 집체크. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
