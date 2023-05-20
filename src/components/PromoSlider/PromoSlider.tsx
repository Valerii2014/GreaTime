import "./promoSlider.scss";

import { useState } from "react";

interface ContentDB {
  src: string;
  alt: string;
}

const sliderContentFromDB: ContentDB[] = [
  {
    src: "./imgs/slide1.jpg",
    alt: "fdsfsdf",
  },
  {
    src: "./imgs/slide1.jpg",
    alt: "fdsfsdf",
  },
  {
    src: "./imgs/slide1.jpg",
    alt: "fdsfsdf",
  },
  {
    src: "./imgs/slide1.jpg",
    alt: "fdsfsdf",
  },
  {
    src: "./imgs/slide1.jpg",
    alt: "fdsfsdf",
  },
];

const PromoSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(0);

  console.log(sliderPosition);

  const onChangeSlide = (move: "prev" | "next") => {
    if (move === "next") {
      const newPosition = sliderPosition + 1;
      newPosition >= sliderContentFromDB.length
        ? setSliderPosition(0)
        : setSliderPosition(newPosition);
    } else if (move === "prev") {
      const newPosition = sliderPosition - 1;
      newPosition < 0
        ? setSliderPosition(sliderContentFromDB.length)
        : setSliderPosition(newPosition);
    }
  };

  const onBuildContent = (data: ContentDB[]) => {
    const { src, alt } = data[sliderPosition];
    return (
      <div id={`${sliderPosition}`} className="slider_img">
        <img src={src} alt={alt} />
      </div>
    );
  };

  return (
    <section className="slider">
      <div className="container">
        <div className="slider_wrapper">
          <div
            className="slider_images"
            style={{
              transform: `translateX(-${sliderPosition}px)`,
            }}
          >
            {onBuildContent(sliderContentFromDB)}
          </div>
          <div className="slider_btn">
            <div
              className="slider_btn_prev"
              onClick={() => onChangeSlide("prev")}
            >
              <img src="./icons/short_right.svg" alt="prev" />
            </div>
            <div
              className="slider_btn_next"
              onClick={() => onChangeSlide("next")}
            >
              <img src="./icons/short_right.svg" alt="prev" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSlider;
