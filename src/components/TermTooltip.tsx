import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { KeyboardEvent, ReactNode } from "react";

// 용어 설명 인터페이스
export interface TermDefinition {
  term: string;
  definition: string;
  example?: string;
  link?: string;
}

interface TermTooltipProps {
  definition: TermDefinition;
  children?: ReactNode;
  showIcon?: boolean;
}

export default function TermTooltip({
  definition,
  children,
  showIcon = true,
}: TermTooltipProps) {
  // 키보드 이벤트 처리 (Enter 또는 Space 키로 툴팁 열기)
  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // 툴팁은 Shadcn UI에서 자동으로 처리됨
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span
            className="cursor-help border-b border-dotted border-gray-400 inline-flex items-center"
            tabIndex={0}
            role="button"
            aria-label={`${definition.term} 용어 설명 보기`}
            onKeyDown={handleKeyDown}
          >
            {children || definition.term}
            {showIcon && (
              <Info
                className="w-3 h-3 ml-0.5 text-gray-400"
                aria-hidden="true"
              />
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent
          className="max-w-sm p-4 text-left"
          side="bottom"
          sideOffset={5}
          role="tooltip"
          aria-live="polite"
        >
          <div>
            <h4 className="font-bold mb-1">{definition.term}</h4>
            <p className="text-sm mb-2">{definition.definition}</p>
            {definition.example && (
              <div className="mt-2 p-2 bg-gray-100 rounded-sm text-xs">
                <span className="font-medium">예시: </span>
                {definition.example}
              </div>
            )}
            {definition.link && (
              <a
                href={definition.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline mt-2 inline-block"
                aria-label={`${definition.term}에 대해 더 알아보기 (새 탭에서 열림)`}
              >
                더 알아보기
              </a>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
