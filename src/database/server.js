import Users from "./users.json";
export function userAuth(username, password) {
  const user = Users.find(
    (data) => data.username === username && data.password === password
  );
  if (!user) {
    return { response: false, message: "Invalid Login" };
  }
  return { response: true, id: user.id, role: user.role };
}

export const UserProfile = {
  patient: {
    profile: {
      fullName: "Jane Doe",
      patientId: "P123456",
      dateOfBirth: "1985-06-15",
      contact: {
        phone: "(555) 123-4567",
        email: "jane.doe@example.com",
      },
      emergencyContact: {
        name: "John Doe",
        phone: "(555) 987-6543",
      },
      profilePhoto: "https://example.com/images/jane_doe_profile.jpg",
    },
    healthSummary: {
      primaryDoctor: {
        name: "Dr. Emily Carter",
        specialty: "General Practitioner",
        profileLink: "https://hospital.com/doctors/emily-carter",
      },
      lastVisit: {
        date: "2025-02-10",
        summaryLink: "https://hospital.com/records/visit/P123456-021025",
      },
      upcomingAppointment: {
        date: "2025-03-25",
        time: "10:30 AM",
        doctor: "Dr. Emily Carter",
        detailsLink: "https://hospital.com/appointments/P123456-032525",
      },
      quickStats: {
        bloodType: "A+",
        allergies: ["Penicillin", "Peanuts"],
        currentMedications: [
          {
            name: "Lisinopril",
            dosage: "10mg",
            frequency: "Daily",
          },
          {
            name: "Metformin",
            dosage: "500mg",
            frequency: "Twice Daily",
          },
        ],
      },
    },
    medicalHistory: [
      {
        year: "2024",
        visits: [
          {
            date: "2024-11-05",
            type: "Checkup",
            doctor: "Dr. Emily Carter",
            summary: "Routine checkup, blood pressure monitored.",
            reportLink: "https://hospital.com/records/P123456-110524",
          },
          {
            date: "2024-06-20",
            type: "Consultation",
            doctor: "Dr. Mark Lee",
            summary: "Diabetes management review.",
            reportLink: "https://hospital.com/records/P123456-062024",
          },
        ],
      },
      {
        year: "2023",
        visits: [
          {
            date: "2023-09-12",
            type: "Emergency",
            doctor: "Dr. Sarah Patel",
            summary: "Treated for allergic reaction.",
            reportLink: "https://hospital.com/records/P123456-091223",
          },
        ],
      },
    ],
    appointments: {
      upcoming: [
        {
          date: "2025-03-25",
          time: "10:30 AM",
          doctor: "Dr. Emily Carter",
          type: "Telehealth",
          status: "Confirmed",
        },
      ],
      past: [
        {
          date: "2025-02-10",
          doctor: "Dr. Emily Carter",
          notes: "Routine visit, all stable.",
          detailsLink: "https://hospital.com/records/visit/P123456-021025",
        },
        {
          date: "2024-11-05",
          doctor: "Dr. Emily Carter",
          notes: "Blood pressure slightly elevated.",
          detailsLink: "https://hospital.com/records/P123456-110524",
        },
      ],
    },
    messages: [
      {
        date: "2025-03-15",
        sender: "Dr. Emily Carter",
        subject: "Upcoming Appointment Reminder",
        preview: "Just a reminder for your appointment on March 25th...",
      },
      {
        date: "2025-02-11",
        sender: "Billing Dept",
        subject: "Invoice #INV4567",
        preview: "Your recent visit invoice is ready for review...",
      },
    ],
    billing: {
      outstandingBalance: 150.75,
      paymentHistory: [
        {
          date: "2025-02-15",
          description: "Checkup - Dr. Carter",
          amount: 75.0,
          status: "Paid",
        },
        {
          date: "2025-03-01",
          description: "Lab Work",
          amount: 150.75,
          status: "Pending",
        },
      ],
      insurance: {
        provider: "Blue Cross Blue Shield",
        policyNumber: "BCBS-987654321",
      },
    },
  },
};
