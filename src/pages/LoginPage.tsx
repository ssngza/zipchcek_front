import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고 섹션 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ZipCheck</h1>
          <p className="text-gray-600">안전한 부동산 거래의 시작</p>
        </div>

        {/* 로그인 카드 */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              로그인
            </CardTitle>
            <CardDescription className="text-center">
              계정에 로그인하여 ZipCheck 서비스를 이용하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4">
              {/* 이메일 입력 */}
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* 비밀번호 입력 */}
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* 로그인 버튼 */}
              <Button type="submit" className="w-full" size="lg">
                로그인
              </Button>
            </form>

            {/* 구분선 */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">또는</span>
              </div>
            </div>

            {/* 회원가입 링크 */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                아직 계정이 없으신가요?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary hover:underline"
                >
                  회원가입
                </Link>
              </p>

              {/* 비밀번호 찾기 링크 */}
              <Link
                to="/forgot-password"
                className="text-sm text-gray-500 hover:text-primary hover:underline block"
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 푸터 */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 ZipCheck. 모든 권리 보유.
          </p>
        </div>
      </div>
    </div>
  );
}
