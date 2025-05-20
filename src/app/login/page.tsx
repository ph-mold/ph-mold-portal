import LoginBanner from "../../components/login/LoginBanner";
import LoginForm from "../../components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="h-screen flex relative overflow-hidden">
      <LoginBanner />
      <LoginForm />
    </div>
  );
}
