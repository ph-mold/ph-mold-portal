import { Link } from "react-router-dom";
import { useHeader } from "../hooks/useHeader";

export default function Home() {
  useHeader({
    title: "홈",
  });
  return (
    <>
      <Link to="/management/products">제품관리 이동</Link>
    </>
  );
}
