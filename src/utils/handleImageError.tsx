import { ReactEventHandler, useRef } from 'react'

export const handleImageError: ReactEventHandler<HTMLImageElement> = (
    event
) => {
    event.currentTarget.src = './icons/noImage.jpg'
}
