import { useState } from "react";
import Gallery from "./components/Gallery";
import ImageMain from "./components/ImageMain";

const ProductImage = () => {
  const [image, setImage] = useState({});

  console.log(image);

  return (
    <div className="flex w-3/5 gap-x-5">
      <Gallery setImage={setImage}></Gallery>
      <ImageMain image={image}></ImageMain>
    </div>
  );
};

export default ProductImage;
