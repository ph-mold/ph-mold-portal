import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div>홈</div>
      <Link to="/management/products">제품관리 이동</Link>
    </>
  );
}
