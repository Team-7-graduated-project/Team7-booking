import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extra_info, setExtraInfo] = useState("");
  const [check_in, setCheckIn] = useState("");
  const [check_out, setCheckOut] = useState("");
  const [max_guests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(100);
  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extra_info);
      setCheckIn(data.check_in);
      setCheckOut(data.check_out);
      setMaxGuests(data.max_guests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extra_info,
      check_in,
      check_out,
      price,
      max_guests,
    };

    try {
      if (id) {
        // Update existing place
        await axios.put("/places/", {
          id,
          ...placeData,
        });
      } else {
        // Create new place
        await axios.post("/places", placeData);
      }
      setRedirect(true);
    } catch (error) {
      console.error("Failed to save place:", error);
    }
  }

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "Title for your place. Should be short and catchy as in advertising"
        )}
        <input
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          type="text"
          placeholder="Title, for example: My lovely apt"
        />
        {preInput("Address", "Your location apt")}
        <input
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          type="text"
          placeholder="Address"
        />
        {preInput("Photos", "Your apt picture")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Describe your apt")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Perks", "Select all the perks of your place")}
        <Perks selected={perks} onChange={setPerks} />
        {preInput("Extra Info", "House rules, etc")}
        <textarea
          value={extra_info}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput(
          "Check In & Out times, max guests",
          "Add checkin and checkout time, remember to have some time window for cleaning the room between guests"
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div className="mt-2 -mb-1">
            <h3>Check In Time</h3>
            <input
              value={check_in}
              onChange={(ev) => setCheckIn(ev.target.value)}
              type="text"
              placeholder="8:00"
            />
          </div>
          <div className="mt-2 -mb-1">
            <h3>Check Out Time</h3>
            <input
              value={check_out}
              onChange={(ev) => setCheckOut(ev.target.value)}
              type="text"
              placeholder="17:00"
            />
          </div>
          <div className="mt-2 -mb-1">
            <h3>Max Guests</h3>
            <input
              type="number"
              value={max_guests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
          <div className="mt-2 -mb-1">
            <h3>Price Per Night</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit" className="primary my-4">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
