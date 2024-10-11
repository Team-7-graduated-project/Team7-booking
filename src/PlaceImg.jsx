import PropTypes from "prop-types"; // Import PropTypes

export default function PlaceImg({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return (
    <div>
      <img
        className={className}
        src={"http://localhost:3000/" + place.photos[index]} // Use index prop
      />
    </div>
  );
}

// Add PropTypes for validation
PlaceImg.propTypes = {
  place: PropTypes.shape({
    photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number,
  className: PropTypes.string,
  title: PropTypes.string,
};
