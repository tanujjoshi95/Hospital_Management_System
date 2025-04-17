import mockPatients from "../database/mockPatients";
import mockStaff from "../database/mockStaff";

export const getPatientById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id) {
        const patient = mockPatients.find((p) => p.patientID === id);
        if (patient) {
          resolve(patient);
        } else {
          reject(new Error("Patient not found"));
        }
      } else {
        resolve(mockPatients);
      }
    }, 1000);
  });
};

export const getStaffById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id) {
        const staff = mockStaff.find((s) => s.staffID === id);
        if (staff) {
          resolve(staff);
        } else {
          reject(new Error("Staff not found"));
        }
      }
    }, 1000);
  });
};
export const getAppointmentsById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id) {
        const appointments = mockPatients.find((p) => p.appointments === id);
        if (appointments) {
          resolve(appointments);
        } else {
          reject(new Error("Appointments not found"));
        }
      }
    }, 1000);
  });
};
