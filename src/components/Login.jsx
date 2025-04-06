import "react";
import PropTypes from "prop-types";
import { userAuth } from "../database/server";
import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { Link, useOutletContext } from "react-router-dom";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserID, setUserRole } = useUserContext();

  const { handleSuccessfullLoginSignup } = useOutletContext();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login sucessfull.");
    const result = userAuth(userEmail, password);
    if (result.response) {
      setUserID(result.id);
      setUserRole(result.role);
      handleSuccessfullLoginSignup();
    } else {
      // console.log("Invalid email or password");
      alert("Invalid email or password");
    }
  };
  return (
    <div>
      <div>
        <form className="mt-6">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              onChange={(e) => setUserEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="password"
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
Login.propTypes = {
  switchToSignup: PropTypes.func,
  handleSuccessfullLoginSignup: PropTypes.func,
};
