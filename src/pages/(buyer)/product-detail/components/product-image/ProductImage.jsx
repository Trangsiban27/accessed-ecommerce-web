import { useCallback, useEffect, useState } from "react";
import Gallery from "./components/Gallery";
import ImageMain from "./components/ImageMain";
import useEmblaCarousel from "embla-carousel-react";
import PropTypes from "prop-types";
import "../../../../../utils/embla.css";

const ProductImage = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onThumbHover = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="gallery w-[80%]">
      <Gallery
        emblaThumbsRef={emblaThumbsRef}
        slides={slides}
        onThumbClick={onThumbClick}
        onThumbHover={onThumbHover}
        selectedIndex={selectedIndex}
      ></Gallery>
      <ImageMain
        emblaMainRef={emblaMainRef}
        slides={slides}
        emblaApi={emblaMainApi}
      ></ImageMain>
    </div>
  );
};

ProductImage.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  options: PropTypes.object,
};

export default ProductImage;
