import './promoSlider.scss'

import { useSelector, useDispatch } from 'react-redux'
import { useState, useRef, useEffect, useMemo, ReactEventHandler } from 'react'

import { RootState } from '../../store'
import { SliderData } from '../../services/categoriesApi'
import { useGetSliderDataQuery } from '../../services/categoriesApi'
import { setSliderData } from '../../store/appSlice/categoriesSlice'

import { Spinner } from '../spinner/Spinner'
import SliderBtns from './PromoSliderBtns'

import changeSlideFunctionCreator from '../../utils/changeSlideFunctionCreator'
import createTouchHandler from '../../utils/createTouchHandler'

const PromoSlider = () => {
    const sliderImagesData: SliderData = useSelector(
        (state: RootState) => state.categories.sliderData
    )
    const { data, isFetching, isError } = useGetSliderDataQuery()
    const dispatch = useDispatch()
    const animationTimeMilliseconds = 900
    const [sliderProduct, setSliderProduct] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)
    const touchStartX = useRef<number | null>(null)

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
    }, [isAnimating, sliderImagesData])

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
                            index === sliderProduct ? '' : 'hide'
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
                                num === sliderProduct
                                    ? 'slider_dots_item_active'
                                    : null
                            }`}
                            onClick={() => {
                                if (num > sliderProduct)
                                    onChangeSlide('next', num)
                                else if (num < sliderProduct)
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
        sliderProduct,
        setSliderProduct,
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

    const { handleTouchStart, handleTouchMove } = createTouchHandler(
        touchStartX,
        onChangeSlide
    )

    const LoadingSpinner =
        isFetching && sliderImagesData.length === 0 ? <Spinner /> : null

    return (
        <section
            className="slider"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchMove}
        >
            <div className="container">
                <div className="slider_wrapper">
                    {LoadingSpinner}
                    {SliderImages}
                    <SliderBtns
                        sliderImagesData={sliderImagesData}
                        onChangeSlide={onChangeSlide}
                    />
                    {SliderDots}
                </div>
            </div>
        </section>
    )
}

export default PromoSlider
