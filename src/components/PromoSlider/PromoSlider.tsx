import './promoSlider.scss'

import { useState, useRef, useEffect, useMemo } from 'react'
import changeSlideFunctionCreator from '../../utils/changeSlideFunctionCreator'
import { useSelector, useDispatch } from 'react-redux'
import { useGetSliderDataQuery } from '../../services/categoriesApi'
import { setSliderData } from '../../store/appSlice/categoriesSlice'
import { SliderData } from '../../services/categoriesApi'
import { RootState } from '../../store'
import { Spinner } from '../spinner/Spinner'
import { ReactEventHandler } from 'react'

const PromoSlider = () => {
    const sliderImagesData: SliderData = useSelector(
        (state: RootState) => state.categories.sliderData
    )
    const { data, isFetching, isError } = useGetSliderDataQuery()
    const dispatch = useDispatch()
    const animationTimeMilliseconds = 900
    const [sliderPosition, setSliderPosition] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (data) {
            // Dispatch the fetched data to update the state in the Redux store.
            dispatch(setSliderData(data))
        }
    }, [data])

    useEffect(() => {
        const sliderChangeInterval = setInterval(() => {
            if (isAnimating && sliderImagesData.length !== 0) {
                setTimeout(
                    () => onChangeSlide('next'),
                    animationTimeMilliseconds
                )
            }
            onChangeSlide('next')
        }, 4000)

        return () => {
            clearInterval(sliderChangeInterval)
        }
    }, [isAnimating, data])

    const handleImageError: ReactEventHandler<HTMLImageElement> = (event) => {
        event.currentTarget.src = './icons/noImage.jpg'
    }

    const onBuildSliderImage = (data: SliderData) => {
        if (sliderImagesData.length === 0) return null
        const slides = data.map((slide, index) => {
            const { src, alt } = slide
            return (
                <img
                    key={index}
                    src={src}
                    alt={alt}
                    onError={handleImageError}
                />
            )
        })
        return (
            <div className="slider_images" ref={sliderRef}>
                {slides.map((slide, index) => (
                    <div
                        className={`slider_images_image ${
                            index === sliderPosition ? '' : 'hide'
                        }`}
                        key={index}
                    >
                        {slide}
                    </div>
                ))}
            </div>
        )
    }

    const onBuildSliderDots = (data: SliderData) => {
        if (sliderImagesData.length === 0) return null
        return (
            <div className="slider_dots">
                {data.map((slide, num) => {
                    return (
                        <span
                            key={slide._id}
                            className={`slider_dots_item ${
                                num === sliderPosition
                                    ? 'slider_dots_item_active'
                                    : null
                            }`}
                            onClick={() => {
                                if (num > sliderPosition)
                                    onChangeSlide('next', num)
                                else if (num < sliderPosition)
                                    onChangeSlide('prev', num)
                                else return
                            }}
                        ></span>
                    )
                })}
            </div>
        )
    }
    const onChangeSlide = changeSlideFunctionCreator(
        sliderRef,
        sliderPosition,
        setSliderPosition,
        isAnimating,
        setIsAnimating,
        sliderImagesData.length,
        animationTimeMilliseconds
    )
    const SliderImages = useMemo(
        () => onBuildSliderImage(sliderImagesData),
        [sliderImagesData]
    )

    const SliderDots =
        sliderImagesData.length !== 0
            ? onBuildSliderDots(sliderImagesData)
            : null
    const LoadingSpinner = isFetching ? <Spinner /> : null
    return (
        <section className="slider">
            <div className="container">
                <div className="slider_wrapper">
                    {LoadingSpinner}
                    {SliderImages}
                    <div className="slider_btn">
                        <div
                            className="slider_btn_prev"
                            onClick={() => onChangeSlide('prev')}
                        >
                            <img
                                src="./icons/system/arrowBlue.svg"
                                alt="prev"
                            />
                        </div>
                        <div
                            className="slider_btn_next"
                            onClick={() => onChangeSlide('next')}
                        >
                            <img
                                src="./icons/system/arrowBlue.svg"
                                alt="prev"
                            />
                        </div>
                    </div>
                    {SliderDots}
                </div>
            </div>
        </section>
    )
}

export default PromoSlider
