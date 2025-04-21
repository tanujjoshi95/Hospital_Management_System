import Users from "../data/users.json";

/**
 * Authenticates a user based on username and password
 * @param {string} username - The username to authenticate
 * @param {string} password - The password to authenticate
 * @returns {Promise} - A promise that resolves to user data or rejects with an error
 */
export const authenticateUser = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Find the user in the mock data
      const user = Users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        // Return user data without the password
        // eslint-disable-next-line no-unused-vars
        const { password, ...userData } = user;

        resolve({
          success: true,
          userId: userData.id,
          role: userData.role,
          userData,
        });
      } else {
        reject({
          success: false,
          message: "Invalid username or password",
        });
      }
    }, 800); // Simulate network delay
  });
};

/**
 * Registers a new patient user
 * @param {Object} patientData - The patient registration data
 * @param {string} patientData.username - Username for login
 * @param {string} patientData.password - Password for login
 * @param {string} patientData.firstName - Patient's first name
 * @param {string} patientData.lastName - Patient's last name
 * @param {string} patientData.email - Patient's email
 * @param {string} patientData.dob - Patient's date of birth
 * @param {string} patientData.gender - Patient's gender
 * @param {string} patientData.contactNumber - Patient's contact number
 * @returns {Promise} - A promise that resolves to the new user data or rejects with an error
 */
export const registerPatient = (patientData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if username already exists
      const userExists = Users.some(
        (user) => user.username === patientData.username
      );

      if (userExists) {
        reject({
          success: false,
          message: "Username already exists",
        });
        return;
      }

      // Generate a unique patient ID (PAT + 6 random digits)
      const generatePatientID = () => {
        const randomDigits = Math.floor(100000 + Math.random() * 900000);
        return `PAT${randomDigits}`;
      };

      const patientID = generatePatientID();

      // Create new user entry for authentication
      const newUser = {
        username: patientData.username,
        password: patientData.password,
        id: patientID,
        role: "patient",
      };

      // Create new patient entry with complete profile
      const newPatient = {
        patientID,
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        dob: patientData.dob,
        gender: patientData.gender,
        contactNumber: patientData.contactNumber,
        email: patientData.email,
        address: patientData.address || {
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        },
        medicalInformation: {
          bloodGroup: patientData.bloodGroup || "",
          allergies: patientData.allergies || "None",
          primaryCarePhysician: "",
        },
        emergencyContact: {
          emergencyContactName: patientData.emergencyContactName || "",
          emergencyContactNumber: patientData.emergencyContactNumber || "",
          relationship: patientData.relationship || "",
        },
        registrationDate: new Date().toISOString().split("T")[0],
        appointments: [],
      };

      // In a real app, we would save to database
      // For mock, we'll just return the data as if it was saved

      resolve({
        success: true,
        message: "Patient registered successfully",
        userId: patientID,
        role: "patient",
        userData: { ...newUser, password: undefined },
        patientData: newPatient,
      });
    }, 1000);
  });
};

// Functions For API Calls

// Login User API Call
export const apiLoginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return {
      userId: data.data.user.id, // Changed from data.user.id
      role: data.data.user.role,
      userData: data.data.user,
      token: data.token,
    };
  } catch (error) {
    throw new Error(error.message || "Invalid email or password");
  }
};

// Register Patient API Call
export const apiRegisterPatient = async (patientData) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return {
      userId: data.id, // Changed from data.user.id
      role: data.role,
      userData: data,
      token: data.token,
    };
  } catch (error) {
    throw new Error(error.message || "Registration failed");
  }
};

// Get All Appointments API Call
export const apiGetAllAppointments = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/appointments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch appointments");
    }

    return data;
  } catch (error) {
    console.error("Appointments API Error:", error);
    throw error;
  }
};
