import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BsGenderAmbiguous } from "react-icons/bs";
import { SiFacebook } from "react-icons/si";
import { FaGoogle } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
} from "react-icons/hi";
import login from "../assets/login.jpg";
import { Link } from "react-router-dom";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    password: "",
    passwordConfirmation: "",
  });

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    // Reset form data when switching modes
    setFormData({
      name: "",
      email: "",
      gender: "",
      dateOfBirth: "",
      password: "",
      passwordConfirmation: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      await handleSignUp();
    } else {
      await handleSignIn();
    }
  };

  const handleSignUp = async () => {
    // Here you would typically send a request to your backend API
    console.log("Signing up with:", formData);
    // Example API call (uncomment and modify as needed):
    // try {
    //   const response = await fetch('/api/signup', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    //   });
    //   const data = await response.json();
    //   console.log('Signup successful:', data);
    // } catch (error) {
    //   console.error('Signup error:', error);
    // }
  };

  const handleSignIn = async () => {
    // Here you would typically send a request to your backend API
    console.log("Signing in with:", {
      email: formData.email,
      password: formData.password,
    });
    // Example API call (uncomment and modify as needed):
    // try {
    //   const response = await fetch('/api/signin', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       email: formData.email,
    //       password: formData.password,
    //     })
    //   });
    //   const data = await response.json();
    //   console.log('Signin successful:', data);
    // } catch (error) {
    //   console.error('Signin error:', error);
    // }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
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

          <div className="mt-5">
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
                    required={isSignUp}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 appearance-none block w-full border-b border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm"
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
                  className="pl-10 appearance-none block w-full  border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm"
                />
              </div>

              {isSignUp && (
                <>
                  <div className="relative">
                    <BsGenderAmbiguous className="absolute top-3 left-3 text-gray-400" />
                    <select
                      name="gender"
                      value={formData.gender}
                      className="w-full pl-10 appearance-none block border-2 py-2  rounded-md text-sm text-gray-500 outline-none"
                      onChange={handleInputChange}
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
                      className="pl-10 appearance-none block w-full  border border-gray-300 rounded-md shadow-sm text-gray-500 focus:outline-none sm:text-sm"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
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
                  placeholder="••••••"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 appearance-none block w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                />
                {isSignUp && (
                  <div className="mt-1">
                    <p className="text-xs text-gray-500">Least 8 characters</p>
                    <p className="text-xs text-green-500">
                      Least one number (0-9) or a symbol
                    </p>
                    <p className="text-xs text-green-500">
                      Lowercase (a-z) and uppercase (A-Z)
                    </p>
                  </div>
                )}
              </div>

              {isSignUp && (
                <div className="relative">
                  <HiOutlineLockClosed className="absolute top-3 left-3 text-gray-400" />
                  <Input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Re-Type Password"
                    required={isSignUp}
                    value={formData.passwordConfirmation}
                    onChange={handleInputChange}
                    className="pl-10 appearance-none block w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                  />
                </div>
              )}

              <div className="mt-6 gap-2 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  type="submit"
                  className="flex w-1/2 justify-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-150 hover:bg-green-150/90"
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Button>

                <div className="relative flex justify-center text-sm">
                  <span className="mt-2 text-gray-500">Or</span>
                </div>

                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="inline-flex justify-center items-center w-14 h-14 border border-gray-300 rounded-full shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <SiFacebook className="w-6 h-6 text-blue-600" />
                  </Button>
                  <Button
                    type="button"
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
        <img className="h-full" src={login} alt="login image" />
      </div>
    </div>
  );
};

export default AuthForm;
