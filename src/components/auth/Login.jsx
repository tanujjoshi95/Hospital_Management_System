import "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { apiLoginUser } from "../../utils/api";

const Login = () => {
  const [email, setEmail] = useState(""); // Changed from userEmail
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { updateUser } = useUserContext();
  const navigate = useNavigate();

  // Check for saved credentials on component mount
  useEffect(() => {
    const savedCredentials = localStorage.getItem("rememberedCredentials");
    if (savedCredentials) {
      const { email, password } = JSON.parse(savedCredentials);
      setEmail(email);
      setPassword(password);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await apiLoginUser(email, password);
      console.log("Login successful. result: ", result);

      // Update user context
      updateUser({
        user: result.userData,
        token: result.token,
      });

      // Redirect based on role
      if (result.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard"); // Changed from handleSuccessfullLoginSignup
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message || "Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <form className="mt-6">
          {error && (
            <div className="p-2 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email" // Changed from text
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
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
