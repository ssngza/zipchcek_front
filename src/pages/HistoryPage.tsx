import { Navbar } from "@/components/Navbar";
import { Box, Container, Flex, Heading, Text } from "@/components/ui/base";
import React from "react";

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

        {/* 분석 기록 목록 영역 (추후 구현) */}
        <Box className="bg-white rounded-lg shadow-lg p-6">
          <Flex direction="column" gap={4}>
            {/* 임시 데이터 */}
            {[1, 2, 3].map(item => (
              <Box
                key={item}
                className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <Text className="font-medium">분석 기록 {item}</Text>
                <Text className="text-sm text-gray-500">
                  2023-06-{item * 5}
                </Text>
              </Box>
            ))}
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
