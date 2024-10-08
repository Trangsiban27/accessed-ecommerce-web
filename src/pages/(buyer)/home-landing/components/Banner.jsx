import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import image from "../../../../assets/banner.png";

const Banner = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  const onSelect = () => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  };

  useEffect(() => {
    if (emblaApi) {
      setSlides(emblaApi.scrollSnapList());
      emblaApi.on("select", onSelect);
    }
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div
      className="h-[500px] overflow-hidden relative embla rounded-[20px] mt-24"
      ref={emblaRef}
    >
      <div className="z-10 flex">
        <div className="min-w-full banner-container">
          <div className="banner-content">
            <h1>New Year Sale</h1>
            <h1>Offer 2024</h1>
            <h1 className="font-medium">20% OFF</h1>
            <button className="banner-button">
              <ShoppingCartIcon /> Start Shopping
            </button>
          </div>
          <img src={image} alt="Slide 1" className=""></img>
        </div>
        <div className="min-w-full embla__slide">
          <img
            src="https://images.pexels.com/photos/583847/pexels-photo-583847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Slide 2"
            className="w-full"
          ></img>
        </div>
        <div className="min-w-full embla__slide">
          <img
            src="https://images.pexels.com/photos/5198239/pexels-photo-5198239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Slide 3"
            className="w-full"
          ></img>
        </div>
      </div>
      {/* Nút mũi tên trái */}
      <button
        className="absolute flex items-center p-2 text-black transform -translate-y-1/2 bg-gray-300 rounded-full opacity-50 top-1/2 h-9 w-9 left-2 hover:opacity-100"
        onClick={scrollPrev}
      >
        <ArrowBackIosIcon />
      </button>
      {/* Nút mũi tên phải */}
      <button
        className="absolute flex items-center p-2 text-black transform -translate-y-1/2 bg-gray-300 rounded-full opacity-50 top-1/2 h-9 w-9 right-2 hover:opacity-100"
        onClick={scrollNext}
      >
        <ArrowForwardIosIcon />
      </button>
      {/* Hiển thị chấm tròn */}
      <div className="absolute flex space-x-4 bottom-7 left-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === selectedIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => emblaApi.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
