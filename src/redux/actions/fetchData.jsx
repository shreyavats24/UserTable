import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

const users = createAsyncThunk('table/users',async(_,thunkAPI)=>{
    const state = thunkAPI.getState();
    // console.log("state",state)
    const response = await axios.get(`https://dummyjson.com/users?skip=${state.tableReducer.skipUser}&limit=1`);
    return response.data.users[0];
})
export default users;