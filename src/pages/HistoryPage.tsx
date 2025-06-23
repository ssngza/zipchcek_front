import HistoryCard from "@/components/HistoryCard";
import { Navbar } from "@/components/Navbar";
import { Box, Container, Flex, Heading, Text } from "@/components/ui/base";
import React from "react";

// 임시 데이터
const mockHistoryData = [
  {
    id: "abcd1234efgh5678",
    fileName: "서울시 강남구 역삼동 123-456.pdf",
    analysisDate: "2023-06-15",
    riskScore: 75,
    issueCount: 3,
  },
  {
    id: "ijkl9012mnop3456",
    fileName: "경기도 성남시 분당구 서현동 789-101.pdf",
    analysisDate: "2023-06-10",
    riskScore: 45,
    issueCount: 1,
  },
  {
    id: "qrst7890uvwx1234",
    fileName: "서울시 서초구 반포동 234-567.pdf",
    analysisDate: "2023-06-05",
    riskScore: 15,
    issueCount: 0,
  },
];

const HistoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <Navbar />
      <Container className="py-8">
        <Heading level={1} className="text-3xl font-bold mb-6">
          분석 기록
        </Heading>
        <Text className="text-gray-600 mb-8">
          이전에 분석한 등기부등본 목록입니다. 클릭하여 분석 결과를 다시 확인할
          수 있습니다.
        </Text>

        {/* 필터링 및 검색 영역 (추후 구현) */}
        <Box className="mb-8 p-4 bg-white rounded-lg shadow-sm">
          <Text className="text-sm text-gray-500">
            필터링 및 검색 영역 (개발 예정)
          </Text>
        </Box>

        {/* 분석 기록 목록 영역 */}
        <Box className="bg-white rounded-lg shadow-lg p-6">
          <Flex direction="column" gap={4}>
            {mockHistoryData.length > 0 ? (
              mockHistoryData.map(item => (
                <HistoryCard
                  key={item.id}
                  id={item.id}
                  fileName={item.fileName}
                  analysisDate={item.analysisDate}
                  riskScore={item.riskScore}
                  issueCount={item.issueCount}
                />
              ))
            ) : (
              <Box className="p-8 text-center">
                <Text className="text-gray-500">분석 기록이 없습니다.</Text>
              </Box>
            )}
          </Flex>
        </Box>

        {/* 페이지네이션 영역 (추후 구현) */}
        <Flex justify="center" className="mt-8">
          <Text className="text-sm text-gray-500">
            페이지네이션 (개발 예정)
          </Text>
        </Flex>
      </Container>
    </div>
  );
};

export default HistoryPage;
