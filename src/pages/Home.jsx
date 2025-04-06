import { Link } from "react-router-dom";
import { Calendar, ClipboardList, Clock, UserPlus } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[500px]"
        style={{
          backgroundImage: "url('/images/backgroundImage__home.png')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Health Is Our Priority
            </h1>
            <p className="text-xl mb-8 max-w-2xl">
              Experience healthcare that puts you first. Book appointments
              online, access your medical records, and connect with healthcare
              professionals easily.
            </p>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <Calendar className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Online Appointments
              </h3>
              <p className="text-gray-600">
                Book and manage your appointments online with ease
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <ClipboardList className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Medical Records</h3>
              <p className="text-gray-600">
                Access your medical history and test results anytime
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <Clock className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock medical support for emergencies
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <UserPlus className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
              <p className="text-gray-600">
                Connect with experienced healthcare professionals
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
