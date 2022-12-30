import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../state/theme/themeSlice";
export default configureStore({
    reducer: {
        darkTheme: themeReducer
    }
})