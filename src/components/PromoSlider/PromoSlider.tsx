import "./promoSlider.scss";

import { useState, useRef, useEffect } from "react";

interface ContentDB {
  src: string;
  alt: string;
  id: number;
}

const sliderContentFromDB: ContentDB[] = [
  {
    src: "./contentDB/imgs/sliderContent/slide1.jpg",
    alt: "fdsfsdf",
    id: 3248745,
  },
  {
    src: "./contentDB/imgs/sliderContent/slide1.jpg",
    alt: "fdsfsdf",
    id: 324397705,
  },
  {
    src: "./contentDB/imgs/sliderContent/slide1.jpg",
    alt: "fdsfsdf",
    id: 3243256645,
  },
  {
    src: "./contentDB/imgs/sliderContent/slide1.jpg",
    alt: "fdsfsdf",
    id: 3243745532,
  },
  {
    src: "./contentDB/imgs/sliderContent/slide1.jpg",
    alt: "fdsfsdf",
    id: 3243033534,
  },
  {
    src: "./contentDB/imgs/sliderContent/slide1.jpg",
    alt: "fdsfsdf",
    id: 3243743332,
  },
  {
    src: "./contentDB/imgs/sliderContent/slide1.jpg",
    alt: "fdsfsdf",
    id: 32430334,
  },
];

const PromoSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sliderChangeInterval = setInterval(() => {
      onChangeSlide("next");
    }, 4000);

    return () => {
      clearInterval(sliderChangeInterval);
    };
  }, [sliderPosition]);

  const onSliderDefaultTransition = () => {
    if (sliderRef.current !== null) {
      sliderRef.current.style.transition = "all 1.2s";
    }
  };

  const onSliderSlowlyTransition = () => {
    if (sliderRef.current !== null) {
      const transitionDuration = 0.4 * sliderContentFromDB.length;
      sliderRef.current.style.transition = `all ${transitionDuration}s`;
    }
  };

  const onSliderBeginning = () => {
    setSliderPosition(0);
    onSliderSlowlyTransition();
  };

  const onSliderEnd = () => {
    setSliderPosition(sliderContentFromDB.length - 1);
    onSliderSlowlyTransition();
  };

  const onChangeSlide = (move: "prev" | "next") => {
    onSliderDefaultTransition();
    if (move === "next") {
      const newPosition = sliderPosition + 1;
      if (newPosition >= sliderContentFromDB.length) {
        onSliderBeginning();
      } else {
        setSliderPosition(newPosition);
      }
    } else if (move === "prev") {
      const newPosition = sliderPosition - 1;
      if (newPosition < 0) {
        onSliderEnd();
      } else {
        setSliderPosition(newPosition);
      }
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
        {data.map((slide, num) => {
          return (
            <span
              key={slide.id}
              className={`slider_dots_item ${
                num === sliderPosition ? "slider_dots_item_active" : null
              }`}
              onClick={() => setSliderPosition(num)}
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
            ref={sliderRef}
            style={{ transform: `translateX(-${sliderPosition * 1190}px)` }}
          >
            {onBuildSliderImage(sliderContentFromDB)}
          </div>
          <div className="slider_btn">
            <div
              className="slider_btn_prev"
              onClick={() => onChangeSlide("prev")}
            >
              <img src="./icons/system/arrowBlue.svg" alt="prev" />
            </div>
            <div
              className="slider_btn_next"
              onClick={() => onChangeSlide("next")}
            >
              <img src="./icons/system/arrowBlue.svg" alt="prev" />
            </div>
          </div>
          {onBuildSliderDots(sliderContentFromDB)}
        </div>
      </div>
    </section>
  );
};

export default PromoSlider;
