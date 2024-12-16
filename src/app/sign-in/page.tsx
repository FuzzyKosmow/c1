"use client";

import BACKGROUND_IMAGE from "@/assets/background.svg";
import GOOGLE_ICON from "@/assets/icons/google.svg";
import { InputField } from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import H1 from "@/components/Typography/H1";
import { signInAPI } from "@/services/api/auth/signin";
import useAuthStore from "@/stores/auth.store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const { setToken } = useAuthStore();

  const router = useRouter();

  const handleSignIn = useCallback(async () => {
    try {
      const { role } = await signInAPI({ username, password });
      if (role === "Admin") {
        router.replace("/admin/dashboard");
        return;
      } else if (role === "User") {
        router.replace("/home");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(error);
      setLoginError("Invalid username or password");
    }
  }, [username, password, setToken, router]);

  const handleSignInWithGoogle = useCallback(async () => {}, []);

  return (
    <div className=" w-screen h-screen">
      <Image
        className=" w-screen h-screen object-cover"
        src={BACKGROUND_IMAGE}
        alt="background"
      />
      <div className=" absolute top-0 left-0 w-2/3 h-screen bg-white grid place-items-center">
        <div className=" w-96 flex flex-col items-center">
          <H1 className=" font-bold">Sign in</H1>
          {loginError && (
            <div className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4 w-full">
              <p className=" text-red-500 text-sm">{loginError}</p>
            </div>
          )}
          <InputField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            title="Username"
            placeholder="username@gmail.com"
            className=" mt-6"
          />
          <InputField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            title="Password"
            type="password"
            className=" mt-5"
          />
          <div className=" mt-3 w-full flex justify-between">
            <p className=" text-sm">
              <span className=" font-semibold text-black-500">
                Don’t have an account?{" "}
              </span>
              <a
                href="/register"
                className=" text-black-300 duration-200 hover:text-black-400"
              >
                Sign up
              </a>
            </p>
            <a
              href={`/forgot-password?email=${username}`}
              className=" text-black-300 duration-200 hover:text-black-400"
            >
              Forgot password
            </a>
          </div>
          <PrimaryButton className=" mt-8" onClick={handleSignIn}>
            Sign in
          </PrimaryButton>
          <div className=" mt-8 w-full flex items-center gap-3">
            <div className=" w-full h-[1px] bg-black-100"></div>
            <p className=" text-black-100 text-sm">Or</p>
            <div className=" w-full h-[1px] bg-black-100"></div>
          </div>
          <PrimaryButton
            className=" mt-8 border-[1px] border-black-500 bg-white text-black-500 hover:bg-slate-200 flex justify-center items-center gap-3"
            onClick={handleSignInWithGoogle}
          >
            <Image src={GOOGLE_ICON} alt="Google icon" />
            <p>Sign in with Google</p>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
