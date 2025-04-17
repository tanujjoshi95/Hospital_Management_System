const mockPatients = [
  {
    patientID: "PAT123456",
    firstName: "John",
    lastName: "Doe",
    dob: "1985-06-15",
    gender: "Male",
    contactNumber: "+1-555-123-4567",
    email: "john.doe@example.com",
    address: {
      addressLine1: "123 Maple Street",
      addressLine2: "Apt 4B",
      city: "Springfield",
      state: "IL",
      postalCode: "62701",
      country: "USA",
    },
    emergencyContact: {
      emergencyContactName: "Jane Doe",
      emergencyContactNumber: "+1-555-987-6543",
      relationship: "Spouse",
    },
    medicalInformation: {
      bloodGroup: "O+",
      allergies: ["Penicillin", "Peanuts"],
      chronicDiseases: ["Hypertension"],
      currentMedications: ["Lisinopril 10mg"],
      primaryCarePhysician: "Dr. Emily Carter",
      medicalHistory: "Diagnosed with hypertension in 2018. No surgeries.",
      insuranceNumber: "INS789012",
    },
    appointments: [
      {
        appointmentID: "APP789123",
        date: "2025-05-10",
        doctor: "Dr. Emily Carter",
        status: "Upcoming",
      },
      {
        appointmentID: "APP789124",
        date: "2025-03-20",
        doctor: "Dr. Robert Lee",
        status: "Completed",
      },
    ],
    profilePicture: "https://example.com/images/john_doe.jpg",
    registrationDate: "2023-01-12",
  },
  {
    patientID: "PAT789012",
    firstName: "Sarah",
    lastName: "Williams",
    dob: "1992-11-22",
    gender: "Female",
    contactNumber: "+1-555-456-7890",
    email: "sarah.williams@example.com",
    address: {
      addressLine1: "456 Oak Avenue",
      addressLine2: "",
      city: "Austin",
      state: "TX",
      postalCode: "73301",
      country: "USA",
    },
    emergencyContact: {
      emergencyContactName: "Michael Brown",
      emergencyContactNumber: "+1-555-321-0987",
      relationship: "Brother",
    },
    medicalInformation: {
      bloodGroup: "A-",
      allergies: ["Latex"],
      chronicDiseases: ["Asthma", "Type 2 Diabetes"],
      currentMedications: ["Albuterol inhaler", "Metformin 500mg"],
      primaryCarePhysician: "Dr. Lisa Nguyen",
      medicalHistory:
        "Asthma since childhood, diabetes diagnosed in 2020. Appendectomy in 2015.",
      insuranceNumber: "INS456789",
    },
    appointments: [
      {
        appointmentID: "APP456789",
        date: "2025-06-05",
        doctor: "Dr. Lisa Nguyen",
        status: "Upcoming",
      },
      {
        appointmentID: "APP456790",
        date: "2025-04-01",
        doctor: "Dr. Maria Gomez",
        status: "Cancelled",
      },
    ],
    profilePicture: "https://example.com/images/sarah_williams.jpg",
    registrationDate: "2024-02-25",
  },
];

const getPatients = (delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPatients);
    }, delay);
  });
};

const getPatientById = (id, delay = 800) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const patient = mockPatients.find(
          (patient) => patient.patientID === id
        );

        if (patient) {
          resolve({ success: true, data: patient });
        } else {
          reject({ success: false, error: "Patient not found" });
        }
      } catch (error) {
        console.error("Error fetching patient:", error);
        reject({ success: false, error: "Failed to fetch patient" });
      }
    }, delay); // Simulate network delay
  });
};

const getDefaultPatientData = () => ({
  patientID: "",
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  contactNumber: "",
  email: "",
  address: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "USA",
  },
  emergencyContact: {
    emergencyContactName: "",
    emergencyContactNumber: "",
    relationship: "",
  },
  medicalInformation: {
    bloodGroup: "",
    allergies: [],
    chronicDiseases: [],
    currentMedications: [],
    primaryCarePhysician: "",
    medicalHistory: "",
    insuranceNumber: "",
  },
  appointments: [],
  profilePicture: "https://example.com/images/default-profile.jpg",
  registrationDate: "",
});

const addPatient = (patientData, delay = 500) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Generate unique patient ID
        const patientID =
          "PAT" +
          Date.now().toString() +
          Math.floor(Math.random() * 1000).toString();

        // Get default values and merge with provided data
        const defaultData = getDefaultPatientData();
        const newPatient = {
          ...defaultData,
          ...patientData,
          patientID,
          registrationDate: new Date().toISOString().split("T")[0],
        };

        // Merge nested objects to ensure all fields exist
        newPatient.address = { ...defaultData.address, ...patientData.address };
        newPatient.emergencyContact = {
          ...defaultData.emergencyContact,
          ...patientData.emergencyContact,
        };
        newPatient.medicalInformation = {
          ...defaultData.medicalInformation,
          ...patientData.medicalInformation,
        };

        // Add to mock database
        mockPatients.push(newPatient);

        resolve({ success: true, data: newPatient });
      } catch (error) {
        console.error("Error adding patient:", error);
        reject({ success: false, error: "Failed to add patient" });
      }
    }, delay);
  });
};

export { getPatients, getPatientById, addPatient };
export default mockPatients;
