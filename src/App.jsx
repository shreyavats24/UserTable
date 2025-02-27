// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useRef } from 'react'
import './App.css'
import Table from './components/Table'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import {updateLength,fetchPrevUser,users,fetchNextUser} from "./features/tableSlicer";

function App() {
  const scrollRef = useRef("");
  const dispatch = useDispatch();
  useEffect(()=>{
    async function fetchData(){
      const users = await axios.get("https://fakestoreapi.com/users");
      // console.log("users",users);
      dispatch(updateLength({len:users.data.length}));
    }
    fetchData();
  },[])
  useEffect(()=>{
    const handleScroll = () => {
      if(scrollRef.current.scrollTop==360)
      {
        console.log("Reached Bottom: ", scrollRef.current.scrollTop);
        dispatch(fetchNextUser());
        dispatch(users());
        // scrollRef.current.scrollTop = 260;
      }
      if(scrollRef.current.scrollTop==0){
        console.log("Reached Top : ",scrollRef.current.scrollTop);
        dispatch(fetchPrevUser());
        dispatch(users());
      }
    };
    if(scrollRef.current)
    scrollRef.current.addEventListener("scroll", handleScroll);
  },[scrollRef.current.scrollTop,dispatch])

  return (
    <div ref={scrollRef} className='mt-50 h-100 overflow-y-scroll' >
      <Table/>
    </div>
  )
}

export default App
