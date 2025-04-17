const mockAppointement = [
  {
    appointmentID: "APP456789",
    patientID: "PAT789012", // Assuming this is the patient ID for John Doe
    patientName: "John Doe",
    date: "2025-06-05",
    time: "10:00 AM",
    doctor: "Dr. Lisa Nguyen",
    doctorID: "STF001", // Assuming this is the doctor ID for Dr. Lisa Nguyen
    status: "Upcoming",
    reson: "Fever",
    createdAt: "2025-05-10T14:30:00Z",
  },
];

function getAppointement(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAppointement);
    }, delay);
  });
}

function addAppointement(appointmentData, delay = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Generate a unique ID (simple implementation)
        const id =
          Date.now().toString() + Math.floor(Math.random() * 1000).toString();

        // Create new appointment with ID
        const newAppointment = {
          id,
          ...appointmentData,
          status: "Upcoming", // Default status for new appointmen
          createdAt: new Date().toISOString(),
        };

        // Add to mock database
        mockAppointement.push(newAppointment);

        // Return the ID to simulate API response
        resolve({ id, success: true });
      } catch (error) {
        console.error("Error adding appointment:", error);
        reject({ success: false, error: "Failed to add appointment" });
      }
    }, delay); // Simulate network delay
  });
}

function getAppointementById(id, delay = 500) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        console.log("Received ID:", id);
        const appointment = mockAppointement.find((appt) => appt.id === id);

        if (appointment) {
          resolve({ success: true, data: appointment });
        } else {
          reject({ success: false, error: "Appointment not found" });
        }
      } catch (error) {
        console.error("Error fetching appointment:", error);
        reject({ success: false, error: "Failed to fetch appointment" });
      }
    }, delay); // Simulate network delay
  });
}

export { getAppointement, addAppointement, getAppointementById };
