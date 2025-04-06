import PropTypes from "prop-types";
import { Outlet, useNavigate } from "react-router-dom";

const LoginLayout = () => {
  const navigate = useNavigate();
  function handleSuccessfullLoginSignup() {
    navigate("/admin/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Hospital Management System
        </h2>
        <Outlet
          context={{
            handleSuccessfullLoginSignup,
          }}
        />
      </div>
    </div>
  );
};

export default LoginLayout;
LoginLayout.propTypes = {
  setPage: PropTypes.func,
};
