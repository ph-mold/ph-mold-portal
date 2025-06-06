import { Button, Input } from "@ph-mold/ph-ui";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  clearLoginEmail,
  getSavedLoginEmail,
  saveLoginEmail,
} from "../../lib/electron/loginPref";
import { ILoginBody } from "../../lib/types/auth";
import { GET_ME, postLogin } from "../../lib/api/auth";
import { saveAccessToken, saveRefreshToken } from "../../lib/electron/authPref";
import { isElectron } from "../../lib/electron/isElectron";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../recoil/authAtom";
import { mutate } from "swr";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname ?? "/";
  const setUser = useSetRecoilState(userState);

  const { register, handleSubmit, setValue } = useForm<ILoginBody>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isSaveEmail, setIsSaveEmail] = useState(false);

  useEffect(() => {
    (async () => {
      const id = await getSavedLoginEmail();
      if (id) {
        setValue("email", id);
        setIsSaveEmail(true);
      }
    })();
  }, []);

  const onSubmit = async (data: ILoginBody) => {
    const { accessToken, refreshToken, user } = await postLogin(data);

    if (accessToken) {
      await saveAccessToken(accessToken);
    }
    if (isElectron && refreshToken) {
      await saveRefreshToken(refreshToken);
    }

    if (isSaveEmail) {
      await saveLoginEmail(data.email);
    } else {
      await clearLoginEmail();
    }

    await mutate(GET_ME, user, false);
    setUser(user);

    navigate(from, { replace: true });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSaveEmail(e.target.checked);
  };

  return (
    <div className="basis-1/2 max-w-[400px] w-full bg-white/70 backdrop-blur-md flex min-h-svh items-center justify-center">
      <div className="flex flex-col gap-4 w-full px-8">
        <p className="text-2xl font-semibold text-center">로그인</p>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <Input label="이메일" {...register("email", { required: true })} />
          <Input
            label="비밀번호"
            type="password"
            {...register("password", { required: true })}
          />
          <label className="flex gap-1 cursor-pointer items-center ml-auto w-fit select-none">
            <input
              type="checkbox"
              checked={isSaveEmail}
              onChange={handleChange}
            />
            <span className="text-xs">이메일 저장</span>
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
