"use client";
import { FC } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import SignInFormSyntax from "./SignInFormSyntax";
import { SigninSchema } from "@/app/zod_schemas";
import AlertBoxState from "@/app/context/AlertBoxState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SignInFormState from "@/app/auth/context/SignInFormState";

interface SignInFormProps {
  username: string;
  password: string;
}

const SignInForm: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const updateAlertBoxData = AlertBoxState((state) => state.updateAlertBoxData);
  const setIsSignInFormSubmitted = SignInFormState(
    (state) => state.setIsSignInFormSubmitted
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormProps>({
    resolver: zodResolver(SigninSchema),
  });

  const signinUser = async (data: any) => {
    const { username, password } = data;
    try {
      setIsSignInFormSubmitted(true);
      const res = await signIn("credentials", {
        redirect: false,
        username: username.trim(),
        password: password.trim(),
        callbackUrl,
      });

      setIsSignInFormSubmitted(false);
      if (!res?.error) {
        setIsSignInFormSubmitted(false);
        router.push(callbackUrl);
      } else {
        setIsSignInFormSubmitted(false);
        updateAlertBoxData({
          response: "Invalid credentials",
          isResponse: true,
          status: "failure",
          timeout: 3000,
        });
      }
    } catch (error: any) {
      setIsSignInFormSubmitted(false);
    }
  };

  return (
    <SignInFormSyntax
      handleSubmit={handleSubmit}
      signinUser={signinUser}
      register={register}
      errors={errors}
    />
  );
};

export default SignInForm;
