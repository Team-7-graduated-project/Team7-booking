import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
  const [check_in, setCheckIn] = useState("");
  const [check_out, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  // Set the user's name from context if available
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (check_in && check_out) {
    numberOfNights = differenceInCalendarDays(
      new Date(check_out),
      new Date(check_in)
    );
    // Prevent negative number of nights
    if (numberOfNights < 0) {
      numberOfNights = 0;
    }
  }

  async function bookThisPlace() {
    try {
      const response = await axios.post("/bookings", {
        check_in,
        check_out,
        name,
        phone_number,
        place: place._id,
        price: numberOfNights * place.price,
        guests: numberOfGuests, // Include number of guests in the booking request
      });

      const bookingId = response.data._id; // Get the booking ID from the response
      setRedirect(`/account/bookings/${bookingId}`); // Redirect to the booking page
    } catch (error) {
      console.error("Error booking place:", error);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex justify-between">
          <div className="flex-1 py-3 px-4">
            <label>Check-In: </label>
            <input
              type="date"
              value={check_in}
              onChange={(ev) => setCheckIn(ev.target.value)}
              className="w-full" // Make the input full width
            />
          </div>
          <div className="flex-1 py-3 px-4 border-l">
            <label>Check-Out: </label>
            <input
              type="date"
              value={check_out}
              onChange={(ev) => setCheckOut(ev.target.value)}
              className="w-full" // Make the input full width
            />
          </div>
        </div>
        <div className="flex py-3 px-4 border-t items-center">
          <label className="mr-2">Number of Guests: </label>
          <input
            type="number"
            value={numberOfGuests}
            min="1" // Enforce minimum value
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
            className="max-w-24" // Set a smaller fixed width for the number input
          />
        </div>

        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your Full Name: </label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="w-full" // Make the input full width
            />
            <label>Your Phone Number: </label>
            <input
              type="tel"
              value={phone_number}
              onChange={(ev) => setPhoneNumber(ev.target.value)}
              className="w-full" // Make the input full width
            />
          </div>
        )}
      </div>

      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place:{" "}
        {numberOfNights > 0 && <span>${numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}

// PropTypes validation
BookingWidget.propTypes = {
  place: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
