import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpInput, setSignUpInput] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [mailError, setMailError] = useState(false);

  const signUpInputHandler = (e) => {
    setSignUpInput({ ...signUpInput, [e.target.name]: e.target.value });
  };

  const signUpHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/signUp", signUpInput)
      .then((res) => {
        console.log(res);
        navigate("/");
        localStorage.setItem("users", JSON.stringify(res.data));
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          setMailError(true);
        }
      });
  };

  return (
    <>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#" onSubmit={signUpHandler}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Register to our platform
          </h5>
          <div>
            <label
              for="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={signUpInputHandler}
              value={signUpInput.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="John Doe"
              required
            />
          </div>
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
              onChange={signUpInputHandler}
              value={signUpInput.email}
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
              name="password1"
              id="password1"
              onChange={signUpInputHandler}
              value={signUpInput.password1}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
            {signUpInput.password1 !== signUpInput.password2 && (
              <span className="text-red-500 text-sm mt-1">
                Passwords are not matching
              </span>
            )}
          </div>
          <div>
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              onChange={signUpInputHandler}
              value={signUpInput.password2}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
            {signUpInput.password1 !== signUpInput.password2 && (
              <span className="text-red-500 text-sm mt-1">
                Passwords are not matching
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
          >
            Register your account
          </button>
          {mailError && (
            <div
              className="mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span class="font-medium">Warning alert!</span> Use another email
              address, this email is already in use
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default SignUp;
