import { Button } from "@/components/ui/button";
import { getNaverLoginUrl } from "@/services/naver.api";

interface NaverLoginButtonProps {
  className?: string;
}

export default function NaverLoginButton({
  className = "",
}: NaverLoginButtonProps) {
  const handleNaverLogin = () => {
    const naverLoginUrl = getNaverLoginUrl();
    window.location.href = naverLoginUrl;
  };

  return (
    <Button
      onClick={handleNaverLogin}
      className={`w-full bg-[#03C75A] hover:bg-[#03C75A]/90 text-white font-medium ${className}`}
      type="button"
    >
      <svg
        className="mr-2 h-5 w-5"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.7892 0H1.21078C0.542051 0 0 0.542051 0 1.21078V18.7892C0 19.4579 0.542051 20 1.21078 20H18.7892C19.4579 20 20 19.4579 20 18.7892V1.21078C20 0.542051 19.4579 0 18.7892 0Z"
          fill="#03C75A"
        />
        <path
          d="M11.307 10.1229L8.61152 6.25122H6.25V13.7488H8.69316V9.87707L11.3885 13.7488H13.75V6.25122H11.307V10.1229Z"
          fill="white"
        />
      </svg>
      네이버 로그인
    </Button>
  );
}
