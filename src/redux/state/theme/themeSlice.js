import { createSlice } from "@reduxjs/toolkit";
export const themeSlice = createSlice({
    name: "darkTheme",
    initialState: {
        value: false
    },
    reducers: {
        setTheme: (state) => {
            state.value = !state.value
        }
    }
})
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;