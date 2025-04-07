import "react";
import { Calendar } from "lucide-react";

const AppointmentsList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Appointments
              </h2>
              <p className="text-gray-600">
                Your Appointments records will be displayed here.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Annual Check-up
                    </h3>
                    <p className="text-sm text-gray-500">January 15, 2025</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    Completed
                  </span>
                </div>
              </div>

              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">Vaccination</h3>
                    <p className="text-sm text-gray-500">December 10, 2024</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Request All Apoointments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsList;
