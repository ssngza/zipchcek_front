import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

interface TermDefinition {
  term: string;
  definition: string;
  example?: string;
  link?: string;
}

interface TermDictionaryProps {
  terms: Record<string, TermDefinition>;
  className?: string;
}

export default function TermDictionary({
  terms,
  className = "",
}: TermDictionaryProps) {
  // 검색어 상태
  const [searchQuery, setSearchQuery] = useState("");

  // 선택된 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 용어 요소 참조를 저장할 객체
  const termRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // URL 해시에서 용어 가져오기 및 스크롤 처리
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.slice(1); // '#' 제거

      if (hash) {
        const decodedHash = decodeURIComponent(hash);

        // 해시가 있으면 검색어 설정 및 카테고리 초기화
        setSearchQuery(decodedHash);
        setSelectedCategory(null);

        // 약간의 지연 후 해당 용어로 스크롤 (렌더링 시간 고려)
        setTimeout(() => {
          const termElement = termRefs.current[decodedHash];
          if (termElement) {
            termElement.scrollIntoView({ behavior: "smooth", block: "center" });
            termElement.classList.add("bg-yellow-50");
            setTimeout(() => {
              termElement.classList.remove("bg-yellow-50");
              termElement.classList.add("bg-white");
              setTimeout(() => {
                termElement.classList.remove("bg-white");
              }, 500);
            }, 1500);
          }
        }, 500);
      }
    }
  }, []);

  // 용어 카테고리 추출 함수
  const getCategoryFromTerm = (term: string): string => {
    if (
      term.includes("등기") ||
      term.includes("부등본") ||
      term.includes("갑구") ||
      term.includes("을구")
    ) {
      return "등기부등본";
    } else if (
      term.includes("근저당") ||
      term.includes("저당") ||
      term.includes("담보") ||
      term.includes("채권")
    ) {
      return "권리관계";
    } else if (
      term.includes("전세") ||
      term.includes("월세") ||
      term.includes("임대") ||
      term.includes("계약")
    ) {
      return "계약";
    } else if (term.includes("사기") || term.includes("위험")) {
      return "사기예방";
    }
    return "기타";
  };

  // 카테고리 목록 생성
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    Object.values(terms).forEach(term => {
      // 용어 정의에 카테고리가 있다면 추가
      const category = getCategoryFromTerm(term.term);
      if (category) categorySet.add(category);
    });
    return Array.from(categorySet).sort();
  }, [terms]);

  // 검색 및 필터링된 용어 목록
  const filteredTerms = useMemo(() => {
    return Object.values(terms)
      .filter(term => {
        // 검색어 필터링
        const matchesSearch =
          searchQuery === "" ||
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchQuery.toLowerCase());

        // 카테고리 필터링
        const matchesCategory =
          !selectedCategory ||
          getCategoryFromTerm(term.term) === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [terms, searchQuery, selectedCategory]);

  // 키보드 이벤트 처리 (카테고리 버튼)
  const handleCategoryKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    category: string | null
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedCategory(category);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">부동산 용어 사전</CardTitle>
        <CardDescription>
          등기부등본 및 부동산 관련 용어 설명입니다
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* 검색 입력 */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="search"
            placeholder="용어 검색..."
            className="pl-10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="용어 검색"
          />
        </div>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            onKeyDown={e => handleCategoryKeyDown(e, null)}
            aria-pressed={selectedCategory === null}
            className="text-xs md:text-sm"
          >
            전체
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              onKeyDown={e => handleCategoryKeyDown(e, category)}
              aria-pressed={selectedCategory === category}
              className="text-xs md:text-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* 용어 목록 */}
        {filteredTerms.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4" role="list" aria-label="용어 목록">
            {filteredTerms.map(term => (
              <div
                key={term.term}
                className="border rounded-lg p-4 transition-colors duration-500"
                role="listitem"
                id={term.term}
                ref={el => (termRefs.current[term.term] = el)}
              >
                <h3 className="font-medium text-gray-900 mb-1">{term.term}</h3>
                <p className="text-sm text-gray-600 mb-2">{term.definition}</p>
                {term.example && (
                  <div className="bg-gray-50 p-2 rounded-sm text-xs">
                    <span className="font-medium">예시: </span>
                    {term.example}
                  </div>
                )}
                {term.link && (
                  <a
                    href={term.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline mt-2 inline-block"
                    aria-label={`${term.term}에 대해 더 알아보기 (새 탭에서 열림)`}
                  >
                    더 알아보기
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
