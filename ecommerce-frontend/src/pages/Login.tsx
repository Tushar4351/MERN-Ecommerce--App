import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const loginHandler = () => {
    console.log("login");
  };
  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className=" min-h-screen w-full flex justify-center items-center">
          <div className="bg-green-200  p-10 rounded-lg">
            <div>
              <span className="text-sm text-gray-900">Welcome back</span>
              <h1 className="text-2xl font-bold">Login to your account</h1>
            </div>
            <div className="mt-5">
              <label className="block text-md mb-2" htmlFor="password">
                Gender
              </label>
              <select
                value={gender}
                className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="my-3">
              <label className="block text-md mb-2" htmlFor="email">
                Date of birth
              </label>
              <input
                className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <p>Already Signed In Once</p>
              <Button onClick={loginHandler} className="w-full">
                <FcGoogle className="w-5 h-5 mr-2" />{" "}
                <span>Sign in with Google</span>
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
