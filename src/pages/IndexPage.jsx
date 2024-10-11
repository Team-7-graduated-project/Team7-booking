import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function IndexPage() {
  const [places, setPlaces] = useState([]); // Initialize with an empty array

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []); // Add an empty dependency array to avoid infinite requests

  return (
    <div className=" mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            to={"/place/" + place._id} // Use _id for routing
            key={place._id} // Ensure unique key using _id
            className=""
          >
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos &&
                place.photos.length > 0 && ( // Check if photos exist
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={"http://localhost:3000/" + place.photos[0]}
                    alt={place.title} // Add alt text for accessibility
                  />
                )}
            </div>
            <h2 className="text-sm font-bold leading-4">{place.title}</h2>
            <h3 className="text-xs truncate text-gray-500 ">{place.address}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
}
