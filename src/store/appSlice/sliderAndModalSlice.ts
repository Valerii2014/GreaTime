import { createSlice } from '@reduxjs/toolkit'

interface sliderAndModalInitialStateInterface {
    modalType: 'logIn' | 'signIn' | null
}

const initialState: sliderAndModalInitialStateInterface = {
    modalType: null,
}

const sliderAndModalSlice = createSlice({
    name: 'sliderAndModal',
    initialState,
    reducers: {
        setModalType: (state, action) => {
            state.modalType = action.payload
        },
    },
})

const { actions, reducer } = sliderAndModalSlice
export default reducer
export const { setModalType } = actions
