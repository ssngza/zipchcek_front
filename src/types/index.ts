// 공통 타입 정의

export interface Property {
  id: string;
  address: string;
  type: "아파트" | "빌라" | "원룸" | "오피스텔";
  area: number;
  price: number;
  deposit: number;
  monthlyRent?: number;
  ownerId: string;
  registrationDate: string;
}

export interface PropertyOwner {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  verificationStatus: "verified" | "pending" | "failed";
}

export interface RiskAnalysis {
  propertyId: string;
  riskScore: number; // 0-100 (낮을수록 안전)
  riskFactors: string[];
  recommendation: "safe" | "caution" | "danger";
  analysisDate: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  role: "user" | "agent" | "admin";
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
