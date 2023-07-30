import { useCallback } from 'react'
import InfinitySlider from '../InfinitySlider/InfinitySlider'

interface ContentDB {
    src: string
    alt: string
    id: number
}

const sliderContentFromDB: ContentDB[] = [
    {
        src: './contentDB/imgs/sliderContent/slide1.jpg',
        alt: 'fdsfsdf',
        id: 3248745,
    },
    {
        src: './contentDB/imgs/sliderContent/slide1.jpg',
        alt: 'fdsfsdf',
        id: 324397705,
    },
    {
        src: './contentDB/imgs/sliderContent/slide1.jpg',
        alt: 'fdsfsdf',
        id: 3243256645,
    },
    {
        src: './contentDB/imgs/sliderContent/slide1.jpg',
        alt: 'fdsfsdf',
        id: 3243745532,
    },
    {
        src: './contentDB/imgs/sliderContent/slide1.jpg',
        alt: 'fdsfsdf',
        id: 3243033534,
    },
    {
        src: './contentDB/imgs/sliderContent/slide1.jpg',
        alt: 'fdsfsdf',
        id: 3243743332,
    },
    {
        src: './contentDB/imgs/sliderContent/slide1.jpg',
        alt: 'fdsfsdf',
        id: 32430334,
    },
]

const PromoSlider = () => {
    const sliderContent: JSX.Element[] = sliderContentFromDB.map((slide) => {
        const { src, alt } = slide
        return <img src={src} alt={alt} />
    })
    const Slider = useCallback(
        () => InfinitySlider(sliderContent),
        [sliderContentFromDB]
    )
    return <Slider />
}

export default PromoSlider
