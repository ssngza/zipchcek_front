import { TermDefinition } from "@/components/TermTooltip";

// 부동산 용어 사전 데이터
const termDefinitions: Record<string, TermDefinition> = {
  // 등기부등본 관련 용어
  등기부등본: {
    term: "등기부등본",
    definition:
      "부동산의 소유권과 권리관계를 공시하는 공적 문서로, 소유자, 저당권, 압류 등의 정보를 확인할 수 있습니다.",
    example:
      "매매계약 전 등기부등본을 확인하여 소유자와 권리관계를 파악합니다.",
    moreInfoUrl: "https://www.iros.go.kr/PMainJ.jsp",
  },
  갑구: {
    term: "갑구",
    definition: "등기부등본에서 소유권에 관한 사항이 기재되는 부분입니다.",
    example: "갑구를 통해 현재 소유자와 소유권 이전 내역을 확인할 수 있습니다.",
  },
  을구: {
    term: "을구",
    definition:
      "등기부등본에서 소유권 이외의 권리관계(저당권, 전세권, 지상권 등)가 기재되는 부분입니다.",
    example: "을구에 근저당권이 설정되어 있는지 확인하는 것이 중요합니다.",
  },
  병구: {
    term: "병구",
    definition:
      "등기부등본에서 압류, 가압류, 가처분 등 권리침해에 관한 사항이 기재되는 부분입니다.",
    example: "병구에 압류나 가압류가 기재되어 있다면 주의가 필요합니다.",
  },

  // 권리관계 용어
  근저당권: {
    term: "근저당권",
    definition:
      "채권자가 채무자의 부동산에 설정하는 담보물권으로, 채무 불이행 시 해당 부동산을 경매에 부쳐 우선적으로 변제받을 수 있는 권리입니다.",
    example: "은행 대출 시 주택에 근저당권을 설정하는 것이 일반적입니다.",
    moreInfoUrl:
      "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1285&ccfNo=1&cciNo=1&cnpClsNo=1",
  },
  전세권: {
    term: "전세권",
    definition:
      "전세계약에서 임차인이 전세금 반환을 보장받기 위해 설정하는 물권으로, 등기를 통해 제3자에게도 대항할 수 있습니다.",
    example:
      "전세계약 시 전세권 설정을 통해 임차인의 전세보증금을 보호할 수 있습니다.",
  },
  가압류: {
    term: "가압류",
    definition:
      "채권자가 채무자의 재산을 임시로 동결시켜 처분을 금지하는 임시 조치입니다.",
    example:
      "채무자의 부동산에 가압류가 설정되면 매매나 담보 설정이 제한될 수 있습니다.",
  },
  가처분: {
    term: "가처분",
    definition:
      "특정 권리에 대한 다툼이 있을 때 현상을 임시로 유지하거나 임시의 지위를 정하는 법원의 결정입니다.",
    example:
      "부동산 소유권에 대한 분쟁이 있을 때 법원이 가처분 결정을 내릴 수 있습니다.",
  },
  지상권: {
    term: "지상권",
    definition:
      "타인의 토지에 건물이나 수목 등 구조물을 소유하기 위해 그 토지를 사용할 수 있는 권리입니다.",
    example:
      "토지 소유자와 건물 소유자가 다른 경우 건물 소유자가 지상권을 설정할 수 있습니다.",
  },

  // 계약 관련 용어
  매매계약: {
    term: "매매계약",
    definition:
      "부동산을 사고파는 계약으로, 매도인은 소유권을 이전할 의무를, 매수인은 대금을 지급할 의무를 집니다.",
    example:
      "부동산 매매계약은 보통 계약금, 중도금, 잔금 순으로 대금을 지급합니다.",
  },
  전세계약: {
    term: "전세계약",
    definition:
      "임대인이 임차인으로부터 전세금을 받고 부동산을 사용·수익하게 하는 계약으로, 계약 종료 시 전세금을 반환해야 합니다.",
    example: "전세계약은 일반적으로 2년 단위로 체결됩니다.",
  },
  월세계약: {
    term: "월세계약",
    definition:
      "임대인이 임차인으로부터 보증금과 월 단위 임대료를 받고 부동산을 사용·수익하게 하는 계약입니다.",
    example:
      "월세계약은 보증금과 월세 금액의 비율에 따라 조건이 달라질 수 있습니다.",
  },
  확정일자: {
    term: "확정일자",
    definition:
      "임대차계약서에 부여되는 공적 증명으로, 임차인의 대항력과 우선변제권 확보에 중요합니다.",
    example:
      "전월세 계약 후 주민센터에서 확정일자를 받으면 권리 보호에 도움이 됩니다.",
    moreInfoUrl:
      "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1285&ccfNo=4&cciNo=1&cnpClsNo=1",
  },

  // 사기 방지 관련 용어
  전세사기: {
    term: "전세사기",
    definition:
      "임대인이 전세금을 가로채기 위해 고의적으로 전세금을 반환하지 않거나, 허위 매물을 통해 전세금을 가로채는 범죄입니다.",
    example: "깡통전세, 허위 매물 등이 대표적인 전세사기 수법입니다.",
  },
  깡통전세: {
    term: "깡통전세",
    definition:
      "부동산 가격보다 근저당권 설정액이 높거나 비슷해 전세보증금을 돌려받기 어려운 상황을 의미합니다.",
    example:
      "5억 주택에 4억 근저당권이 설정된 상태에서 3억 전세계약을 맺으면 위험할 수 있습니다.",
  },
  "선순위 권리자": {
    term: "선순위 권리자",
    definition:
      "부동산에 대한 권리 행사 시 우선적으로 변제받을 수 있는 권리를 가진 사람입니다.",
    example:
      "근저당권자가 전세권자보다 선순위인 경우, 경매 시 근저당권자가 먼저 변제받습니다.",
  },
  대항력: {
    term: "대항력",
    definition:
      "임차인이 제3자에게 자신의 임차권을 주장할 수 있는 법적 효력입니다.",
    example:
      "주택임대차보호법에 따라 입주와 전입신고를 마치면 대항력이 발생합니다.",
  },
  우선변제권: {
    term: "우선변제권",
    definition:
      "임차인이 임차주택이 경매될 경우 다른 채권자보다 우선하여 보증금을 변제받을 수 있는 권리입니다.",
    example:
      "확정일자를 받은 임차인은 경매 시 일정 범위 내에서 우선변제권을 가집니다.",
  },

  // 기타 부동산 용어
  건축물대장: {
    term: "건축물대장",
    definition:
      "건축물의 위치, 면적, 구조, 용도 등 건축물의 현황을 기재한 공부입니다.",
    example:
      "건축물대장을 통해 불법 건축물 여부나 실제 면적을 확인할 수 있습니다.",
    moreInfoUrl: "https://www.gov.kr/portal/service/serviceInfo/PTR000050341",
  },
  토지이용계획확인서: {
    term: "토지이용계획확인서",
    definition:
      "특정 토지에 적용되는 용도지역, 용도지구, 도시계획시설 등의 규제사항을 확인할 수 있는 문서입니다.",
    example:
      "토지이용계획확인서를 통해 해당 부동산의 개발 가능성이나 제한사항을 파악할 수 있습니다.",
    moreInfoUrl: "https://www.eum.go.kr/",
  },
  실거래가: {
    term: "실거래가",
    definition:
      "부동산 거래 시 실제로 거래된 금액으로, 국토교통부에서 실거래가 정보를 제공합니다.",
    example:
      "실거래가 정보를 통해 주변 시세를 파악하고 적정 가격을 판단할 수 있습니다.",
    moreInfoUrl: "https://rt.molit.go.kr/",
  },
  공인중개사: {
    term: "공인중개사",
    definition:
      "국가자격시험에 합격하여 부동산 중개업을 할 수 있는 자격을 가진 사람입니다.",
    example:
      "부동산 거래 시 공인중개사를 통해 계약을 체결하면 안전성을 높일 수 있습니다.",
  },

  // 추가된 부동산 용어
  소유권: {
    term: "소유권",
    definition:
      "물건을 사용, 수익, 처분할 수 있는 권리로 물권 중 가장 기본적인 권리입니다.",
    example:
      "부동산의 소유권은 등기부등본의 갑구에 기재되며, 매매계약을 통해 이전됩니다.",
  },
  임차권: {
    term: "임차권",
    definition:
      "임대차계약에 따라 임차인이 가지는 권리로, 일정 기간 동안 부동산을 사용하고 수익할 수 있는 권리입니다.",
    example:
      "주택임대차보호법에 따라 임차인은 전입신고와 주택 인도로 대항력을 갖게 됩니다.",
  },
  채권자: {
    term: "채권자",
    definition:
      "타인(채무자)에게 일정한 급부를 청구할 수 있는 권리를 가진 사람입니다.",
    example: "대출을 해준 은행은 채권자가 되어 근저당권을 설정할 수 있습니다.",
  },
  채무자: {
    term: "채무자",
    definition:
      "타인(채권자)에게 일정한 급부를 해야 할 의무를 지는 사람입니다.",
    example:
      "대출을 받은 사람은 채무자가 되어 원금과 이자를 상환할 의무가 있습니다.",
  },
  담보: {
    term: "담보",
    definition:
      "채무자가 채무를 이행하지 않을 경우를 대비하여 채권자에게 제공하는 물적 또는 인적 보증입니다.",
    example: "부동산 대출 시 해당 부동산을 담보로 제공하는 것이 일반적입니다.",
  },
  등기권리증: {
    term: "등기권리증",
    definition:
      "2006년 이전에 부동산 등기 완료 후 발급되던 서류로, 소유권 등 권리를 증명하는 문서입니다.",
    example: "등기권리증은 현재 등기필증으로 대체되었습니다.",
  },
  등기필증: {
    term: "등기필증",
    definition:
      "2006년 이후 부동산 등기 완료 후 발급되는 서류로, 등기가 완료되었음을 증명하는 문서입니다.",
    example:
      "소유권 이전 등기 후 등기필증을 보관하여 향후 거래에 대비해야 합니다.",
  },
  경매: {
    term: "경매",
    definition:
      "채무자가 채무를 갚지 못할 경우, 법원이 채무자의 재산을 강제로 매각하여 채권자에게 변제하는 절차입니다.",
    example:
      "근저당권이 설정된 부동산은 채무 불이행 시 경매에 부쳐질 수 있습니다.",
    moreInfoUrl: "https://www.courtauction.go.kr/",
  },
  공시지가: {
    term: "공시지가",
    definition:
      "국토교통부가 매년 1월 1일 기준으로 전국의 토지에 대해 공시하는 단위면적당 가격입니다.",
    example:
      "공시지가는 재산세, 종합부동산세 등 각종 세금 산정의 기준이 됩니다.",
    moreInfoUrl:
      "https://www.realtyprice.kr:447/notice/gsindividual/siteLink.htm",
  },
  공동주택: {
    term: "공동주택",
    definition:
      "건축물의 벽, 복도, 계단 등을 공동으로 사용하는 각 세대가 하나의 건축물 안에서 독립된 주거생활을 할 수 있는 주택을 말합니다.",
    example: "아파트, 연립주택, 다세대주택 등이 공동주택에 해당합니다.",
  },
  분양권: {
    term: "분양권",
    definition:
      "아파트 등 공동주택이 완공되기 전에 주택을 분양받을 수 있는 권리입니다.",
    example:
      "분양권은 계약금, 중도금을 납부한 후 잔금 완납 전까지 보유하게 됩니다.",
  },
  재개발: {
    term: "재개발",
    definition: "노후화된 주거지역을 정비하여 주거환경을 개선하는 사업입니다.",
    example: "재개발 구역으로 지정되면 조합을 설립하여 사업을 추진합니다.",
  },
  재건축: {
    term: "재건축",
    definition:
      "노후화된 공동주택을 철거하고 새로운 주택을 건설하는 사업입니다.",
    example:
      "재건축은 일정한 노후도와 안전진단 등의 조건을 충족해야 가능합니다.",
  },
  청약: {
    term: "청약",
    definition:
      "주택을 공급받기 위해 신청하는 절차로, 일정 자격을 갖춘 사람에게 우선권이 주어집니다.",
    example: "청약통장에 일정 기간 납입한 후 청약 자격을 얻을 수 있습니다.",
    moreInfoUrl: "https://www.applyhome.co.kr/",
  },
  주택임대차보호법: {
    term: "주택임대차보호법",
    definition:
      "주택 임대차 관계에서 경제적 약자인 임차인을 보호하기 위한 법률입니다.",
    example:
      "주택임대차보호법에 따라 임차인은 대항력과 우선변제권을 가질 수 있습니다.",
    moreInfoUrl: "https://www.law.go.kr/법령/주택임대차보호법",
  },
  부동산실명제: {
    term: "부동산실명제",
    definition:
      "부동산에 관한 권리를 실제 권리자의 명의로 등기하도록 의무화한 제도입니다.",
    example:
      "명의신탁 등 실명이 아닌 명의로 등기할 경우 과징금이 부과될 수 있습니다.",
    moreInfoUrl: "https://www.law.go.kr/법령/부동산실권리자명의등기에관한법률",
  },
  LTV: {
    term: "LTV",
    definition:
      "주택담보대출비율(Loan To Value ratio)로, 부동산 가치 대비 대출 가능한 최대 금액의 비율입니다.",
    example: "LTV가 40%라면 5억원 주택에 최대 2억원까지 대출이 가능합니다.",
  },
  DTI: {
    term: "DTI",
    definition:
      "총부채상환비율(Debt To Income ratio)로, 연간 소득 대비 연간 부채 상환액의 비율입니다.",
    example:
      "DTI가 40%라면 연 소득이 1억원인 경우 연간 부채 상환액이 4천만원을 넘지 않아야 합니다.",
  },
  전매제한: {
    term: "전매제한",
    definition:
      "분양받은 주택을 일정 기간 동안 다른 사람에게 팔지 못하도록 하는 제도입니다.",
    example:
      "투기과열지구 내 분양 아파트는 최대 10년까지 전매가 제한될 수 있습니다.",
  },
  양도소득세: {
    term: "양도소득세",
    definition: "부동산 등 자산을 양도하여 발생한 소득에 부과되는 세금입니다.",
    example:
      "1주택자가 2년 이상 보유한 주택을 양도할 경우 비과세 혜택을 받을 수 있습니다.",
    moreInfoUrl:
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711",
  },
};

export default termDefinitions;
