import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function RegistrationGuideFAQ() {
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
      question: "인터넷 등기소에서 발급받은 등기부등본도 법적 효력이 있나요?",
      answer:
        "네, 인터넷 등기소에서 발급받은 등기부등본도 오프라인에서 발급받은 것과 동일한 법적 효력을 가집니다.",
    },
    {
      question: "등기부등본 발급 후 유효기간이 있나요?",
      answer:
        "등기부등본 자체에는 별도의 유효기간이 없습니다. 그러나 부동산 거래 시에는 최신 정보를 확인하기 위해 계약 직전에 발급받는 것이 좋습니다.",
    },
    {
      question: "등기부등본과 등기사항증명서는 같은 것인가요?",
      answer:
        "네, 같은 것입니다. 과거에는 '등기부등본'이라고 불렸으나, 현재는 공식적으로 '등기사항증명서'라고 부릅니다. 일반적으로 두 용어는 혼용되어 사용됩니다.",
    },
    {
      question: "등기부등본에서 확인할 수 있는 정보는 무엇인가요?",
      answer:
        "등기부등본에서는 부동산의 표시(소재지, 면적 등), 소유권에 관한 사항(소유자 정보, 소유권 변동 내역), 담보권에 관한 사항(저당권, 전세권 등), 기타 권리제한에 관한 사항(가압류, 가처분 등)을 확인할 수 있습니다.",
    },
    {
      question: "모바일로도 등기부등본을 발급받을 수 있나요?",
      answer:
        "네, 모바일 기기에서도 인터넷 등기소 웹사이트를 통해 등기부등본을 발급받을 수 있습니다. 별도의 앱 설치 없이 모바일 웹 브라우저로 접속하여 발급 가능합니다.",
    },
    {
      question: "등기부등본 발급 시 신용카드 결제가 가능한가요?",
      answer:
        "네, 인터넷 등기소에서 등기부등본 발급 시 신용카드, 계좌이체, 휴대폰 결제 등 다양한 결제 방법을 이용할 수 있습니다.",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">자주 묻는 질문 (FAQ)</h2>

      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
