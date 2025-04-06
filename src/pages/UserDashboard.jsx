import { UserCircle, Calendar, FileText, Bell } from "lucide-react";

const UserDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Patient Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <Calendar className="w-8 h-8 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Appointments
          </h2>
          <p className="text-gray-600">
            View and manage your upcoming appointments
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <FileText className="w-8 h-8 text-green-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Medical Records
          </h2>
          <p className="text-gray-600">Access your complete medical history</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <Bell className="w-8 h-8 text-purple-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Notifications
          </h2>
          <p className="text-gray-600">Stay updated with important alerts</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <UserCircle className="w-8 h-8 text-orange-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Profile</h2>
          <p className="text-gray-600">Update your personal information</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Recent Activity
        </h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {[
              {
                title: "Upcoming Appointment",
                description: "General Checkup with Dr. Smith",
                date: "Tomorrow at 10:00 AM",
                icon: <Calendar className="w-5 h-5 text-blue-600" />,
              },
              {
                title: "Medical Record Updated",
                description: "New lab results available",
                date: "Yesterday",
                icon: <FileText className="w-5 h-5 text-green-600" />,
              },
              {
                title: "Prescription Renewed",
                description: "Monthly medication renewal processed",
                date: "2 days ago",
                icon: <Bell className="w-5 h-5 text-purple-600" />,
              },
            ].map((item, index) => (
              <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
