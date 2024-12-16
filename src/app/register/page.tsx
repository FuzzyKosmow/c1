/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useState } from "react";
import { API_URLS } from "../../config/api-urls";
import Image from "next/image";

import useAuthStore from "@/stores/auth.store";
import { redirect, useRouter } from "next/navigation";
import BACKGROUND_IMAGE from "@/assets/background.svg";
interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterForm>({
    fullName: "",
    email: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    try {
      const response = await fetch(`${API_URLS.auth.register}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error[0].code);
      }

      // Res is a token no json
      const result = await response.text();
      console.log("Success:", result);
      useAuthStore.getState().setToken(result);
      useAuthStore.getState().setRole("User");
      router.replace("/home");
    } catch (error) {
      // Error code: DuplicateUserName
      switch (error.message) {
        case "DuplicateUserName":
          setRegisterError("Email already exists");
          break;
        case "PasswordTooShort":
          setRegisterError("Password is too short");
          break;

        default:
          setRegisterError("Failed to register");
          break;
      }
      console.error("Failed to register", error);
    }
  };

  return (
    <div className="flex h-screen bg-cover bg-left-center   rounded-lg shadow-md">
      <div className="w-1/3 flex items-center justify-center rounded-bl-lg shadow-inner">
        <Image
          className=" w-screen h-screen object-cover"
          src={BACKGROUND_IMAGE}
          alt="background"
        />
      </div>

      <div className="w-2/3 flex flex-col justify-center items-center p-8 bg-white rounded-r-lg shadow-md">
        <h2 className="text-4xl font-bold mb-6">Sign up</h2>
        <form onSubmit={handleSubmit} className="w-3/5">
          {registerError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              <p className="text-red-500 text-sm">{registerError}</p>
            </div>
          )}
          <div className="mb-4 text-base ">
            <label
              htmlFor="fullName"
              className=" font-semibold text-lg block mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Nguyen Van A"
              className="w-full p-3 font-normal rounded-lg border border-gray-300"
            />
          </div>
          <div className="mb-4 text-base ">
            <label
              htmlFor="email"
              className=" font-semibold text-lg block mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="username@gmail.com"
              className="w-full p-3 font-normal rounded-lg border border-gray-300"
            />
          </div>
          <div className="mb-4 text-base ">
            <label
              htmlFor="password"
              className=" font-semibold text-lg block mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="******"
              className="w-full p-3 font-normal rounded-lg border border-gray-300"
            />
          </div>
          <div className="text-sm font-medium mb-10">
            <p>
              Have an account?{" "}
              <a
                href="/login"
                className="text-gray-400 text-decoration-line: underline font-bold"
              >
                Sign in
              </a>
            </p>
          </div>
          <button
            type="submit"
            className="w-full p-3 text-2xl text-white bg-black-500 rounded-lg font-medium cursor-pointer mb-4"
          >
            Sign in
          </button>
        </form>

        <div className="w-3/5 mb-10 mt-5 flex items-center justify-center">
          <hr className="w-2/5 border-black"></hr>
          <span className="px-2 text-sm font-normal text-gray-400">Or</span>
          <hr className="w-2/5 border-gray-300" />
        </div>
        <button className="w-3/5 p-3 text-2xl border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer bg-white font-medium">
          <img src="/googleicon.png" alt="Google Icon" className="w-5 mr-2" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
