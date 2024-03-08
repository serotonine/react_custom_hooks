import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  // Handling loading states.
  const [isFetching, setIsFetching] = useState(false);
  // Datas to be populate.
  const [availablePlaces, setAvailablePlaces] = useState([]);
  // Fetching Errors
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      // Start fetching.
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3000/wrong");

        const responseDatas = await response.json();
        if (!response.ok) {
          throw new Error(`${response.status} ${response.text}`);
        }
        setAvailablePlaces(responseDatas.places);
      } catch (e) {
        setError({ message: e.message || "Couille dans le potage." });
      }
      // Stop fetching.
      setIsFetching(false);
    }
    fetchPlaces();
  }, []);
  // Fetch error render.
  if (error) {
    return <Error title="An error occured." message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isFetching={isFetching}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
