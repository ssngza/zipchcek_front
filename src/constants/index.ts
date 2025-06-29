// 애플리케이션 상수

export const APP_CONFIG = {
  name: "ZipCheck",
  version: "1.0.0",
  description: "전세사기 예방을 위한 안전한 부동산 검증 서비스",
} as const;

export const API_ENDPOINTS = {
  base: import.meta.env.VITE_API_BASE_URL || "/api",
  properties: "/properties",
  users: "/users",
  analysis: "/analysis",
  verification: "/verification",
} as const;

export const RISK_LEVELS = {
  SAFE: { min: 0, max: 30, color: "green", label: "안전" },
  CAUTION: { min: 31, max: 70, color: "yellow", label: "주의" },
  DANGER: { min: 71, max: 100, color: "red", label: "위험" },
} as const;

export const PROPERTY_TYPES = ["아파트", "빌라", "원룸", "오피스텔"] as const;

export const USER_ROLES = {
  USER: "user",
  AGENT: "agent",
  ADMIN: "admin",
} as const;
