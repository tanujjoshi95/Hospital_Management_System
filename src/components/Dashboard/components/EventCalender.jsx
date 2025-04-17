import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "react-calendar/dist/Calendar.css";

const events = [
  {
    date: "2025-04-10",
    title: "Team Meeting",
    description: "Discuss Q2 goals",
  },
  {
    date: "2025-04-15",
    title: "Product Launch",
    description: "Launch new feature",
  },
  {
    date: "2025-04-20",
    title: "Client Review",
    description: "Review project progress",
  },
];

const EventCalendar = () => {
  const [selectedEvents, setSelectedEvents] = useState([]);

  const handleEventClick = (clickInfo) => {
    const eventDate = clickInfo.event.start.toISOString().split("T")[0];
    const eventsOnDate = events.filter((event) => event.date === eventDate);
    setSelectedEvents(eventsOnDate);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div className="flex items-center">
        <span className="text-red-500 text-lg mr-1">•</span>
        <span className="truncate">{eventInfo.event.title}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow-md max-w-xl mx-auto my-5">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Event Calendar
      </h2>
      <div className="mb-5">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events.map((event) => ({
            title: event.title,
            date: event.date,
            description: event.description,
          }))}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          height="auto"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
          eventDisplay="block"
          eventTextColor="#000"
          eventBackgroundColor="transparent"
          eventBorderColor="transparent"
        />
      </div>
      <div className="pt-3 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          {selectedEvents.length > 0
            ? `Events on ${selectedEvents[0].date}`
            : "Select an event"}
        </h3>
        {selectedEvents.length > 0 ? (
          <ul className="list-none p-0">
            {selectedEvents.map((event, index) => (
              <li key={index} className="mb-2 text-sm text-gray-600">
                <strong>{event.title}</strong>: {event.description}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No events selected</p>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
