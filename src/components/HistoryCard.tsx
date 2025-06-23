import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Calendar,
  ChevronRight,
  Clock,
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
  onDelete?: (id: string) => void;
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
      return <Badge variant="destructive">위험 {riskScore}%</Badge>;
    } else if (riskScore >= 30) {
      return (
        <Badge variant="secondary" className="bg-amber-100 text-amber-800">
          주의 {riskScore}%
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          안전 {riskScore}%
        </Badge>
      );
    }
  };

  // 날짜 포맷팅 (YYYY-MM-DD 형식 가정)
  const formattedDate = new Date(analysisDate).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Card
        className="hover:shadow-md transition-shadow cursor-pointer relative"
        onClick={handleClick}
      >
        {/* 삭제 버튼 */}
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 z-10"
            onClick={handleDeleteClick}
          >
            <Trash2 size={16} />
          </Button>
        )}

        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <FileText size={18} className="text-primary" />
              <span className="truncate max-w-[200px]">{fileName}</span>
            </CardTitle>
            {getRiskBadge()}
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar size={14} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
          {issueCount > 0 && (
            <div className="flex items-center text-sm text-amber-600">
              <AlertTriangle size={14} className="mr-1" />
              <span>잠재적 이슈 {issueCount}개 발견</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-0 flex justify-between items-center">
          <div className="flex items-center text-xs text-gray-400">
            <Clock size={12} className="mr-1" />
            <span>분석 ID: {id.slice(0, 8)}</span>
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
