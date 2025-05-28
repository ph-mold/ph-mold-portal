import { useHeader } from "../../../hooks/useHeader";

export default function SampleRequestPage() {
  useHeader({
    title: "고객 샘플 요청",
    prevLink: "/erp",
  });
  return <>test</>;
}
