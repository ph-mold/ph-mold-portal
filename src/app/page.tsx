import { Link } from "react-router-dom";
import Header from "../components/common/Header";

export default function Home() {
  return (
    <>
      <Header title="홈" />
      <Link to="/management/products">제품관리 이동</Link>
    </>
  );
}
