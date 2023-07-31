import './popularPositions.scss'

import { useCallback, useMemo, useState } from 'react'
import { ItemCard, ItemDataInterface } from '../ItemCard/ItemCard'
import InfinitySlider from '../InfinitySlider/InfinitySlider'

const PopularPosition = (data: ItemDataInterface[]) => {
    const sliderContent = useMemo(() => {
        console.log('render')
        const allSlidesWithPositions: JSX.Element[] = []
        let slideWithPositions: JSX.Element[] = []
        data.forEach((positionData, index) => {
            slideWithPositions.push(ItemCard(positionData, index))
            if ((index + 1) % 4 === 0) {
                allSlidesWithPositions.push(<>{slideWithPositions}</>)
                slideWithPositions = []
            } else if (index + 1 === data.length) {
                allSlidesWithPositions.push(<>{slideWithPositions}</>)
            }
        })
        return allSlidesWithPositions
    }, [data])

    return <>{InfinitySlider(sliderContent, 'popular-positions-slider')}</>
}

export default PopularPosition
