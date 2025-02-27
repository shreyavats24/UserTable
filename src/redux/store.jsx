import {configureStore} from "@reduxjs/toolkit";
import {tableReducer} from "./reducer/tableSlicer";

const store = configureStore({
    reducer:{tableReducer}
})
export default store

