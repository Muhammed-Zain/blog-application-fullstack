import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) {
      toast.success("Registration Successful! 😁", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Registration Failed! 😔", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
      <h1 className="text-3xl font-bold text-center mb-10">Register</h1>
      <form
        action=""
        className="max-w[400px] mx-auto my-0"
        onSubmit={handleRegister}
      >
        <input
          type="text"
          placeholder="username"
          value={username}
          className="block mb-3 focus:ring-blue-500 focus:border-blue-500 w-full px-3 py-3 bg-slate-100 rounded-lg"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          className="block mb-3 focus:ring-blue-500 focus:border-blue-500 w-full px-3 py-3 bg-slate-100 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-full mt-5">
          Register
        </button>
      </form>
    </>
  );
};
