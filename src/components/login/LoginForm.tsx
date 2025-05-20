import { Button, Input } from "@ph-mold/ph-ui";
import { useForm } from "react-hook-form";

interface LoginForm {
  id: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    console.log("Submitted login data", data);
    // TODO: API 연동 처리
  };

  return (
    <div className="basis-1/2 max-w-[400px] w-full bg-white/70 backdrop-blur-md flex min-h-svh items-center justify-center">
      <div className="flex flex-col gap-4 w-full px-8">
        <p className="text-2xl font-semibold text-center">로그인</p>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <Input label="아이디" {...register("id", { required: true })} />
          <Input
            label="비밀번호"
            type="password"
            {...register("password", { required: true })}
          />
          <label className="flex gap-1 cursor-pointer items-center ml-auto w-fit select-none">
            <input type="checkbox" />
            <span className="text-xs">아이디 저장</span>
          </label>
          <Button type="submit" fullWidth>
            로그인
          </Button>
        </form>
        <Button variant="text" className="text-xs !w-fit mx-auto">
          비밀번호를 잊어버리셨나요?
        </Button>
      </div>
    </div>
  );
}
