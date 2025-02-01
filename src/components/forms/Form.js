import { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import defaultPhoto from "./addphotoimage.jpg";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [community, setCommunity] = useState("XiOn Club");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [events, setEvents] = useState([]);
  const [position, setPosition] = useState(null);
  console.log(position);
  console.log(events);

  const locationCoordinates = {
    Delhi:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448196.533424376!2d76.76288936445783!3d28.64368296654747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1738391821279!5m2!1sen!2sin",
    Noida:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224357.50211967007!2d77.23667091062296!3d28.52210193614951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1738391734204!5m2!1sen!2sin",
    Bengaluru:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.90111491442!2d77.46578306729424!3d12.953945398324226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1738391874318!5m2!1sen!2sin",
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        resizeMedia(event.target.result, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeMedia = (src, type) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const targetWidth = 400;
      const targetHeight = 500;
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      setMedia(canvas.toDataURL(type));
    };
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setLocation(selectedLocation);
    setPosition(locationCoordinates[selectedLocation] || null);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !startDate || !endDate || !location || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    const currentDate = new Date();
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (parsedStartDate >= parsedEndDate) {
      alert("Please make sure to add an appropriate timeline for the event.");
      return;
    }

    if (parsedStartDate < currentDate) {
      alert("Event start date must be in the future.");
      return;
    }

    const eventData = {
      community,
      title,
      startDate,
      endDate,
      location,
      description,
      media,
    };
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];

    const updatedEvents = [...storedEvents, eventData];

    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    alert("Event Created Successfully!");
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setStartDate("");
    setEndDate("");
    setLocation("");
    setDescription("");
    setMedia(null);
  };

  return (
    <div>
      <h2 className="text-center mt-4 mb-3 text-2xl font-bold">
        Create New Event
      </h2>
      <form onSubmit={submitHandler} className="flex flex-col items-center">
        <div className="relative pt-2 pr-2 pl-2 pb-2 bg-slate-200 rounded-xl">
          <img
            src={media || defaultPhoto}
            alt="Event"
            height={130}
            width={306}
            className="rounded"
          />
        </div>
        <div className="flex items-center bg-slate-100 pt-2 pb-2 pr-2 pl-2 rounded-lg mt-2 absolute top-[400px]">
          <UploadFileIcon />
          <label
            htmlFor="imageUpload"
            className="btn btn-primary btn-block btn-outlined cursor-pointer ml-[2px]"
          >
            {media ? "Change Photo" : "Add Photo"}
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleMediaChange}
          />
        </div>
        <div className="mt-4 bg-slate-100 pt-2 pb-2 pr-2 pl-2 rounded-lg">
          <label className="mr-4">Select Community</label>
          <select
            className="w-[164px] pt-1 pb-1 pr-1 pl-1 rounded-md"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            required
          >
            <option value="">Select Below</option>
            <option value="AniClub">Ani Club</option>
            <option value="XiOnClub">XiOn Club</option>
          </select>
        </div>
        <div className="mt-4 bg-slate-100 pt-2 pb-2 pr-3 pl-3 rounded-lg">
          <label className="mr-4">Event Title*</label>
          <input
            className="pt-1 pb-1 pr-1p pl-2 font-semibold w-[204px] rounded-lg"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center mt-4 bg-slate-100 pt-2 pb-2 pr-1 pl-1 rounded-lg">
          <div className="inline-block transform rotate-90">
            <b>&lt;</b> ---- <b> &gt; </b>
          </div>
          <div>
            <div className="mb-2">
              <label>Start Time</label>
              <input
                className="ml-2 pl-1 pr-1 pt-1 rounded-lg pb-1 w-[190px]"
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mr-2">End Time</label>
              <input
                className="ml-2 pl-1 pr-1 pt-1 rounded-lg pb-1 w-[190px]"
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className=" bg-slate-100 pt-2 pb-2 pr-2 pl-2 rounded-lg mt-4">
          <label>Choose Location</label>
          <select
            className="ml-4 pl-1 pr-1 pt-1 pb-1 rounded-lg w-[180px]"
            value={location}
            onChange={handleLocationChange}
            required
          >
            <option value="None">Select a location</option>
            <option value="Delhi">Delhi</option>
            <option value="Noida">Noida</option>
            <option value="Bengaluru">Bengaluru</option>
          </select>
          {location && locationCoordinates[location] && (
            <aside className="mt-6">
              <iframe
                title="Event Location"
                width="100%"
                height="400"
                className="rounded-lg shadow-lg"
                src={locationCoordinates[location]}
                allowFullScreen
                loading="lazy"
              />
            </aside>
          )}
        </div>
        <div className="flex items-center bg-slate-100 pt-2 pb-2 pr-2 pl-2 rounded-lg mt-4">
          <label>Add Description</label>
          <textarea
            className="ml-[33px] pt-1 pr-1 pb-1 pl-1 rounded-lg"
            rows="1"
            cols="18"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-slate-300 text-black mt-3 pt-2 pb-2 pl-6 pr-6 mb-2 rounded-xl"
          type="submit"
        >
          Create Event
        </button>
        <button
          className="bg-gray-400  hover:bg-black text-white mt-3 pt-2 pb-2 pl-2 pr-2 mb-2 rounded-xl"
          onClick={() => navigate("/event")}
        >
          Browse All Events
        </button>
      </form>
    </div>
  );
};

export default Form;
