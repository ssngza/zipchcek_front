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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

interface SignupErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  general?: string;
}

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<SignupErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // 입력 필드 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // 입력 시 해당 필드의 에러 제거
    if (errors[name as keyof SignupErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // 폼 검증
  const validateForm = (): boolean => {
    const newErrors: SignupErrors = {};

    // 이름 검증
    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "이름은 최소 2글자 이상이어야 합니다.";
    }

    // 이메일 검증
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자리 이상이어야 합니다.";
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "비밀번호는 영문과 숫자를 포함해야 합니다.";
    }

    // 비밀번호 확인 검증
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    // 전화번호 검증
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "전화번호를 입력해주세요.";
    } else if (!/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 회원가입 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // TODO: 실제 API 호출로 교체
      // 임시 회원가입 로직 (데모용)
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 지연

      // 데모용 성공 처리
      console.log("회원가입 데이터:", formData);

      // 회원가입 성공 시 로그인 페이지로 이동
      navigate("/login", {
        state: {
          message: "회원가입이 완료되었습니다. 로그인해주세요.",
          email: formData.email,
        },
      });
    } catch (error) {
      setErrors({
        general: "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고 섹션 */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ZipCheck</h1>
            <p className="text-gray-600">안전한 부동산 거래의 시작</p>
          </Link>
        </div>

        {/* 회원가입 카드 */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              회원가입
            </CardTitle>
            <CardDescription className="text-center">
              ZipCheck 계정을 만들어 안전한 부동산 거래를 시작하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 전체 에러 메시지 */}
            {errors.general && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 이름 입력 */}
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={
                    errors.name
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* 이메일 입력 */}
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* 전화번호 입력 */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">전화번호</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="010-1234-5678"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={
                    errors.phoneNumber
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  disabled={isLoading}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>

              {/* 비밀번호 입력 */}
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
                <p className="text-xs text-gray-500">
                  8자리 이상, 영문과 숫자 포함
                </p>
              </div>

              {/* 비밀번호 확인 입력 */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={
                    errors.confirmPassword
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* 회원가입 버튼 */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "회원가입 중..." : "회원가입"}
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

            {/* 로그인 링크 */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                이미 계정이 있으신가요?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:underline"
                >
                  로그인
                </Link>
              </p>
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
