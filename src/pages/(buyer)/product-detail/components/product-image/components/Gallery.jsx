import PropTypes from "prop-types";
import { useEffect } from "react";

const ImageData = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1726682577615-728e4272a60c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://unsplash.com/photos/a-land-rover-driving-on-a-foggy-road-Yz-0UDzQ8NM",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1694033996901-60322b8740dc?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1726609939114-78ca262451e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1721843431268-b8e380c6892f?q=80&w=2027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Gallery = ({ setImage }) => {
  useEffect(() => {
    setImage(ImageData[0]); // Set the first image as default when the component mounts
  }, [setImage]);

  return (
    <ul className="w-[15%] flex flex-col gap-x-2 gap-y-4">
      {ImageData.map((Image) => (
        <li
          key={Image.id}
          className="overflow-hidden rounded-md"
          onClick={() => setImage(Image)}
        >
          <img src={Image.url} alt="" />
        </li>
      ))}
    </ul>
  );
};

Gallery.propTypes = {
  setImage: PropTypes.func.isRequired,
};

export default Gallery;
