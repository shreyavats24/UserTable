import {configureStore} from "@reduxjs/toolkit";
import tableReducer from "../features/tableSlicer";
const store = configureStore({
    reducer:tableReducer
})
export default store