import './popularProducts.scss'

import { useState, useRef, useEffect, useMemo, Fragment } from 'react'

import { RootState } from '../../store'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { ProductsData } from '../../store/appSlice/productsSlice'
import { useGetRandomProductsQuery } from '../../services/productsApi'

import ProductCard from '../ProductCard/ProductCard'

import changeSlideFunctionCreator from '../../utils/changeSlideFunctionCreator'
import createTouchHandler from '../../utils/createTouchHandler'

const PopularProduct = () => {
    const displayWidth = useSelector(
        (state: RootState) => state.user.displayWidth
    )
    const productsQuantityOnSlide =
        displayWidth > 991 ? 4 : displayWidth > 768 ? 3 : 2

    const animationTimeMilliseconds = 900
    const [sliderProduct, setSliderProduct] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)
    const touchStartX = useRef<number | null>(null)

    const { data, isLoading, isError } = useGetRandomProductsQuery(20)

    useEffect(() => {
        const sliderChangeInterval = setInterval(() => {
            if (isAnimating) {
                setTimeout(
                    () => onChangeSlide('next'),
                    animationTimeMilliseconds
                )
            }
            onChangeSlide('next')
        }, 4500)

        return () => {
            clearInterval(sliderChangeInterval)
        }
    }, [isAnimating, data])

    const onBuildSliderImage = (productDataArray: ProductsData) => {
        const allSliderImages: JSX.Element[] = []
        let sliderImage: JSX.Element[] = []

        productDataArray.forEach((productData, index) => {
            sliderImage.push(
                <ProductCard key={productData._id} productData={productData} />
            )
            if ((index + 1) % productsQuantityOnSlide === 0) {
                allSliderImages.push(
                    <div className="cards" key={allSliderImages.length}>
                        {sliderImage}
                    </div>
                )
                sliderImage = []
            } else if (
                index + 1 === productDataArray.length &&
                index + 1 === productsQuantityOnSlide
            ) {
                allSliderImages.push(
                    <Fragment key={index}>{sliderImage}</Fragment>
                )
            }
        })
        return allSliderImages
    }
    const Images = data && !isLoading ? onBuildSliderImage(data) : []

    const sliderImages = (Images: JSX.Element[]) => {
        if (Images.length <= 0) return null
        return (
            <div className="popular-items_wrapper_cards" ref={sliderRef}>
                {Images.map((image, index) => {
                    return (
                        <div
                            className={`cards ${
                                index === sliderProduct ? '' : 'hide'
                            }`}
                            key={index}
                        >
                            {image}
                        </div>
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
        Images.length,
        animationTimeMilliseconds
    )

    const onBuildItemDots = (Images: JSX.Element[]) => {
        return (
            <div className="popular-items_dots">
                {Images.map((slide, index) => {
                    return (
                        <span
                            key={index}
                            className={`popular-items_dots_item ${
                                sliderProduct === index
                                    ? 'popular-items_dots_item_active'
                                    : ''
                            }`}
                            onClick={() => {
                                index > sliderProduct
                                    ? onChangeSlide('next', index)
                                    : onChangeSlide('prev', index)
                            }}
                        ></span>
                    )
                })}
            </div>
        )
    }

    const { handleTouchStart, handleTouchMove } = createTouchHandler(
        touchStartX,
        onChangeSlide
    )

    const sliderContent = useMemo(
        () => sliderImages(Images),
        [data, displayWidth]
    )
    const sliderDots = Images ? onBuildItemDots(Images) : null
    const sliderLoading = isLoading ? onBuildSliderLoading() : null
    return (
        <section
            className="popular-items"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchMove}
        >
            <h2 className="section-header">Популярные товары</h2>

            <div className="popular-items_wrapper">
                {sliderContent}
                {sliderLoading}
                <div
                    className="popular-items_btns popular-items_btns_prev"
                    onClick={() => onChangeSlide('prev')}
                >
                    <img src="./icons/system/arrowWhite.svg" alt="prev"></img>
                </div>
                <div
                    className="popular-items_btns popular-items_btns_next"
                    onClick={() => onChangeSlide('next')}
                >
                    <img src="./icons/system/arrowWhite.svg" alt="next"></img>
                </div>
                {sliderDots}
            </div>
        </section>
    )
}

export default PopularProduct

//
//
//
//_______________________________
//
//
//

const onBuildSliderLoading = () => {
    return (
        <div className="popular-items_wrapper_cards">
            <div className="cards">
                <ProductCard key={1} productData={null} />
                <ProductCard key={2} productData={null} />
                <ProductCard key={3} productData={null} />
                <ProductCard key={4} productData={null} />
            </div>
        </div>
    )
}
