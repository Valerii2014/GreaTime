import "./promoSlider.scss";

import { useState, useRef } from "react";

interface ContentDB {
  src: string;
  alt: string;
  id: number;
}

const sliderContentFromDB: ContentDB[] = [
  {
    src: "./imgs/slide1.jpg",
    alt: "fdsfsdf",
    id: 3248745,
  },
  {
    src: "./imgs/slide1.jpg",
    alt: "fdsfsdf",
    id: 3243905,
  },
  {
    src: "./imgs/slide1.jpg",
    alt: "fdsfsdf",
    id: 32432545,
  },
  {
    src: "./imgs/slide1.jpg",
    alt: "fdsfsdf",
    id: 32437432,
  },
  {
    src: "./imgs/slide1.jpg",
    alt: "fdsfsdf",
    id: 32430334,
  },
  {
    src: "./imgs/slide1.jpg",
    alt: "fdsfsdf",
    id: 32437432,
  },
  {
    src: "./imgs/slide1.jpg",
    alt: "fdsfsdf",
    id: 32430334,
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
        ? setSliderPosition(sliderContentFromDB.length - 1)
        : setSliderPosition(newPosition);
    }
  };

  const onBuildSliderImage = (data: ContentDB[]) => {
    return data.map((slide) => {
      const { src, alt, id } = slide;
      return (
        <div key={id} className="slider_img">
          <img src={src} alt={alt} />
        </div>
      );
    });
  };

  const onBuildSliderDots = (data: ContentDB[]) => {
    return (
      <div className="slider_dots">
        {data.map((item, key) => {
          return (
            <span
              className={`slider_dots_item ${
                key === sliderPosition ? "slider_dots_item_active" : null
              }`}
              onClick={() => setSliderPosition(key)}
            ></span>
          );
        })}
      </div>
    );
  };

  return (
    <section className="slider">
      <div className="container">
        <div className="slider_wrapper">
          <div
            className="slider_images"
            style={{ transform: `translateX(-${sliderPosition * 1190}px)` }}
          >
            {onBuildSliderImage(sliderContentFromDB)}
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
          {onBuildSliderDots(sliderContentFromDB)}
        </div>
      </div>
    </section>
  );
};

export default PromoSlider;
