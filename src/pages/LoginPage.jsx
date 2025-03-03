import "react";
import PropTypes from "prop-types";
import Login from "../components/Login";
import { useState } from "react";
import Signup from "../components/Signup";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  function switchToSignup() {
    setIsLogin(false);
  }
  function switchToLogin() {
    setIsLogin(true);
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Hospital Management System
        </h2>
        {isLogin ? (
          <Login switchToSignup={switchToSignup} />
        ) : (
          <Signup switchToLogin={switchToLogin} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
LoginPage.propTypes = {
  setPage: PropTypes.func,
};
