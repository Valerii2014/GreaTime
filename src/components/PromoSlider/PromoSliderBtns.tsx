import { SliderData } from '../../services/categoriesApi'

interface SliderBtnsProps {
    sliderImagesData: SliderData
    onChangeSlide: (
        move: 'prev' | 'next',
        choisedProduct?: number | undefined
    ) => void
}

const SliderBtns = (props: SliderBtnsProps) => {
    const { sliderImagesData, onChangeSlide } = props
    return sliderImagesData.length > 1 ? (
        <div className="slider_btn">
            <div
                className="slider_btn_prev"
                onClick={() => onChangeSlide('prev')}
            >
                <img src="./icons/system/arrowBlue.svg" alt="prev" />
            </div>
            <div
                className="slider_btn_next"
                onClick={() => onChangeSlide('next')}
            >
                <img src="./icons/system/arrowBlue.svg" alt="prev" />
            </div>
        </div>
    ) : (
        <></>
    )
}

export default SliderBtns
