const EventTable = () => {
  const eventList = [
    {
      id: 1,
      date: "2023-08-20",
      title: "Meeting",
      time: "10:00 AM",
    },
    {
      id: 2,
      date: "2023-08-20",
      title: "Meeting",
      time: "10:00 AM",
    },
    {
      id: 2,
      date: "2023-08-20",
      title: "Meeting",
      time: "10:00 AM",
    },
    {
      id: 2,
      date: "2023-08-20",
      title: "Meeting",
      time: "10:00 AM",
    },
  ];
  return (
    <div style={{ padding: "15px", height: "100%", overflow: "auto" }}>
      {eventList.map((event) => (
        <div
          key={event.id}
          className="p-4 my-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col text-center">
              <h3 className="text-gray-500">{event.id}</h3>
            </div>
            <div className="flex flex-col text-center">
              <span className="px-2 py-1 font-medium text-gray-900">
                {event.time}
              </span>
              <p className="text-sm text-gray-500">{event.date}</p>
            </div>
            <div className="flex flex-col text-center">
              <span className="px-2 py-1 font-medium text-gray-900">
                {event.title}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default EventTable;
