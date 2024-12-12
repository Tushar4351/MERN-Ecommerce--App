import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BsGenderAmbiguous } from "react-icons/bs";
import { FaGoogle } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
} from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import loginImage from "../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "@/components/Shared/PasswordStrengthMeter";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase";
import InputLoader from "@/components/Shared/InputLoader";
import { useSigninMutation, useSingupMutation } from "@/redux/api/userApi";
import { MessageResponse } from "@/types/api-types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  password: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  gender: "",
  dateOfBirth: "",
  password: "",
};

const AuthForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const [signup, { isLoading: isSignupLoading }] = useSingupMutation();
  const [signin, { isLoading: isSigninLoading }] = useSigninMutation();
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData(initialFormData);
    setInvalidFields([]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setInvalidFields((prev) => prev.filter((field) => field !== name));

    if (name === "password") {
      setShowPassword(value.length > 0);
    }
  };

  const validateForm = (isGoogleSignup: boolean = false) => {
    const invalidFieldsList: string[] = [];

    if (isSignUp || isGoogleSignup) {
      if (!formData.name && !isGoogleSignup) invalidFieldsList.push("name");
      if (!formData.gender) invalidFieldsList.push("gender");
      if (!formData.dateOfBirth) invalidFieldsList.push("dateOfBirth");
    }

    if (!isGoogleSignup) {
      if (!formData.email) invalidFieldsList.push("email");
      if (!formData.password) invalidFieldsList.push("password");
    }

    setInvalidFields(invalidFieldsList);
    return invalidFieldsList.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isSignUp) {
      await handleSignUp();
    } else {
      await handleSignIn();
    }
  };

  const handleSignUp = async () => {
    try {
      const userId = uuidv4();
      const response = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        photo: "null",
        gender: formData.gender,
        role: "user",
        dob: formData.dateOfBirth,
        _id: userId,
      }).unwrap();

      toast.success(response.message);
      navigate("/");
      setFormData(initialFormData);
    } catch (error) {
      const err = error as FetchBaseQueryError;
      const message = (err.data as MessageResponse).message;
      toast.error(message || "Sign Up Failed");
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await signin({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      toast.success(response.message);
      navigate("/");
      setFormData(initialFormData);
    } catch (error) {
      const err = error as FetchBaseQueryError;
      const message = (err.data as MessageResponse).message;
      toast.error(message || "Sign In Failed");
    }
  };

  const googleLoginHandler = async () => {
    if (!validateForm(true)) {
      toast.error("Please fill in required fields (Gender and Date of Birth)");
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const response = await signup({
        name: user.displayName!,
        email: user.email!,
        password: user.uid,
        photo: user.photoURL!,
        gender: formData.gender,
        role: "user",
        dob: formData.dateOfBirth,
        _id: user.uid,
      }).unwrap();

      toast.success(response.message);
      navigate("/");
      setFormData(initialFormData);
    } catch (error) {
      const err = error as FetchBaseQueryError;
      const message = (err.data as MessageResponse)?.message;
      toast.error(message || "Google Sign Up Failed");
    }
  };

  const isLoading = isSignUp ? isSignupLoading : isSigninLoading;

  return (
    <div className="flex">
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
          }
          .shake {
            animation: shake 0.5s ease-in-out;
          }
        `}
      </style>
      <div className="flex-1 flex flex-col justify-center px-4 py-10 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto mt-5 w-full max-w-sm lg:w-96">
          <div className="flex justify-between">
            <button className="rounded-full border-2 py-1 px-2 font-semibold">
              <Link to="/">←</Link>
            </button>
            <p className="mt-2 text-sm text-gray-600">
              {isSignUp ? "Already a member? " : "Don't have an account? "}
              <button
                onClick={toggleAuthMode}
                className="font-medium text-green-150 hover:text-green-150/80"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-bold text-gray-900">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isSignUp ? "Create your free account " : "Welcome Back !"}
            </p>
          </div>

          <div className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div className="relative">
                  <HiOutlineUser className="absolute top-3 left-3 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Daniel Ahmadi"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`pl-10 appearance-none block w-full border-b border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm ${
                      invalidFields.includes("name")
                        ? "shake border-red-500"
                        : ""
                    }`}
                  />
                </div>
              )}

              <div className="relative">
                <HiOutlineMail className="absolute top-3 left-3 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Danielahmadi@gmail.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`pl-10 appearance-none block w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm ${
                    invalidFields.includes("email")
                      ? "shake border-red-500"
                      : ""
                  }`}
                />
              </div>

              {isSignUp && (
                <>
                  <div className="relative">
                    <BsGenderAmbiguous className="absolute top-3 left-3 text-gray-400" />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 appearance-none block border py-2 border-gray-300 rounded-md text-gray-500 shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm ${
                        invalidFields.includes("gender")
                          ? "shake border-red-500"
                          : ""
                      }`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="relative">
                    <CiCalendarDate className="absolute top-3 left-3 text-gray-500" />
                    <Input
                      name="dateOfBirth"
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className={`pl-10 appearance-none block w-full border border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none sm:text-sm ${
                        invalidFields.includes("dateOfBirth")
                          ? "shake border-red-500"
                          : ""
                      }`}
                    />
                  </div>
                </>
              )}

              <div className="relative">
                <HiOutlineLockClosed className="absolute top-3 left-3 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`pl-10 appearance-none block w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm ${
                    invalidFields.includes("password")
                      ? "shake border-red-500"
                      : ""
                  }`}
                />
                {isSignUp && showPassword && (
                  <PasswordStrengthMeter password={formData.password} />
                )}
              </div>

              <div className="mt-6 gap-2 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-150 hover:bg-green-150/90"
                >
                  {isLoading ? (
                    <InputLoader />
                  ) : isSignUp ? (
                    "Sign Up"
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="relative flex justify-center text-sm">
                  <span className="mt-2 text-gray-500">Or</span>
                </div>

                <div className="flex space-x-2">
            
                  <Button
                    type="button"
                    onClick={googleLoginHandler}
                    disabled={isLoading}
                    variant="outline"
                    className="inline-flex justify-center items-center w-14 h-14 border border-gray-300 rounded-full shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <FaGoogle className="h-6 w-6 text-red-500" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="h-full object-cover"
          src={loginImage}
          alt="login image"
        />
      </div>
    </div>
  );
};

export default AuthForm;
