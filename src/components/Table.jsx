// import React from 'react'
import { useEffect } from "react";
import {fetchNextUser, fetchPrevUser, users} from "../features/tableSlicer";
import {useSelector,useDispatch} from "react-redux"
// import { nanoid } from "@reduxjs/toolkit";
import {delay, takeLatest} from "redux-saga/effects";
function Table() {
    const dispatch = useDispatch();
    const {skipUser,len} = useSelector((state)=>state);
    // dispatch(users());
    useEffect(()=>{
        dispatch(users());
        // console.log("call");
    },[dispatch]);


    


    const userData = useSelector((state)=>state.result);
    let loading = useSelector((state)=>state.loading);
    // console.log("userData",userData);
    // function* handleScroll (){
    //     // if(e.target.scrollDown)
    //     console.log("call");
    //     yield delay(1000);
    //     yield dispatch(fetchNextUser()); 
    //     yield dispatch(users());
    // }
    const  getPrevUser = ()=>{
        if(skipUser>=1)
        {dispatch(fetchPrevUser())
        dispatch(users());}
    }
    const getNextUser = ()=>{
        if(skipUser<len){
        dispatch(fetchNextUser())
        dispatch(users());
        }
    }
    
  return (
    <>
      {loading && 
      <div className="flex items-center justify-handlecenter text-2xl h-screen">loading data.....</div>
      }
      {!loading && 
      <div className="flex items-center mt-30 justify-center">
      <table className="w-250 text-2xl bg-amber-50 border-2 mt-30 h-130 border-black-300 " >
      <tbody>
        <tr>
          <th className="px-6 py-3 text-gray-700 font-semibold text-lg text-left ">Name</th>
          <td className="px-6 py-3 text-gray-900">
            {userData?.firstName} {userData?.lastName}
          </td>
        </tr>
        <tr>
          <th className="px-6 py-3 text-gray-700 font-semibold text-left text-lg ">Email Id</th>
          <td className="px-6 py-3 text-gray-900  text-lg">{userData?.email}</td>
        </tr>
        <tr>
          <th className="px-6 py-3 text-gray-700 text-left font-semibold text-lg">Username</th>
          <td className="px-6 py-3 text-gray-900  text-lg">{userData?.username}</td>
        </tr>
        <tr>
          <th className="px-6 py-3 text-gray-700 font-semibold text-lg text-left">Phone Number</th>
          <td className="px-6 py-3 text-gray-900 text-centertext-lg">{userData?.phone}</td>
        </tr>
        <tr >
          <th className="px-6 py-3 text-gray-700 text-left font-semibold text-lg ">Address</th>
          <td className="px-6 py-3 text-gray-900 text-lg">{userData?.address?.address}, {userData?.address?.city}, {userData?.address?.state} -{userData?.address?.postalCode}</td>
        </tr>
      </tbody>
    </table>  
    <button className="p-2" onClick={getPrevUser}>Prev</button>
    <button onClick={getNextUser}>Next</button>
    </div>  
    }
    </>
  )
}

export default Table
