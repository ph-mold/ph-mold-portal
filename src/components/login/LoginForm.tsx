import { Button, Input } from "@ph-mold/ph-ui";
import { useEffect, useState } from "react";
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
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("이메일 형식이 올바르지 않습니다.")
    .required("이메일을 입력해주세요."),
  password: Yup.string().required("비밀번호를 입력해주세요."),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname ?? "/";
  const setUser = useSetRecoilState(userState);

  const [isSaveEmail, setIsSaveEmail] = useState(false);
  const [initFormValues, setInitFormValues] = useState<ILoginBody>({
    email: "",
    password: "",
  });

  useEffect(() => {
    (async () => {
      const savedEmail = await getSavedLoginEmail();
      if (savedEmail) {
        setInitFormValues({
          email: savedEmail,
          password: "",
        });
        setIsSaveEmail(true);
      }
    })();
  }, []);

  const onSubmit = async (
    values: ILoginBody,
    { setSubmitting }: FormikHelpers<ILoginBody>
  ) => {
    try {
      setSubmitting(true);
      const { accessToken, refreshToken, user } = await postLogin(values);

      if (accessToken) {
        await saveAccessToken(accessToken);
      }
      if (isElectron && refreshToken) {
        await saveRefreshToken(refreshToken);
      }

      if (isSaveEmail) {
        await saveLoginEmail(values.email);
      } else {
        await clearLoginEmail();
      }

      await mutate(GET_ME, user, false);
      setUser(user);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleIsSaveEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSaveEmail(e.target.checked);
  };

  return (
    <div className="basis-1/2 absolute sm:!relative sm:max-w-[400px] w-full bg-white/40 sm:!bg-white/70 backdrop-blur-sm flex min-h-svh items-center justify-center">
      <div className="flex flex-col gap-4 w-full px-8 max-w-[400px]">
        <p className="text-2xl font-semibold text-center">로그인</p>
        <Formik<ILoginBody>
          initialValues={initFormValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={true}
          validateOnBlur={true}
          enableReinitialize={true}
        >
          {({
            values,
            handleChange,
            handleBlur,
            isSubmitting,
            setTouched,
            submitForm,
            errors,
            touched,
          }) => (
            <form className="space-y-2">
              <Input
                label="이메일"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(errors.email && touched.email)}
                helperText={
                  errors.email && touched.email ? errors.email : undefined
                }
              />
              <Input
                label="비밀번호"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(errors.password && touched.password)}
                helperText={
                  errors.password && touched.password
                    ? errors.password
                    : undefined
                }
              />
              <label className="flex gap-1 cursor-pointer items-center ml-auto w-fit select-none">
                <input
                  type="checkbox"
                  checked={isSaveEmail}
                  onChange={handleIsSaveEmailChange}
                />
                <span className="text-xs">이메일 저장</span>
              </label>
              <Button
                type="button"
                fullWidth
                loading={isSubmitting}
                onClick={() => {
                  setTouched({
                    email: true,
                    password: true,
                  });
                  submitForm();
                }}
              >
                로그인
              </Button>
            </form>
          )}
        </Formik>
        <Button variant="text" className="text-xs !w-fit mx-auto">
          비밀번호를 잊어버리셨나요?
        </Button>
      </div>
    </div>
  );
}
