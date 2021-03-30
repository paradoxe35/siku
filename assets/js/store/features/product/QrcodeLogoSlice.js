import { createSlice } from '@reduxjs/toolkit'


const eventQrcodeLogoUrl = createSlice({
    name: 'eventQrcodeLogoUrl',
    initialState: '',
    reducers: {
        setQrcodeLogoUrl: (state, { payload }) => {
            state = payload
            return state
        },
    }
})

export const { setQrcodeLogoUrl } = eventQrcodeLogoUrl.actions

export const eventQrcodeLogoUrlReducer = eventQrcodeLogoUrl.reducer
