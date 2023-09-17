import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../contextAPI/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_API_URL);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (res.ok) {
      res.json().then((info) => {
        setUserInfo(info);
        setRedirect(true);
      });
    } else {
      toast.error("Invalid Credentials 😬", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <h1 className="text-3xl font-bold text-center mb-10">Login</h1>
      <form
        action=""
        className="max-w[400px] mx-auto my-0"
        onSubmit={handleLogin}
      >
        <input
          type="text"
          placeholder="username"
          className="block mb-3 focus:ring-blue-500 focus:border-blue-500 w-full px-3 py-3 bg-slate-100 rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="block mb-3 focus:ring-blue-500 focus:border-blue-500 w-full px-3 py-3 bg-slate-100 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full mt-5">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
