import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { Link, useOutletContext } from "react-router-dom";
import { apiRegisterPatient } from "../../utils/api";

const Signup = () => {
  // Step 1 fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2 fields
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState({
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUserID, setUserRole } = useUserContext();
  const { handleSuccessfullLoginSignup } = useOutletContext();

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill all required fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setCurrentStep(2);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Split full name into first and last name
      const [firstName, ...lastNameParts] = fullName.split(" ");
      const lastName = lastNameParts.join(" ");

      const result = await apiRegisterPatient({
        firstName,
        lastName,
        email,
        password,
        contactNumber,
        gender,
        dob,
        address,
        role: "patient",
      });

      // Store user data
      localStorage.setItem("token", result.token);
      setUserID(result.userId);
      setUserRole(result.role);
      localStorage.setItem("userId", result.userId);
      localStorage.setItem("userRole", result.role);

      handleSuccessfullLoginSignup(result.role);
    } catch (error) {
      console.error("Signup failed:", error);
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className="mt-6">
        {error && (
          <div className="p-2 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {currentStep === 1 ? (
          <>
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
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
                autoComplete="new-password"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <button
              type="button"
              className="w-full px-4 py-2 mt-6 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={handleNextStep}
            >
              Next
            </button>
          </>
        ) : (
          <>
            <div className="mt-4">
              <label className="block text-gray-700">Contact Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                autoComplete="tel"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Gender</label>
              <select
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                autoComplete="bday"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Address Line 1</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your street address"
                value={address.addressLine1}
                onChange={(e) =>
                  setAddress({ ...address, addressLine1: e.target.value })
                }
                autoComplete="address-line1"
              />
            </div>
            {/* Add other address fields similarly */}
            <div className="flex gap-2 mt-6">
              <button
                type="button"
                className="w-1/2 px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setCurrentStep(1)}
              >
                Back
              </button>
              <button
                type="submit"
                className="w-1/2 px-4 py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:bg-green-300"
                onClick={handleSignup}
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </>
        )}
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
