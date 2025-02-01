import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Event = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    const sortedEvents = savedEvents.sort(
      (a, b) => new Date(a.startDate) - new Date(b.startDate)
    );
    setEvents(sortedEvents);
  }, []);

  const formatEventDate = (dateString) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const eventDay = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate()
    );

    if (eventDate < now) {
      return "Finished";
    } else if (eventDay.getTime() === today.getTime()) {
      return `Today, ${eventDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (eventDay.getTime() === today.getTime() + 86400000) {
      return `Tomorrow, ${eventDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return eventDate.toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
      });
    }
  };

  return (
    <div>
      <div className="ml-12 mt-4">
        <button
          className="bg-gray-500 pt-2 pb-2 pr-2 pl-2 rounded-lg"
          onClick={() => navigate("/")}
        >
          Create New Event
        </button>
      </div>
      <div className="mt-4 mr-12 ml-12 mb-4 flex flex-wrap gap-14">
        {events.map((event, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              maxWidth: "300px",
            }}
          >
            <img
              src={event.media}
              alt={event.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <p>
              <strong>By {event.community}</strong>
            </p>
            <h3>{event.title}</h3>
            <p>📅 {formatEventDate(event.startDate)}</p>
            <p>📍 {event.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
