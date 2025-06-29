import { useAuthContext } from "@/contexts/AuthContext";
import { naverApi } from "@/services/naver.api";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface NaverUserProfile {
  id: string;
  email?: string;
  name?: string;
  nickname?: string;
  profile_image?: string;
}

interface NaverTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

interface NaverProfileResponse {
  resultcode: string;
  message: string;
  response: {
    id: string;
    email?: string;
    name?: string;
    nickname?: string;
    profile_image?: string;
    gender?: string;
    age?: string;
    birthday?: string;
    mobile?: string;
  };
}

export default function NaverCallback() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;

    const processNaverCallback = async () => {
      try {
        // URL에서 인증 코드와 상태 파라미터 추출
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const state = urlParams.get("state");
        // 에러 파라미터 확인
        const errorParam = urlParams.get("error");
        const errorDescription = urlParams.get("error_description");

        if (errorParam) {
          throw new Error(
            `네이버 로그인 오류: ${errorParam} - ${errorDescription || "알 수 없는 오류"}`
          );
        }

        if (!code || !state) {
          throw new Error("인증 코드 또는 상태 파라미터가 없습니다.");
        }

        // 저장된 상태값과 비교하여 CSRF 공격 방지
        const savedState = localStorage.getItem("naverAuthState");

        console.log("state", state);
        console.log("savedState", savedState);

        if (state !== savedState) {
          throw new Error(
            "상태값이 일치하지 않습니다. 보안 위험이 감지되었습니다."
          );
        }

        // 상태값 사용 후 삭제
        localStorage.removeItem("naverAuthState");

        // 1. 액세스 토큰 요청
        const tokenResponse = (await naverApi.getAccessToken(
          code,
          state
        )) as NaverTokenResponse;
        console.log(JSON.stringify(tokenResponse));
        if (!tokenResponse.access_token) {
          throw new Error("액세스 토큰을 가져오는데 실패했습니다.");
        }

        // 2. 사용자 프로필 정보 요청
        const profileResponse = (await naverApi.getUserProfile(
          tokenResponse.access_token
        )) as NaverProfileResponse;

        if (profileResponse.resultcode !== "00" || !profileResponse.response) {
          throw new Error("사용자 정보를 가져오는데 실패했습니다.");
        }

        const userProfile = profileResponse.response;

        // 3. 사용자 정보를 AuthContext에 저장
        login({
          id: userProfile.id,
          name: userProfile.name || userProfile.nickname || "네이버 사용자",
          email: userProfile.email || "",
          avatar_url: userProfile.profile_image,
          provider: "naver",
          provider_id: userProfile.id,
        });

        // 로그인 성공 후 홈페이지로 리다이렉트
        navigate("/", { replace: true });
      } catch (err) {
        console.error("네이버 로그인 콜백 처리 중 오류 발생:", err);
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    hasRun.current = true;
    processNaverCallback();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <h2 className="text-xl font-semibold">네이버 로그인 처리 중...</h2>
          <p className="text-muted-foreground">잠시만 기다려주세요.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 rounded-full bg-destructive/10 p-3 text-destructive inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h2 className="text-xl font-semibold">로그인 오류</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return null;
}
