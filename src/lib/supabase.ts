import { createClient } from "@supabase/supabase-js";

// Supabase 환경 변수 설정
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 네이버 소셜 로그인 설정
export const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID || "";
export const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI || "";

// 네이버 로그인 URL 생성 함수
export const getNaverLoginUrl = () => {
  const state = Math.random().toString(36).substring(2, 15);
  localStorage.setItem("naverAuthState", state);

  const naverAuthUrl = "https://nid.naver.com/oauth2.0/authorize";
  const params = new URLSearchParams({
    response_type: "code",
    client_id: NAVER_CLIENT_ID,
    redirect_uri: NAVER_REDIRECT_URI,
    state: state,
  });

  return `${naverAuthUrl}?${params.toString()}`;
};

// 네이버 로그인 콜백 처리 함수
export const handleNaverCallback = async (code: string, state: string) => {
  // 상태 검증
  const savedState = localStorage.getItem("naverAuthState");
  if (state !== savedState) {
    throw new Error("Invalid state parameter");
  }

  // Supabase를 통한 네이버 로그인 처리
  try {
    // 실제 구현에서는 Supabase의 signInWithOAuth 메서드를 사용하거나
    // 백엔드 API를 통해 네이버 토큰을 처리해야 합니다.
    // 여기서는 임시 구현으로 대체합니다.
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "naver",
      options: {
        queryParams: {
          code,
          state,
        },
      },
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("네이버 로그인 처리 중 오류 발생:", error);
    throw error;
  }
};
