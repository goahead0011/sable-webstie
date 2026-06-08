"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import styles from "@/app/information/information.module.css";

const returnRequirements = [
  "Exchange or return requests must be submitted within 7 days of delivery.",
  "Please contact cs@sable.com before sending any item back. Returns shipped without prior approval may not be accepted.",
  "Returned items must be unworn and include all original tags, packaging materials, components, and proof of purchase.",
  "Exchanges and returns may be refused when tags or packaging have been removed, the item shows signs of wear, the item cannot be resold due to customer use, or the product has been damaged through customer negligence."
];

const shippingDetails = [
  "Orders are shipped on business days, Monday through Friday, via CJ Logistics.",
  "Once an order has been dispatched, a tracking number will be sent by message. Shipment status can be checked through the CJ Logistics app or website.",
  "For same-day delivery or quick service, please contact the offline store before placing your request.",
  "Domestic shipping is free for orders over KRW 100,000. Additional charges may apply for remote or island areas.",
  "Orders over KRW 1,000,000 are shipped free of charge via insured service. If a high-value order is returned due to change of mind, the premium shipping surcharge may be deducted from the refund or charged separately."
];

const terms = [
  {
    title: "Purpose",
    body: "These Terms of Service define the rights, obligations, and responsibilities between sable and users of products and services provided through the online store."
  },
  {
    title: "Service",
    body: "sable provides product information, sales and order processing, shipping services, customer support, and other services determined by sable."
  },
  {
    title: "Membership",
    body: "Users may register as members through the procedure set by sable. Users must provide accurate and up-to-date information, and membership may be restricted if false or misleading information is submitted."
  },
  {
    title: "Orders",
    body: "A purchase contract is formed when the user completes payment and sable accepts the order. sable may cancel an order due to inventory shortage, system error, or other unavoidable circumstances, in which case the full payment amount will be refunded."
  },
  {
    title: "Pricing and Product Information",
    body: "sable makes efforts to provide accurate product descriptions and pricing. Product colors, sizes, and details may vary depending on display settings, and product information may change without notice."
  },
  {
    title: "Intellectual Property",
    body: "All content on the website, including text, graphics, logos, images, and layouts, belongs to sable or the respective rights holders. Users may not reproduce, distribute, modify, or commercially use this content without prior written consent."
  },
  {
    title: "Disclaimer",
    body: "sable is not responsible for service interruptions caused by events beyond reasonable control, including natural disasters, system issues, or carrier delays. sable is not liable for damages caused by the user's own negligence or for external websites linked from the service."
  },
  {
    title: "Governing Law",
    body: "These Terms are governed by the laws of the Republic of Korea. Disputes between sable and users are subject to the jurisdiction of the courts of the Republic of Korea."
  }
];

const collectedInformation = [
  "Full name",
  "Email address",
  "Mobile phone number",
  "Shipping address",
  "Payment information",
  "Order history",
  "IP address",
  "Browser and device information",
  "Website usage and browsing data"
];

const privacyUses = [
  "Processing and fulfilling orders",
  "Payment, refund, exchange, and return handling",
  "Customer support",
  "User identification and membership management",
  "Improving services and user experience",
  "Marketing communications and promotional offers when consent has been provided"
];

const privacyRetention = [
  "Records relating to contracts and order cancellations: 5 years",
  "Records relating to payments and product fulfillment: 5 years",
  "Records relating to customer complaints and dispute resolution: 3 years"
];

const serviceProviders = [
  "CJ Logistics: domestic shipping and delivery",
  "DHL Express: international shipping and delivery",
  "KG Inicis: payment processing",
  "Global-e: international checkout and payment services"
];

const userRights = [
  "Request access to personal information",
  "Request correction of personal information",
  "Request deletion of personal information",
  "Request suspension of processing",
  "Withdraw consent to marketing communications"
];

const safeguards = [
  "Restricted access to personal data",
  "Encryption of important information",
  "Security monitoring and protection",
  "Regular security reviews and updates"
];

const koreanReturnRequirements = [
  "교환 및 반품 요청은 상품 수령일로부터 7일 이내에 접수해야 합니다.",
  "상품을 보내기 전 cs@sable.com으로 먼저 문의해 주세요. 사전 접수 없이 발송된 반품은 처리되지 않을 수 있습니다.",
  "반품 상품은 미착용 상태여야 하며, 택, 포장재, 구성품, 구매 증빙 등 주문 시 포함된 모든 구성품을 보존해야 합니다.",
  "택 또는 포장재가 제거된 경우, 착용 흔적이 있는 경우, 고객 사용으로 재판매가 어려운 경우, 고객 부주의로 상품 가치가 훼손된 경우 교환 및 반품이 제한될 수 있습니다."
];

const koreanShippingDetails = [
  "상품은 월요일부터 금요일까지의 영업일 기준으로 CJ대한통운을 통해 발송됩니다.",
  "주문 상품이 출고되면 배송 추적 번호가 안내되며, CJ대한통운 앱 또는 웹사이트에서 배송 상태를 확인할 수 있습니다.",
  "당일 배송 또는 퀵서비스가 필요한 경우 오프라인 스토어로 먼저 문의해 주세요.",
  "국내 배송은 100,000원 이상 구매 시 무료로 제공됩니다. 일부 도서·산간 지역은 추가 배송비가 부과될 수 있습니다.",
  "1,000,000원 이상 고가 상품은 보험 배송으로 무료 발송됩니다. 단, 고객 변심에 의한 반품의 경우 프리미엄 배송 추가 비용이 환불 금액에서 차감되거나 별도 청구될 수 있습니다."
];

const koreanTerms = [
  {
    title: "목적",
    body: "본 이용약관은 sable 온라인 스토어에서 제공하는 상품 및 서비스 이용과 관련하여 sable과 이용자의 권리, 의무 및 책임사항을 규정하는 것을 목적으로 합니다."
  },
  {
    title: "서비스",
    body: "sable은 상품 정보 제공, 상품 판매 및 주문 처리, 배송 서비스, 고객 지원 및 sable이 정하는 기타 서비스를 제공합니다."
  },
  {
    title: "회원가입",
    body: "이용자는 sable이 정한 절차에 따라 회원가입을 신청할 수 있습니다. 이용자는 정확하고 최신의 정보를 제공해야 하며, 허위 또는 오해의 소지가 있는 정보를 제출한 경우 회원 자격이 제한될 수 있습니다."
  },
  {
    title: "주문",
    body: "이용자가 결제를 완료하고 sable이 주문을 승인하면 구매 계약이 성립됩니다. 재고 부족, 시스템 오류 또는 기타 불가피한 사유가 있는 경우 sable은 주문을 취소할 수 있으며, 이 경우 결제 금액은 전액 환불됩니다."
  },
  {
    title: "가격 및 상품 정보",
    body: "sable은 정확한 상품 설명과 가격 정보를 제공하기 위해 노력합니다. 다만 모니터 및 디스플레이 환경에 따라 색상, 사이즈, 세부 정보가 실제 상품과 다르게 보일 수 있으며, 상품 정보는 사전 고지 없이 변경될 수 있습니다."
  },
  {
    title: "지식재산권",
    body: "웹사이트의 텍스트, 그래픽, 로고, 이미지, 레이아웃을 포함한 모든 콘텐츠는 sable 또는 해당 권리자에게 귀속됩니다. 이용자는 sable의 사전 서면 동의 없이 이를 복제, 배포, 수정하거나 상업적으로 이용할 수 없습니다."
  },
  {
    title: "면책사항",
    body: "sable은 천재지변, 시스템 문제, 배송사 사정 등 합리적으로 통제할 수 없는 사유로 발생한 서비스 중단에 대해 책임을 지지 않습니다. 이용자의 귀책사유로 발생한 손해 또는 외부 링크를 통해 제공되는 웹사이트와 서비스에 대해서도 책임을 지지 않습니다."
  },
  {
    title: "준거법 및 관할",
    body: "본 약관은 대한민국 법률에 따라 해석되며, sable과 이용자 사이에 발생한 분쟁은 대한민국 법원의 관할에 따릅니다."
  }
];

const koreanCollectedInformation = [
  "이름",
  "이메일 주소",
  "휴대전화번호",
  "배송지 주소",
  "결제 정보",
  "주문 내역",
  "IP 주소",
  "브라우저 및 기기 정보",
  "웹사이트 이용 및 탐색 기록"
];

const koreanPrivacyUses = [
  "주문 처리 및 상품 배송",
  "결제, 환불, 교환 및 반품 처리",
  "고객 상담 및 문의 응대",
  "이용자 식별 및 회원 관리",
  "서비스 및 사용자 경험 개선",
  "동의한 경우 마케팅 커뮤니케이션 및 프로모션 제공"
];

const koreanPrivacyRetention = [
  "계약 또는 청약철회 등에 관한 기록: 5년",
  "대금결제 및 재화 등의 공급에 관한 기록: 5년",
  "소비자 불만 또는 분쟁 처리에 관한 기록: 3년"
];

const koreanServiceProviders = [
  "CJ대한통운: 국내 배송",
  "DHL Express: 국제 배송",
  "KG이니시스: 결제 처리",
  "Global-e: 해외 주문 및 결제 서비스"
];

const koreanUserRights = [
  "개인정보 열람 요청",
  "개인정보 정정 요청",
  "개인정보 삭제 요청",
  "개인정보 처리 정지 요청",
  "마케팅 수신 동의 철회"
];

const koreanSafeguards = [
  "개인정보 접근 권한 최소화",
  "중요 정보 암호화",
  "보안 모니터링 및 보호 조치",
  "정기적인 보안 점검 및 업데이트"
];

const sableManifesto = [
  "Before deciding what to wear, what to consume, or who to surround ourselves with, we instinctively categorize and define.",
  "To live in a time where everything is easily labeled and sorted is also to feel the desire to move beyond those predefined boundaries.",
  "Taste is always given a name. This is one style, that is another. Yet our identities do not exist to be explained by someone else's standards or confined within the labels of a particular group.",
  "Sable curates a selection of fashion and lifestyle objects through the lens of individual taste. Rather than following trends or standardized ideals, we seek to highlight the unique sensibilities and perspectives that belong to each person.",
  "You are not a substitute for someone else, nor simply another individual within a category.",
  "You exist as yourself.",
  "Sable believes in the countless nuances that shape personal taste, and explores ways for those nuances to become deeper, clearer, and more distinctly your own."
];

const koreanSableManifesto = [
  "우리는 무엇을 입을지, 무엇을 소비할지, 누구를 만날지 결정하기 전에 먼저 분류하고 판단합니다. 무엇이든 쉽게 정의되고 구분되는 시대에 산다는 것은, 동시에 그 정형화된 기준으로부터 벗어나고자 하는 욕망을 불러일으키기도 합니다.",
  "취향에는 언제나 이름이 붙습니다. 이것은 이런 스타일, 저것은 저런 취향이라고 말입니다. 우리의 정체성은 누군가의 기준이나 집단의 이름으로 설명되기 위해 존재하는 것이 아닙니다.",
  "Sable은 의류를 비롯한 라이프스타일 전반에 걸쳐 취향을 큐레이션합니다. 우리는 유행이나 획일화된 기준이 아닌, 개인이 가진 고유한 취향과 감각이 더욱 선명해질 수 있도록 제안합니다.",
  "당신은 누구의 대체재도, 어떤 범주에 속해 있는 한 명도 아닙니다. 당신은 오직 당신으로 존재합니다. Sable은 개개인이 가진 무수한 취향의 결을 믿으며, 그 결이 더욱 깊고 분명해질 수 있는 방향을 함께 모색합니다."
];

function LanguageDivider() {
  return <div className={styles.languageDivider} aria-hidden="true" />;
}

function SablePanel() {
  return (
    <div className={styles.stack}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>sable</h2>
        {sableManifesto.map((paragraph) => (
          <p key={paragraph} className="utility-copy">
            {paragraph}
          </p>
        ))}
      </section>

      <LanguageDivider />

      <section className={styles.section}>
        {koreanSableManifesto.map((paragraph) => (
          <p key={paragraph} className="utility-copy">
            {paragraph}
          </p>
        ))}
      </section>
    </div>
  );
}

function OfflinePanel() {
  return (
    <div className={styles.stack}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Offline Store</h2>
        <address className={styles.address}>
          32, 49-gil, Yongsan-gu, Seoul, Republic of Korea 04348
          <br />
          <a href="tel:+8220129876">+82 2 012 9876</a>
        </address>
      </section>

      <LanguageDivider />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>오프라인 스토어</h2>
        <address className={styles.address}>
          서울특별시 용산구 49길 32, 04348
          <br />
          <a href="tel:+8220129876">+82 2 012 9876</a>
        </address>
      </section>
    </div>
  );
}

function ReturnsPanel() {
  return (
    <div className={styles.stack}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Returns &amp; Exchanges</h2>
        <p className="utility-copy">
          We provide exchange and return services for eligible purchases. Please review the conditions
          below before sending any item back.
        </p>
        <ul className={styles.list}>
          {returnRequirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3 className={styles.subTitle}>Refunds</h3>
        <p className="utility-copy">
          Refunds are processed after the returned item has been received, inspected, and approved.
          In most cases, refunds are completed within 3-5 business days, though the actual timing may
          vary depending on the card issuer or payment provider.
        </p>
        <h3 className={styles.subTitle}>Incorrect or Defective Items</h3>
        <p className="utility-copy">
          Please inspect your package and order details upon receipt. If an item is missing, incorrect,
          damaged, or defective, contact cs@sable.com with clear photographs showing the issue. We will
          review the request and guide you through the appropriate exchange or refund process.
        </p>
        <h3 className={styles.subTitle}>Shipping</h3>
        <ul className={styles.list}>
          {shippingDetails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <LanguageDivider />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>교환 및 반품</h2>
        <p className="utility-copy">
          sable은 구매 조건에 부합하는 상품에 대해 교환 및 반품 서비스를 제공합니다. 상품을
          보내기 전 아래 조건을 확인해 주세요.
        </p>
        <ul className={styles.list}>
          {koreanReturnRequirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3 className={styles.subTitle}>환불</h3>
        <p className="utility-copy">
          환불은 반품 상품이 도착한 뒤 검수 및 승인 절차를 거쳐 처리됩니다. 일반적으로
          환불은 3-5영업일 이내에 완료되지만, 실제 취소 및 환급 시점은 카드사 또는 결제
          서비스 제공업체의 처리 기간에 따라 달라질 수 있습니다.
        </p>
        <h3 className={styles.subTitle}>오배송 및 불량 상품</h3>
        <p className="utility-copy">
          상품 수령 후 패키지, 구성품, 주문 정보를 확인해 주세요. 상품이 누락되었거나
          오배송, 파손, 불량이 확인되는 경우 문제를 확인할 수 있는 사진과 함께 cs@sable.com으로
          문의해 주세요. 접수된 내용은 검토 후 교환 또는 환불 절차를 안내드립니다.
        </p>
        <h3 className={styles.subTitle}>배송</h3>
        <ul className={styles.list}>
          {koreanShippingDetails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function TermsPanel() {
  return (
    <div className={styles.stack}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Terms of Service</h2>
        <div className={styles.termGrid}>
          {terms.map((term) => (
            <article key={term.title} className={styles.term}>
              <h3 className={styles.subTitle}>{term.title}</h3>
              <p>{term.body}</p>
            </article>
          ))}
        </div>
      </section>

      <LanguageDivider />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>이용약관</h2>
        <div className={styles.termGrid}>
          {koreanTerms.map((term) => (
            <article key={term.title} className={styles.term}>
              <h3 className={styles.subTitle}>{term.title}</h3>
              <p>{term.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function PrivacyPanel() {
  return (
    <div className={styles.stack}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Privacy Policy</h2>
        <p className="utility-copy">
          sable values the privacy of its users and protects personal information in accordance with
          applicable laws and regulations. This policy explains what information is collected, how it is
          used, and the measures taken to protect personal data.
        </p>

        <h3 className={styles.subTitle}>Information We Collect</h3>
        <ul className={styles.list}>
          {collectedInformation.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className={styles.subTitle}>Purpose of Collection and Use</h3>
        <ul className={styles.list}>
          {privacyUses.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className={styles.subTitle}>Retention Period</h3>
        <p className="utility-copy">
          Personal information is retained only for as long as necessary to fulfill the purpose of
          collection and use, unless retention is required by applicable law.
        </p>
        <ul className={styles.list}>
          {privacyRetention.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className={styles.subTitle}>Third-Party Provision and Service Providers</h3>
        <p className="utility-copy">
          sable does not sell or disclose personal information to third parties without the user&apos;s
          consent, except when required by law or necessary to provide services. Service operations may
          be entrusted to the following providers.
        </p>
        <ul className={styles.list}>
          {serviceProviders.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className={styles.subTitle}>Cookies</h3>
        <p className="utility-copy">
          sable may use cookies and similar technologies to operate the website, analyze traffic, and
          improve user experience. Users may refuse or delete cookies through browser settings, though
          some services may be limited as a result.
        </p>

        <h3 className={styles.subTitle}>User Rights</h3>
        <ul className={styles.list}>
          {userRights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className={styles.subTitle}>Protection Measures</h3>
        <ul className={styles.list}>
          {safeguards.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className={styles.subTitle}>Privacy Contact</h3>
        <p className="utility-copy">
          For questions regarding this policy or the handling of personal information, please contact
          <br />
          Privacy Officer: <a href="mailto:privacy@sable.com">privacy@sable.com</a>
        </p>
        <p className="utility-copy">
          This policy may be updated in response to legal, operational, or service changes. Updates will
          be posted on the website and become effective upon publication unless otherwise stated.
        </p>
      </section>

      <LanguageDivider />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>개인정보처리방침</h2>
        <p className="utility-copy">
          sable은 이용자의 개인정보를 중요하게 생각하며 관련 법령에 따라 개인정보를 보호하고
          있습니다. 본 개인정보처리방침은 sable 웹사이트 및 서비스 이용 시 수집되는 정보,
          이용 목적, 보호 조치에 대해 설명합니다.
        </p>

        <h3 className={styles.subTitle}>수집하는 개인정보</h3>
        <ul className={styles.list}>
          {koreanCollectedInformation.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className={styles.subTitle}>수집 및 이용 목적</h3>
        <ul className={styles.list}>
          {koreanPrivacyUses.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className={styles.subTitle}>보유 기간</h3>
        <p className="utility-copy">
          개인정보는 수집 및 이용 목적이 달성된 후 지체 없이 삭제됩니다. 다만 관계 법령에
          따라 보관이 필요한 경우 아래 기간 동안 보관될 수 있습니다.
        </p>
        <ul className={styles.list}>
          {koreanPrivacyRetention.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className={styles.subTitle}>제3자 제공 및 처리 위탁</h3>
        <p className="utility-copy">
          sable은 이용자의 동의 없이 개인정보를 제3자에게 판매하거나 제공하지 않습니다. 단,
          법령에 따라 요구되거나 서비스 제공에 필요한 경우 아래 업체에 개인정보 처리 업무를
          위탁할 수 있습니다.
        </p>
        <ul className={styles.list}>
          {koreanServiceProviders.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className={styles.subTitle}>쿠키</h3>
        <p className="utility-copy">
          sable은 웹사이트 운영, 트래픽 분석, 사용자 경험 개선을 위해 쿠키 및 유사 기술을
          사용할 수 있습니다. 이용자는 브라우저 설정을 통해 쿠키를 거부하거나 삭제할 수
          있으나, 이 경우 일부 서비스 이용에 제한이 발생할 수 있습니다.
        </p>

        <h3 className={styles.subTitle}>이용자의 권리</h3>
        <ul className={styles.list}>
          {koreanUserRights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className={styles.subTitle}>보호 조치</h3>
        <ul className={styles.list}>
          {koreanSafeguards.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className={styles.subTitle}>개인정보 문의</h3>
        <p className="utility-copy">
          본 방침 또는 개인정보 처리와 관련한 문의는 아래 연락처로 접수할 수 있습니다.
          <br />
          개인정보 보호책임자: <a href="mailto:privacy@sable.com">privacy@sable.com</a>
        </p>
        <p className="utility-copy">
          본 방침은 관련 법령, 운영 정책 또는 서비스 변경에 따라 수정될 수 있으며, 변경
          사항은 웹사이트를 통해 공지됩니다.
        </p>
      </section>
    </div>
  );
}

const TABS = [
  { id: "sable", label: "sable", Panel: SablePanel },
  { id: "offline", label: "Offline Store", Panel: OfflinePanel },
  { id: "returns", label: "Returns & Exchanges", Panel: ReturnsPanel },
  { id: "terms", label: "Terms of Service", Panel: TermsPanel },
  { id: "privacy", label: "Privacy Policy", Panel: PrivacyPanel }
] as const;

export default function InformationClient() {
  const [activeId, setActiveId] = useState<(typeof TABS)[number]["id"]>(TABS[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = TABS.find((tab) => tab.id === activeId) ?? TABS[0];
  const ActivePanel = active.Panel;

  // Roving focus for the WAI-ARIA tabs pattern: arrow keys move between tabs.
  function moveFocus(index: number) {
    const next = (index + TABS.length) % TABS.length;
    setActiveId(TABS[next].id);
    tabRefs.current[next]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        moveFocus(index + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        moveFocus(index - 1);
        break;
      case "Home":
        event.preventDefault();
        moveFocus(0);
        break;
      case "End":
        event.preventDefault();
        moveFocus(TABS.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <section className="utility-page">
      <h1 className="utility-title">Information</h1>

      <div className={styles.layout}>
        <div
          role="tablist"
          aria-label="Information sections"
          className={`${styles.nav} ${styles.navInner}`}
        >
          {TABS.map((tab, index) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                onClick={() => setActiveId(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className={styles.content}>
          <div
            key={activeId}
            role="tabpanel"
            id={`panel-${activeId}`}
            aria-labelledby={`tab-${activeId}`}
            className={styles.panel}
          >
            <ActivePanel />
          </div>
        </div>
      </div>
    </section>
  );
}
