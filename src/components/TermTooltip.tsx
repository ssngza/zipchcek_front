import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import {
  KeyboardEvent,
  ReactNode,
  TouchEvent,
  useCallback,
  useState,
} from "react";
import { Link } from "react-router-dom";

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
  showDictionaryLink?: boolean; // 용어 사전 링크 표시 여부
  dictionaryLinkId?: string; // 용어 사전에서 해당 용어의 ID나 앵커
}

export default function TermTooltip({
  definition,
  children,
  showIcon = true,
  showDictionaryLink = true,
  dictionaryLinkId,
}: TermTooltipProps) {
  // 모바일 터치 이벤트를 위한 상태
  const [isMobileTooltipOpen, setIsMobileTooltipOpen] = useState(false);

  // 모바일 환경 감지 함수
  const isMobileDevice = useCallback(() => {
    return (
      typeof window !== "undefined" &&
      (navigator.maxTouchPoints > 0 ||
        /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent))
    );
  }, []);

  // 키보드 이벤트 처리 (Enter 또는 Space 키로 툴팁 열기)
  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // 툴팁은 Shadcn UI에서 자동으로 처리됨

      // 모바일 환경에서는 상태 토글
      if (isMobileDevice()) {
        setIsMobileTooltipOpen(prev => !prev);
      }
    }
  };

  // 터치 이벤트 처리
  const handleTouch = (e: TouchEvent<HTMLSpanElement>) => {
    // 기본 이벤트 방지 (링크 클릭 등)
    e.preventDefault();

    // 모바일 환경에서 툴팁 토글
    if (isMobileDevice()) {
      setIsMobileTooltipOpen(prev => !prev);
    }
  };

  // 용어 사전 링크 생성
  const getDictionaryLink = () => {
    // 특정 용어로 바로 이동하기 위한 해시 추가
    const hash = dictionaryLinkId || definition.term;
    return `/dictionary#${encodeURIComponent(hash)}`;
  };

  // 모바일 환경에서 직접 툴팁 내용 표시
  if (isMobileDevice() && isMobileTooltipOpen) {
    return (
      <div className="relative inline-block">
        <span
          className="cursor-help border-b border-dotted border-gray-400 inline-flex items-center"
          tabIndex={0}
          role="button"
          aria-label={`${definition.term} 용어 설명 보기`}
          onKeyDown={handleKeyDown}
          onTouchEnd={handleTouch}
        >
          {children || definition.term}
          {showIcon && (
            <Info className="w-3 h-3 ml-0.5 text-gray-400" aria-hidden="true" />
          )}
        </span>

        <div
          className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-white shadow-lg rounded-md p-4 max-w-sm text-left"
          role="tooltip"
          aria-live="polite"
        >
          <button
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
            onClick={() => setIsMobileTooltipOpen(false)}
            aria-label="닫기"
          >
            ✕
          </button>
          <div>
            <h4 className="font-bold mb-1">{definition.term}</h4>
            <p className="text-sm mb-2">{definition.definition}</p>
            {definition.example && (
              <div className="mt-2 p-2 bg-gray-100 rounded-sm text-xs">
                <span className="font-medium">예시: </span>
                {definition.example}
              </div>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {definition.link && (
                <a
                  href={definition.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline inline-block"
                  aria-label={`${definition.term}에 대해 더 알아보기 (새 탭에서 열림)`}
                >
                  더 알아보기
                </a>
              )}
              {showDictionaryLink && (
                <Link
                  to={getDictionaryLink()}
                  className="text-xs text-blue-600 hover:underline inline-block"
                  aria-label={`${definition.term} 용어 사전에서 보기`}
                >
                  용어 사전에서 보기
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 데스크톱 환경에서 Shadcn UI Tooltip 사용
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
            onTouchEnd={handleTouch}
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
            <div className="mt-2 flex flex-wrap gap-2">
              {definition.link && (
                <a
                  href={definition.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline inline-block"
                  aria-label={`${definition.term}에 대해 더 알아보기 (새 탭에서 열림)`}
                >
                  더 알아보기
                </a>
              )}
              {showDictionaryLink && (
                <Link
                  to={getDictionaryLink()}
                  className="text-xs text-blue-600 hover:underline inline-block"
                  aria-label={`${definition.term} 용어 사전에서 보기`}
                >
                  용어 사전에서 보기
                </Link>
              )}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
