import { useState, useEffect } from "react";
import { getAllStaff } from "../../data/server";
import { useNavigate } from "react-router-dom";
import { User, Search, Filter } from "lucide-react";

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const staffData = await getAllStaff();
        setStaff(staffData);
        setError(null);
      } catch (err) {
        console.error("Error fetching staff data:", err);
        setError("Failed to load staff directory");
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleStaffClick = (staffId) => {
    navigate(`/admin/staff/${staffId}`);
  };

  // Filter staff based on search term and role filter
  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      `${member.firstName} ${member.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.specializations &&
        member.specializations.some((spec) =>
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        ));

    const matchesFilter = filterRole === "All" || member.role === filterRole;

    return matchesSearch && matchesFilter;
  });

  // Get unique roles for filter dropdown
  const roles = ["All", ...new Set(staff.map((member) => member.role))];

  // Function to determine availability status
  const getAvailabilityStatus = (member) => {
    // In a real app, this would come from the server
    // For demo, we'll use a simple algorithm based on staffID
    const id = parseInt(member.staffID.replace(/\D/g, ""));
    return id % 3 === 0 ? "On Leave" : "Available";
  };

  if (loading) {
    return <div className="p-4 text-center">Loading staff directory...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <User className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Staff Directory
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search staff..."
                  className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  className="pl-10 pr-4 py-2 border rounded-md appearance-none bg-white w-full sm:w-40"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {filteredStaff.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No staff members found matching your criteria
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specialization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStaff.map((member) => {
                    const status = getAvailabilityStatus(member);
                    return (
                      <tr
                        key={member.staffID}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleStaffClick(member.staffID)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={
                                  member.profilePicture || "/default-avatar.png"
                                }
                                alt={`${member.firstName} ${member.lastName}`}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {member.firstName} {member.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {member.staffID}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {member.role}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {member.department}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {member.specializations
                              ? member.specializations.join(", ")
                              : "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              status === "Available"
                                ? "bg-green-100 text-green-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.contactNumber}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffList;
