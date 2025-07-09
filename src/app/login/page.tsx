import LoginBanner from "@/components/features/login/LoginBanner";
import LoginForm from "@/components/features/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="h-screen flex relative overflow-hidden">
      <LoginBanner />
      <LoginForm />
    </div>
  );
}
