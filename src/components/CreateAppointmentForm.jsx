import { useState } from "react";
export default function CreateAppointmentForm() {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTime, setSelectedTime] = useState(null);

  const dates = ["Today", "Tomorrow", "14 Dec 2019"];
  const morningTimes = [
    "9:00AM",
    "9:30AM",
    "10:00AM",
    "10:30AM",
    "11:00AM",
    "11:30AM",
    "12:00PM",
    "12:30PM",
  ];
  const eveningTimes = [
    "5:00PM",
    "5:30PM",
    "6:00PM",
    "6:30PM",
    "7:00PM",
    "7:30PM",
    "8:00PM",
    "8:30PM",
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">ADD APPOINTMENT</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter Patient Name"
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Enter Phone Number"
          className="p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <select className="p-2 border rounded">
          <option>Enter Symptoms</option>
        </select>
        <select className="p-2 border rounded">
          <option>Enter Doctor Name</option>
        </select>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Select Date</h3>
        <div className="flex gap-2">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`p-2 border rounded w-1/3 ${
                selectedDate === date ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Select Time</h3>
        <div className="mb-2 font-semibold">🌞 Morning (9:00AM - 12:30PM)</div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {morningTimes.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`p-2 border rounded ${
                selectedTime === time ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        <div className="mb-2 font-semibold">🌙 Evening (4:30PM - 9:00PM)</div>
        <div className="grid grid-cols-4 gap-2">
          {eveningTimes.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`p-2 border rounded ${
                selectedTime === time ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <button className="w-full p-2 bg-blue-600 text-white rounded mt-4">
        Book Appointment
      </button>
    </div>
  );
}
