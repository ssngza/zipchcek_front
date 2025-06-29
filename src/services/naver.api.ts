import axios from "axios";

// 네이버 소셜 로그인 설정
export const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID || "";
export const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI || "";
export const NAVER_CLIENT_SECRET =
  import.meta.env.VITE_NAVER_CLIENT_SECRET || "";

// 네이버 로그인 URL 생성 함수
export const getNaverLoginUrl = () => {
  // 보안을 위한 랜덤 상태값 생성
  const state = Math.random().toString(36).substring(2, 15);
  localStorage.setItem("naverAuthState", state);

  // 네이버 로그인 인증 URL 생성
  const naverAuthUrl = "https://nid.naver.com/oauth2.0/authorize";
  const params = new URLSearchParams({
    response_type: "code",
    client_id: NAVER_CLIENT_ID,
    redirect_uri: NAVER_REDIRECT_URI,
    state,
  });

  return `${naverAuthUrl}?${params.toString()}`;
};

// 네이버 API용 axios 인스턴스
const naverDevelopApi = axios.create({
  baseURL: "/nid/naver",
  headers: {
    "Content-Type": "application/json",
  },
});

const naverOpenApi = axios.create({
  baseURL: "/openapi/naver",
  headers: {
    "Content-Type": "application/json",
  },
});

// 네이버 로그인 관련 API
export const naverApi = {
  // 네이버 액세스 토큰 요청
  getAccessToken: async (code: string, state: string) => {
    // 프록시된 URL 사용 (/oauth2.0/token)
    const response = await naverDevelopApi.get("/oauth2.0/token", {
      params: {
        grant_type: "authorization_code",
        client_id: NAVER_CLIENT_ID,
        client_secret: NAVER_CLIENT_SECRET,
        code,
        state,
      },
    });

    return response.data;
  },

  // 네이버 사용자 정보 요청
  getUserProfile: async (accessToken: string) => {
    // 프록시된 URL 사용 (/v1/nid/me)
    const response = await naverOpenApi.get("/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },

  // 네이버 로그아웃(토큰 삭제)
  deleteAccessToken: async (accessToken: string) => {
    // 프록시된 URL 사용 (/oauth2.0/token)
    const response = await naverDevelopApi.get("/oauth2.0/token", {
      params: {
        grant_type: "delete",
        client_id: NAVER_CLIENT_ID,
        client_secret: NAVER_CLIENT_SECRET,
        access_token: accessToken,
        service_provider: "NAVER",
      },
    });

    return response.data;
  },
};
