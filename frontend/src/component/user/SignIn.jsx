import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
// import dotenv from "dotenv"

// dotenv.config()

const SignIn = () => {
  const navigate = useNavigate();
  const [signInInput, setSignInInput] = useState({
    email: "",
    password: "",
  });
  // useEffect(() => {
  //   handleCallback();
  // }, []);
  const getSignInInputValue = (e) => {
    setSignInInput({ ...signInInput, [e.target.name]: e.target.value });
  };

  const signInHandler = (e) => {
    e.preventDefault();
    console.log(signInInput);
    axios
      .post("http://localhost:8080/signIn", signInInput)
      .then((res) => {
        localStorage.setItem("users", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLoginSuccess = async (response) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/google",
        { token: response.credential },
        { withCredentials: true }
      );
      localStorage.setItem("users", JSON.stringify(res.data));
      navigate("/")
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#" onSubmit={signInHandler}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h5>
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={signInInput.email}
              onChange={getSignInInputValue}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={signInInput.password}
              onChange={getSignInInputValue}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-1"
          >
            Login to your account
          </button>
          <h1 className="text-white text-xl font-medium">Or</h1>

          <div className="w-full">
            

          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
            width="320px"
            size="large"
            useOneTap
            text="Sign in with Google"
            
          />
          </div>
          {/* <button
            type="submit"
            onClick={handleLogin}
            className="w-full text-white text-white bg-gradient-to-r from-red-500 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
          >
            Login with Google
          </button> */}

          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <Link
              href="#"
              to={"/signUp"}
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
