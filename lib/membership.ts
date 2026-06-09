import type { AccountOrder, AccountProfile } from "@/lib/account";

export type MembershipTierId = "I" | "II" | "III" | "IV" | "sable";
export type MembershipCouponKind = "welcome" | "birthday";

export type MembershipTier = {
  id: MembershipTierId;
  label: string;
  threshold: number;
  birthdayCouponRate: number;
  pointRate: number;
  regularDiscountRate: number;
  benefits: string[];
};

export type MembershipCoupon = {
  id: string;
  kind: MembershipCouponKind;
  label: string;
  discountRate: number;
  available: boolean;
  reason?: string;
};

export type MembershipOrderLine = {
  price: number;
  quantity: number;
  isSale?: boolean;
};

export type MembershipOrderBreakdown = {
  tier: MembershipTier;
  subtotal: number;
  regularEligibleSubtotal: number;
  regularDiscount: number;
  couponDiscount: number;
  discountTotal: number;
  total: number;
  earnedPoints: number;
  selectedCoupon: MembershipCoupon | null;
  totalPurchasedAfterOrder: number;
  tierAfterOrder: MembershipTier;
};

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "I",
    label: "I",
    threshold: 0,
    birthdayCouponRate: 0.1,
    pointRate: 0.02,
    regularDiscountRate: 0,
    benefits: ["웰컴 쿠폰 10%", "생일 10% 쿠폰", "구매 적립 2%"]
  },
  {
    id: "II",
    label: "II",
    threshold: 2_000_000,
    birthdayCouponRate: 0.1,
    pointRate: 0.03,
    regularDiscountRate: 0.05,
    benefits: ["생일 10% 쿠폰", "구매 적립 3%", "무료 배송", "정가 상품 할인 5%"]
  },
  {
    id: "III",
    label: "III",
    threshold: 5_000_000,
    birthdayCouponRate: 0.2,
    pointRate: 0.05,
    regularDiscountRate: 0.1,
    benefits: ["생일 20% 쿠폰", "구매 적립 5%", "무료 배송", "정가 상품 할인 10%", "콜라보 제품 우선 구매 혜택", "멤버 전용 기획전 초대"]
  },
  {
    id: "IV",
    label: "IV",
    threshold: 10_000_000,
    birthdayCouponRate: 0.25,
    pointRate: 0.05,
    regularDiscountRate: 0.1,
    benefits: [
      "생일 25% 쿠폰",
      "구매 적립 5%",
      "무료 배송",
      "정가 상품 할인 10%",
      "콜라보 제품 우선 구매 혜택",
      "멤버 전용 기획전 초대",
      "트렁크 쇼 우선 초대",
      "스페셜 기프트",
      "CS 우선 응대"
    ]
  },
  {
    id: "sable",
    label: "sable",
    threshold: 15_000_000,
    birthdayCouponRate: 0.3,
    pointRate: 0.07,
    regularDiscountRate: 0.15,
    benefits: [
      "생일 30% 쿠폰",
      "구매 적립 7%",
      "무료 배송",
      "정가 상품 할인 15%",
      "콜라보 제품 우선 구매 혜택",
      "멤버 전용 기획전 초대",
      "세이블 등급 전용 프라이빗 세일 초대",
      "트렁크 쇼 우선 초대",
      "스페셜 기프트",
      "비공개 이벤트 및 브랜드 디너 초대",
      "1:1 스타일링 컨시어지 서비스",
      "CS 우선 응대"
    ]
  }
];

export function formatMembershipRate(rate: number) {
  return `${Math.round(rate * 100)}%`;
}

export function getMembershipTier(totalPurchased: number) {
  return MEMBERSHIP_TIERS.reduce(
    (current, tier) => (totalPurchased >= tier.threshold ? tier : current),
    MEMBERSHIP_TIERS[0]
  );
}

export function getNextMembershipTier(totalPurchased: number) {
  return MEMBERSHIP_TIERS.find((tier) => tier.threshold > totalPurchased) ?? null;
}

function getCouponYear(order: AccountOrder) {
  const year = new Date(order.createdAt).getFullYear();
  return Number.isFinite(year) ? year : 0;
}

function hasUsedCoupon(orders: AccountOrder[], kind: MembershipCouponKind, year?: number) {
  return orders.some((order) => {
    if (order.coupon?.kind !== kind) {
      return false;
    }

    return year ? getCouponYear(order) === year : true;
  });
}

function isBirthdayMonth(birthDate: string, now: Date) {
  if (!birthDate) {
    return false;
  }

  const month = Number(birthDate.slice(5, 7));
  return month >= 1 && month <= 12 && month === now.getMonth() + 1;
}

export function getMembershipCoupons(profile: AccountProfile, orders: AccountOrder[], now = new Date()) {
  const tier = getMembershipTier(profile.totalPurchased);
  const currentYear = now.getFullYear();
  const birthdayAvailable = isBirthdayMonth(profile.birthDate, now) && !hasUsedCoupon(orders, "birthday", currentYear);

  return [
    {
      id: "welcome-10",
      kind: "welcome",
      label: "웰컴 쿠폰 10%",
      discountRate: 0.1,
      available: !hasUsedCoupon(orders, "welcome"),
      reason: hasUsedCoupon(orders, "welcome") ? "이미 사용한 쿠폰입니다." : undefined
    },
    {
      id: `birthday-${tier.id}`,
      kind: "birthday",
      label: `생일 쿠폰 ${formatMembershipRate(tier.birthdayCouponRate)}`,
      discountRate: tier.birthdayCouponRate,
      available: birthdayAvailable,
      reason: !profile.birthDate
        ? "생년월일을 등록하면 생일 월에 사용할 수 있습니다."
        : birthdayAvailable
          ? undefined
          : "생일 월에 연 1회 사용할 수 있습니다."
    }
  ] satisfies MembershipCoupon[];
}

function calculateSubtotal(lines: MembershipOrderLine[]) {
  return lines.reduce((sum, line) => sum + Math.max(0, Math.floor(line.price)) * Math.max(1, line.quantity), 0);
}

export function calculateMembershipOrder(
  profile: AccountProfile,
  orders: AccountOrder[],
  lines: MembershipOrderLine[],
  couponId = ""
): MembershipOrderBreakdown {
  const tier = getMembershipTier(profile.totalPurchased);
  const subtotal = calculateSubtotal(lines);
  const regularEligibleSubtotal = calculateSubtotal(lines.filter((line) => !line.isSale));
  const regularDiscount = Math.floor(regularEligibleSubtotal * tier.regularDiscountRate);
  const coupons = getMembershipCoupons(profile, orders);
  const selectedCoupon = coupons.find((coupon) => coupon.id === couponId && coupon.available) ?? null;
  const couponBase = Math.max(0, subtotal - regularDiscount);
  const couponDiscount = selectedCoupon ? Math.floor(couponBase * selectedCoupon.discountRate) : 0;
  const discountTotal = Math.min(subtotal, regularDiscount + couponDiscount);
  const total = Math.max(0, subtotal - discountTotal);
  const earnedPoints = Math.floor(total * tier.pointRate);
  const totalPurchasedAfterOrder = profile.totalPurchased + total;

  return {
    tier,
    subtotal,
    regularEligibleSubtotal,
    regularDiscount,
    couponDiscount,
    discountTotal,
    total,
    earnedPoints,
    selectedCoupon,
    totalPurchasedAfterOrder,
    tierAfterOrder: getMembershipTier(totalPurchasedAfterOrder)
  };
}
