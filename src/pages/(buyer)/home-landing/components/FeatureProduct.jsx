import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ProductCard from "../../../../components/product/ProductCard";
import { Typography } from "@mui/material";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="w-8 h-8 flex justify-center absolute items-center top-[-58px] right-[0px] z-10 cursor-pointer rounded-full bg-slate-200 p-1.5"
      onClick={onClick}
    >
      <KeyboardArrowRightIcon />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="w-8 h-8 flex justify-center absolute items-center top-[-58px] right-[50px] z-10 cursor-pointer rounded-full bg-slate-200 p-1.5"
      onClick={onClick}
    >
      <KeyboardArrowLeftIcon />
    </div>
  );
}

const FeatureProduct = ({ nameTitle, productData }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (productData) {
      setProducts(productData);
    }
  }, [productData]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="w-full my-6">
      <Typography
        variant="h5"
        sx={{ fontWeight: "600" }}
        className="text-start"
      >
        {nameTitle}
      </Typography>
      <div className="slider-container relative mx-[-10px] py-3 text-start">
        <Slider {...settings}>
          {products.map((item) => (
            <div
              className="bg-white shadow-lg hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 rounded-xl p-3 my-5 flex flex-col"
              key={item.id}
            >
              <ProductCard product={item}></ProductCard>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeatureProduct;
