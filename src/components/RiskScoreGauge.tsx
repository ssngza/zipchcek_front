import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

// ChartJS 등록
ChartJS.register(ArcElement, Tooltip, Legend);

export interface RiskScoreGaugeProps {
  score: number; // 0-100 사이의 위험 점수
  size?: "sm" | "md" | "lg"; // 컴포넌트 크기
  showLabel?: boolean; // 레이블 표시 여부
  className?: string; // 추가 CSS 클래스
}

// 위험 수준 계산 함수
const getRiskLevel = (score: number): "safe" | "warning" | "danger" => {
  if (score < 30) return "safe";
  if (score < 70) return "warning";
  return "danger";
};

// 위험 수준 텍스트 매핑
const riskLevelText = {
  safe: "안전",
  warning: "주의",
  danger: "위험",
};

// 위험 수준별 색상 매핑
const riskLevelColors = {
  safe: {
    primary: "#10B981", // 녹색
    secondary: "#DCFCE7", // 연한 녹색
  },
  warning: {
    primary: "#F59E0B", // 노란색
    secondary: "#FEF3C7", // 연한 노란색
  },
  danger: {
    primary: "#EF4444", // 빨간색
    secondary: "#FEE2E2", // 연한 빨간색
  },
};

export default function RiskScoreGauge({
  score,
  size = "md",
  showLabel = true,
  className = "",
}: RiskScoreGaugeProps) {
  // 점수 범위 확인 및 조정
  const validScore = Math.max(0, Math.min(100, score));

  // 위험 수준 결정
  const riskLevel = getRiskLevel(validScore);
  const colors = riskLevelColors[riskLevel];

  // 반응형 크기를 위한 상태
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    fontSize: 0,
    thickness: 0,
  });

  // 화면 크기에 따른 크기 조정
  useEffect(() => {
    const updateDimensions = () => {
      // 기본 크기 설정
      let baseSize = {
        sm: { width: 100, height: 100, fontSize: 16, thickness: 10 },
        md: { width: 160, height: 160, fontSize: 24, thickness: 15 },
        lg: { width: 220, height: 220, fontSize: 32, thickness: 20 },
      }[size];

      // 모바일 환경에서 크기 조정
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        // 모바일에서는 크기를 약간 줄임
        const scaleFactor = {
          sm: 0.9,
          md: 0.8,
          lg: 0.7,
        }[size];

        baseSize = {
          width: baseSize.width * scaleFactor,
          height: baseSize.height * scaleFactor,
          fontSize: baseSize.fontSize * scaleFactor,
          thickness: baseSize.thickness * scaleFactor,
        };
      }

      setDimensions(baseSize);
    };

    // 초기 크기 설정
    updateDimensions();

    // 화면 크기 변경 시 크기 업데이트
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [size]);

  // 차트 데이터
  const chartData = {
    datasets: [
      {
        data: [validScore, 100 - validScore],
        backgroundColor: [colors.primary, colors.secondary],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        cutout: `${100 - dimensions.thickness}%`,
      },
    ],
  };

  // 차트 옵션
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  // 차트가 준비되지 않았으면 렌더링하지 않음
  if (dimensions.width === 0) return null;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* 게이지 차트 */}
      <div
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height / 2}px`,
          position: "relative",
        }}
      >
        <Doughnut data={chartData} options={chartOptions} />

        {/* 중앙 점수 표시 */}
        <div
          className="absolute flex flex-col items-center justify-center"
          style={{
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: `${dimensions.width}px`,
            textAlign: "center",
          }}
        >
          <div
            className="font-bold"
            style={{
              fontSize: `${dimensions.fontSize}px`,
              color: colors.primary,
            }}
          >
            {validScore}
          </div>
          <div className="text-xs text-gray-500">/ 100</div>
        </div>
      </div>

      {/* 위험 수준 레이블 */}
      {showLabel && (
        <div
          className={`mt-2 px-3 py-1 rounded-full text-white text-xs sm:text-sm font-medium`}
          style={{ backgroundColor: colors.primary }}
        >
          {riskLevelText[riskLevel]}
        </div>
      )}
    </div>
  );
}
