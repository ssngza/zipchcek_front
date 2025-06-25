import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Calendar,
  ChevronRight,
  FileText,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteHistoryDialog from "./DeleteHistoryDialog";

export interface HistoryCardProps {
  id: string;
  fileName: string;
  analysisDate: string;
  riskScore: number;
  issueCount: number;
  onClick?: () => void;
  onDelete: (id: string) => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  id,
  fileName,
  analysisDate,
  riskScore,
  issueCount,
  onClick,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // 기본 동작: 결과 페이지로 이동 (id를 쿼리 파라미터로 전달)
      navigate(`/result?id=${id}`);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트가 발생하지 않도록 함
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
    setIsDeleteDialogOpen(false);
  };

  // 위험도에 따른 색상 및 레이블 설정
  const getRiskBadge = () => {
    if (riskScore >= 70) {
      return { color: "destructive", text: "고위험" };
    } else if (riskScore >= 30) {
      return { color: "secondary", text: "중위험" };
    } else {
      return { color: "outline", text: "저위험" };
    }
  };

  // 날짜 포맷팅 (YYYY-MM-DD 형식 가정)
  const formattedDate = new Date(analysisDate).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { color: riskColor, text: riskText } = getRiskBadge();

  // 위험도에 따른 배지 스타일 클래스
  const getBadgeClass = () => {
    if (riskScore >= 70) {
      return "";
    } else if (riskScore >= 30) {
      return "bg-amber-100 text-amber-800 hover:bg-amber-100";
    } else {
      return "bg-green-100 text-green-800 hover:bg-green-100";
    }
  };

  return (
    <>
      <Card
        className="hover:shadow-md transition-shadow cursor-pointer relative w-full"
        onClick={handleClick}
      >
        {/* 삭제 버튼 */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 z-10"
          onClick={handleDeleteClick}
        >
          <Trash2 size={16} />
        </Button>

        <CardHeader className="pb-2 pt-3">
          <div className="flex justify-between items-start flex-wrap gap-2 sm:flex-nowrap">
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <FileText size={18} className="text-gray-500 flex-shrink-0" />
              <h3 className="font-medium text-sm sm:text-base line-clamp-1 break-all">
                {fileName}
              </h3>
            </div>
            <Badge
              variant={riskColor as "destructive" | "secondary" | "outline"}
              className={`ml-auto flex-shrink-0 whitespace-nowrap ${getBadgeClass()}`}
            >
              {riskText} ({riskScore}점)
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center text-sm mb-2">
            <Calendar size={14} className="mr-1 text-gray-500 flex-shrink-0" />
            <span className="text-gray-600">분석일: {formattedDate}</span>
          </div>
          <div className="flex items-center text-sm">
            <AlertTriangle
              size={14}
              className={`mr-1 flex-shrink-0 ${
                issueCount > 0 ? "text-amber-500" : "text-gray-500"
              }`}
            />
            <span className="text-gray-600">
              {issueCount > 0
                ? `잠재적 이슈 ${issueCount}건 발견`
                : "잠재적 이슈 없음"}
            </span>
          </div>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xs text-gray-500">
              ID: {id.slice(0, 8)}...
            </span>
          </div>
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <ChevronRight size={16} />
          </Button>
        </CardFooter>
      </Card>

      {/* 삭제 확인 다이얼로그 */}
      <DeleteHistoryDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        fileName={fileName}
      />
    </>
  );
};

export default HistoryCard;
