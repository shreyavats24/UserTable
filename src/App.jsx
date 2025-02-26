// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect } from 'react'
import './App.css'
import Table from './components/Table'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import {updateLength,users,fetchNextUser} from "./features/tableSlicer";

function App() {
  
  const dispatch = useDispatch();
  useEffect(()=>{
    async function fetchData(){
      const users = await axios.get("https://fakestoreapi.com/users");
      // console.log("users",users);
      dispatch(updateLength({len:users.data.length}));
    }
    fetchData();
  },[0])

  useEffect(() => {
    const handleScroll = () => {
      console.log("ScrollY:", window.scrollY);
      dispatch(fetchNextUser());
      dispatch(users());
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
},[dispatch]);

  return (
    <div className='mt-50 h-100 overflow-y-scroll' >
      <Table/>
    </div>
  )
}

export default App
