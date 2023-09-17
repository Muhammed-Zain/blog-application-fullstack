import React, { useEffect, useContext, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contextAPI/UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      credentials: "include",
    }).then((response) =>
      response.json().then((userInfo) => setUserInfo(userInfo))
    );
  }, []);

  const handleLogout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      credentials: "include",
      method: "POST",
      body: userInfo,
    }).then(() => {
      setUserInfo({});
      navigate("/");
    });
  };

  const username = userInfo?.username;
  return (
    <>
      <header>
        <Link to="/" className="logo flex">
          Blog
        </Link>
        <nav className="flex items-center">
          {username && (
            <>
              <Link to={"/create"}>
                <button
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-2"
                >
                  Create a new post
                </button>
              </Link>
              <Link
                to={`/myposts/${userInfo.id}`}
                className="font-medium text-lg text-indigo-400"
              >
                {username}
              </Link>
              <p className="font-bold" onClick={handleLogout}>
                Logout
              </p>
            </>
          )}

          {!username && (
            <>
              <Link to="/login" className="font-medium">
                Login
              </Link>
              <Link to="/register" className="font-medium">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
