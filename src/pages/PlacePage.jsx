import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8 ">
      <h1 className="text-2xl mr-48">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8 max-w-full">
        {/* Left Column: Place Details */}
        <div className="bg-gray-100 p-4">
          <h2 className="font-semibold text-2xl">Description</h2>
          <div className="my-4">{place.description}</div>
          <div>Check-in: {place.check_in}</div>
          <div>Check-out: {place.check_out}</div>
          <div>Max number of guests: {place.max_guests}</div>
        </div>

        {/* Right Column: Booking Widget */}
        <div className="bg-gray-0 p-4">
          <BookingWidget place={place} />
        </div>
      </div>

      <div className="bg-white -mx-8 px-8 py-8 border-t ">
        <div>
          <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extra_info}
        </div>
      </div>
    </div>
  );
}
