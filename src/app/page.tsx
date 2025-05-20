import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import { Button } from "@ph-mold/ph-ui";

export default function Home() {
  return (
    <>
      <Header
        title="홈"
        components={
          <Link to="/login">
            <Button size="small" variant="text">
              로그인
            </Button>
          </Link>
        }
      />
      <Link to="/management/products">제품관리 이동</Link>
    </>
  );
}
