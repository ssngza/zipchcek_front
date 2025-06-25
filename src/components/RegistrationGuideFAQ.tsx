import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Printer } from "lucide-react";

export default function RegistrationGuideFAQ() {
  // 인쇄 기능
  const handlePrint = () => {
    window.print();
  };

  // FAQ 항목 데이터
  const faqItems = [
    {
      question: "등기부등본은 누구나 발급받을 수 있나요?",
      answer:
        "네, 등기부등본은 누구나 발급받을 수 있습니다. 부동산의 소재지 주소만 알고 있다면 소유자가 아니더라도 발급이 가능합니다.",
    },
    {
      question: "등기부등본 발급에 필요한 서류는 무엇인가요?",
      answer:
        "온라인 발급 시에는 별도의 서류가 필요하지 않으며, 본인 인증(휴대폰, 공동인증서 등)만 있으면 됩니다. 오프라인 발급 시에는 신분증(주민등록증, 운전면허증 등)이 필요합니다.",
    },
    {
      question: "등기부등본 발급 비용은 얼마인가요?",
      answer:
        "온라인(인터넷 등기소)에서 발급 시 1부당 700원, 오프라인(등기소, 주민센터)에서 발급 시 1부당 1,000원입니다.",
    },
    {
      question: "등기부등본은 어디서 발급받을 수 있나요?",
      answer:
        "온라인으로는 대법원 인터넷 등기소(iros.go.kr)에서 발급받을 수 있으며, 오프라인으로는 가까운 등기소나 주민센터(행정복지센터)에서 발급받을 수 있습니다.",
    },
    {
      question: "등기부등본 발급 시 본인 인증은 어떻게 하나요?",
      answer:
        "온라인 발급 시에는 휴대폰 본인인증, 공동인증서(구 공인인증서), 금융인증서 등을 통해 본인 인증이 가능합니다. 오프라인 발급 시에는 신분증을 제시하면 됩니다.",
    },
    {
      question: "등기부등본과 등기사항증명서는 같은 것인가요?",
      answer:
        "네, 같은 것입니다. '등기부등본'은 기존 명칭이고, 현재 공식 명칭은 '등기사항증명서'입니다. 하지만 일반적으로 '등기부등본'이라는 명칭이 더 널리 사용되고 있습니다.",
    },
    {
      question: "등기부등본은 유효기간이 있나요?",
      answer:
        "등기부등본 자체에는 법적인 유효기간이 없습니다. 그러나 부동산 거래 시에는 최신 정보를 확인하기 위해 계약 직전에 발급받는 것이 좋습니다. 일반적으로 금융기관이나 관공서에서는 발급일로부터 3개월 이내의 등기부등본을 요구하는 경우가 많습니다.",
    },
    {
      question: "등기부등본에서 확인할 수 있는 정보는 무엇인가요?",
      answer:
        "등기부등본은 크게 표제부, 갑구, 을구로 구성되어 있습니다. 표제부에는 부동산의 소재지, 면적 등 기본 정보가, 갑구에는 소유권에 관한 사항이, 을구에는 소유권 외의 권리(저당권, 전세권, 임차권 등)에 관한 사항이 기재되어 있습니다.",
    },
    {
      question: "인터넷 등기소에서 발급받은 등기부등본도 법적 효력이 있나요?",
      answer:
        "네, 인터넷 등기소에서 발급받은 등기부등본(등기사항증명서)도 오프라인에서 발급받은 것과 동일한 법적 효력을 가집니다.",
    },
    {
      question: "등기부등본 발급 시 신용카드 결제가 가능한가요?",
      answer:
        "네, 인터넷 등기소에서 온라인 발급 시 신용카드, 계좌이체, 휴대폰 결제 등 다양한 결제 방법을 이용할 수 있습니다. 오프라인 발급 시에도 대부분의 등기소와 주민센터에서 신용카드 결제가 가능합니다.",
    },
    {
      question: "등기부등본을 영어로 발급받을 수 있나요?",
      answer:
        "기본적으로 등기부등본은 한글로만 발급됩니다. 외국에서 사용하기 위해서는 발급받은 등기부등본을 번역한 후, 번역공증을 받아야 합니다.",
    },
    {
      question: "등기부등본 열람과 발급의 차이는 무엇인가요?",
      answer:
        "열람은 등기부등본의 내용을 화면으로 확인만 하는 것으로, 인터넷 등기소에서 일부 정보는 무료로 열람할 수 있습니다. 발급은 공식적인 문서로 출력하거나 PDF 파일로 다운로드하는 것으로, 수수료가 발생합니다.",
    },
  ];

  return (
    <div className="space-y-6 print:p-6">
      {/* 인쇄 버튼 */}
      <div className="flex justify-end print:hidden">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          FAQ 인쇄하기
        </Button>
      </div>

      {/* FAQ 제목 */}
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">자주 묻는 질문</h2>
      </div>

      {/* FAQ 아코디언 */}
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-2 pb-4 text-muted-foreground">
                {item.answer}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* 추가 문의 안내 */}
      <div className="mt-8 p-4 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground">
          더 궁금한 점이 있으시면 대법원 인터넷 등기소 고객센터(☎ 1544-0770)로
          문의하시거나, 가까운 등기소를 방문하여 문의하실 수 있습니다.
        </p>
      </div>
    </div>
  );
}
