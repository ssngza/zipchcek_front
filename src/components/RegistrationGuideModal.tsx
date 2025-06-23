import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface RegistrationGuideModalProps {
  children: React.ReactNode;
}

export default function RegistrationGuideModal({
  children,
}: RegistrationGuideModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            등기부등본 발급 가이드
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            등기부등본을 쉽고 빠르게 발급받는 방법을 안내해드립니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 온라인 발급 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                1
              </span>
              온라인 발급 (추천)
            </h3>
            <div className="pl-9 space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">
                  대법원 인터넷등기소
                </h4>
                <p className="text-sm text-blue-800 mb-3">
                  24시간 언제든지 발급 가능하며, 즉시 다운로드할 수 있습니다.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>웹사이트: www.iros.go.kr</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>발급 수수료: 700원</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>결제 방법: 신용카드, 계좌이체</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-gray-800">발급 절차:</h5>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 ml-4">
                  <li>대법원 인터넷등기소 접속</li>
                  <li>등기부등본 → 부동산 → 일반등기부 선택</li>
                  <li>부동산 소재지 입력 (주소 또는 고유번호)</li>
                  <li>발급 수수료 결제</li>
                  <li>PDF 파일 다운로드</li>
                </ol>
              </div>
            </div>
          </div>

          {/* 모바일 앱 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                2
              </span>
              모바일 앱 이용
            </h3>
            <div className="pl-9 space-y-3">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">
                  등기부등본 앱
                </h4>
                <p className="text-sm text-green-800 mb-3">
                  스마트폰으로 간편하게 발급받을 수 있는 공식 앱입니다.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>앱스토어/플레이스토어에서 "등기부등본" 검색</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>간편결제 지원 (삼성페이, 카카오페이 등)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>즉시 공유 및 저장 가능</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 오프라인 발급 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                3
              </span>
              오프라인 발급
            </h3>
            <div className="pl-9 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">
                    등기소 방문
                  </h4>
                  <div className="space-y-1 text-sm text-orange-800">
                    <p>• 평일 09:00~18:00</p>
                    <p>• 발급 수수료: 1,000원</p>
                    <p>• 신분증 지참 필수</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">민원24</h4>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>• www.minwon.go.kr</p>
                    <p>• 공동인증서 필요</p>
                    <p>• 발급 수수료: 700원</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 주의사항 */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-900 mb-2 flex items-center">
              <svg
                className="w-5 h-5 text-amber-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              주의사항
            </h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• 등기부등본은 발급일로부터 3개월간 유효합니다</li>
              <li>• 전세계약 체결 시에는 최신 등기부등본이 필요합니다</li>
              <li>• 위조 방지를 위해 공식 발급처에서만 발급받으세요</li>
              <li>• ZipCheck에서는 PDF 형태의 등기부등본만 분석 가능합니다</li>
            </ul>
          </div>

          {/* 도움말 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              추가 도움이 필요하신가요?
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              등기부등본 발급이나 ZipCheck 이용에 관한 문의사항이 있으시면
              고객지원을 이용해주세요.
            </p>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              고객지원 문의
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
