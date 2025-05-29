/**
 * 한국어(ko-KR) 사용자에게 보기 좋은 날짜‧시간 문자열을 돌려줍니다.
 *  - “2024-05-28 13:42” 처럼 초(秒)는 제외
 *  - 전달값으로 ISO 문자열, Date 인스턴스, 타임스탬프(밀리초) 모두 허용
 */
export function formatKoreanDateTime(
  dateInput: string | number | Date
): string {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  // ① Intl 로 지역화 포맷을 얻은 뒤
  const raw = date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24시간제
  });

  // ② ko-KR 로케일은 "2024. 05. 28. 13:42" 형태를 주므로
  //    점·공백을 손보기만 하면 끝!
  return raw
    .replaceAll(". ", "-") // "2024-05-28-13:42"
    .replace(/\.$/, "") // 맨 끝 점(.) 제거
    .replace(/-(\d{2}):/, " $1:"); // 날짜·시간 사이 공백 삽입
}

export const formatCount = (() => {
  const formatter = new Intl.NumberFormat("ko-KR");

  return (value: number | bigint | string): string =>
    formatter.format(typeof value === "string" ? Number(value) : value);
})();
