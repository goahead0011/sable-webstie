export function formatPrice(price: number) {
  return `₩ ${price.toLocaleString("ko-KR")}`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(value));
}
