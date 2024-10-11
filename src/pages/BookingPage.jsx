import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null); // Fix the destructuring issue here

  useEffect(() => {
    const fetchBooking = async () => {
      if (id) {
        try {
          const response = await axios.get("/bookings");
          const foundBooking = response.data.find(({ _id }) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
          }
        } catch (error) {
          console.error("Error fetching booking:", error);
        }
      }
    };

    fetchBooking();
  }, [id]); // Only include id in the dependency array

  if (!booking) {
    return ""; // Provide a loading state or message
  }

  return (
    <div className="my-8 ">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 max-w-2xl flex p-6 my-6 rounded-2xl items-center flex">
        <div>
          <h2 className="text-xl mb-2">Your booking information: </h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 ml-24 text-white rounded-2xl">
          <div>Total Price</div>{" "}
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  ); // Render the booking details here
}
