/**
 * 한국어(ko-KR) 사용자에게 보기 좋은 날짜‧시간 문자열을 돌려줍니다.
 *  - "2024-05-28 13:42" 처럼 초(秒)는 제외
 *  - ISO 문자열 형식의 UTC 시간을 파싱
 */
export function formatKoreanDateTime(dateInput: string): string {
  // ISO 문자열을 직접 파싱 (예: "2024-03-28T13:42:00Z")
  const [date, timeWithZ] = dateInput.split("T");
  const time = timeWithZ.split(".")[0]; // 밀리초 부분 제거
  const [hours, minutes] = time.split(":");

  // "2024-03-28 13:42" 형식으로 반환
  return `${date} ${hours}:${minutes}`;
}

export const formatCount = (() => {
  const formatter = new Intl.NumberFormat("ko-KR");

  return (value: number | bigint | string): string =>
    formatter.format(typeof value === "string" ? Number(value) : value);
})();
