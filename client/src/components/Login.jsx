import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gameBefore,setGameBefore]=useState();
  const [gamein,setGamein] = useState();
  const [gameAfter,setGameAfter] = useState();

  
  const handleSubmit = async (e) => {
      e.preventDefault();
    try {
      if (!username.trim() || !password.trim())
        alert("Don't leave any field empty!");
      else {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post("/api/login",
          { username, password },
          config
        );
        localStorage.setItem("thToken", data);
        alert("Login successful!");
        navigate("/play");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  const validateTime = async() =>{
   let data = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
   let mydata = await data.json();
   let timestamp = Date.parse(mydata.datetime);
   //console.log(timestamp);
   let start = Date.parse("2022-02-03T10:21:00.004040+05:30");
   let end = Date.parse("2022-02-03T18:23:00.004040+05:30");
   if (timestamp < start) {
    setGameBefore(true)
    setGamein(false)
    setGameAfter(false)
   console.log("before")
   } else if (timestamp > end) {
       setGameBefore(false);
       setGamein(false);
       setGameAfter(true);
  console.log("after");
   } else {
       setGameBefore(false);
       setGamein(true);
       setGameAfter(false);
      console.log("in");
   }
}


  useEffect(() => {
    if (localStorage.getItem("thToken")) {
      navigate("/play");
    }
    else{
    setInterval(validateTime, 1000);
    }
  },[]);
  return (
    <>
      {gameBefore && <h1>Game has not begun</h1>}

      {gameAfter && <h1>Thank you for playing!</h1>}

      {gamein && (
        <div>
          <input
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </>
  );
};

export default Login;
