import { createSlice } from "@reduxjs/toolkit";
// import {createSagaMiddleware} from "redux-saga"

import users from "../actions/fetchData";

// const SagaMiddleware =createSagaMiddleware();
const tableSlicer = createSlice({
    name:"table",
    initialState:{
        skipUser:0,
        len:0,
        loading:false,
        userData:{},
        error:""
    },
    reducers:{
        fetchNextUser:(state)=>{
            state.skipUser = state.skipUser+(state.skipUser<state.len?1:0);
            // console.log("skip",state.skipUser,state.len);
        },

        fetchPrevUser:(state)=>{
            state.skipUser = state.skipUser-(state.skipUser>=1?1:0);
            // console.log("prev",state.skipUser,state.len);
        },

        updateLength: (state,action)=>{
            state.len = action.payload.len;
            // console.log(action.payload,state.len);
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(users.pending,(state)=>{
            state.loading= true;
        })

        .addCase(users.fulfilled,(state,action)=>{
            // console.log("action",action.payload);
            state.loading=false;
            state.userData = action.payload;
          //  state.len = action.payload.length;
            // console.log("len",action.payload.data.length);   
        })

        .addCase(users.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading=false;
        })
    },
    // middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(SagaMiddleware)
})

// SagaMiddleware(NumberOfUser)
export const {fetchNextUser,fetchPrevUser,updateLength} = tableSlicer.actions;

export const tableReducer = tableSlicer.reducer