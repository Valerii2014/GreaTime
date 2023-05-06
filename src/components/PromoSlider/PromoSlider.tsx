import "./promoSlider.scss";

import { useState, useRef, useLayoutEffect } from "react";

const PromoSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(0);

  console.log(sliderPosition);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const onChangeSlide = (move: "prev" | "next") => {
    const width = imagesRef.current[0] ? imagesRef.current[0].offsetWidth : 0;
    if (move === "next") {
      const newPosition = sliderPosition + width;
      newPosition === width * imagesRef.current.length
        ? setSliderPosition(0)
        : setSliderPosition(newPosition);
    } else if (move === "prev") {
      const newPosition = sliderPosition - width;
      newPosition < 0
        ? setSliderPosition(width * (imagesRef.current.length - 1))
        : setSliderPosition(newPosition);
    }
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
            <div
              id="0"
              className="slider_img"
              ref={(el) => (imagesRef.current[0] = el)}
            >
              <img src="./imgs/slide1.jpg" alt="fdsfsdf" />
            </div>
            <div
              id="1"
              className="slider_img"
              ref={(el) => (imagesRef.current[1] = el)}
            >
              <img src="./imgs/slide1.jpg" alt="fdsfsdf" />
            </div>
            <div
              id="2"
              className="slider_img"
              ref={(el) => (imagesRef.current[2] = el)}
            >
              <img src="./imgs/slide1.jpg" alt="fdsfsdf" />
            </div>
            <div
              id="3"
              className="slider_img"
              ref={(el) => (imagesRef.current[3] = el)}
            >
              <img src="./imgs/slide1.jpg" alt="fdsfsdf" />
            </div>
            <div
              id="4"
              className="slider_img"
              ref={(el) => (imagesRef.current[4] = el)}
            >
              <img src="./imgs/slide1.jpg" alt="fdsfsdf" />
            </div>
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
