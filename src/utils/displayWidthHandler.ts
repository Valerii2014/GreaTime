import { setDisplayWidth } from '../store/appSlice/userSlice'
import { Dispatch } from '@reduxjs/toolkit'

const displayWidthHandler = (
    dispatch: Dispatch,
    displayWidthCurrent: number,
    displayWidth: number
) => {
    const chengedPixelsQuantity = Math.abs(displayWidth - displayWidthCurrent)
    if (chengedPixelsQuantity > 10 && displayWidthCurrent < 1200) {
        dispatch(setDisplayWidth(displayWidthCurrent))
    }
}

export default displayWidthHandler
