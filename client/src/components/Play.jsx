import React,{ useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Play = () => {
    const navigate = useNavigate()
    const [user,setUser]=useState();
    const [username,setUsername]=useState()
    const [ind,setInd] = useState();
    const [ques,setQues]=useState();
    const [ans,setAns] = useState();
    const [gameBefore, setGameBefore] = useState();
    const [gamein, setGamein] = useState();
    const [gameAfter, setGameAfter] = useState();
    const [gameOver, setGameOver] = useState();
    const getUser = async () => {

        if (!localStorage.getItem("thToken")) {
           navigate("/");
         }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("thToken")}`,
        },
      };
  
    const { data } = await axios.get("/api/getuser", config);
    console.log(data.username);
    setUser(data);
    let ff=0
    for(let i=0;i<data.questions.length;i++){
        if(data.questions[i].flagVal==false){
            setInd(i);
            ff=1;
            break;
        }
    }
    if(ff === 0) setInd(5);
    console.log(ind+"kkk");
     setUsername(data.username);
    
    };
   
  useEffect(() =>{
    getUser()
  },[])  


const validateTime = async () => {
  let data = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  let mydata = await data.json();
  let timestamp = Date.parse(mydata.datetime);
  //console.log(timestamp);
  let start = Date.parse("2022-02-03T10:21:00.004040+05:30");
  let end = Date.parse("2022-02-03T16:09:00.000000+05:30");
  if (timestamp < start) {
    setGameBefore(true);
    setGamein(false);
    setGameAfter(false);
    // console.log("before");
  } else if (timestamp > end) {
    setGameBefore(false);
    setGamein(false);
    setGameAfter(true);
    // console.log("after");
  } else {
    setGameBefore(false);
    setGamein(true);
    setGameAfter(false);
    // console.log("in");
  }
};


  useEffect(() =>{
     setInterval(validateTime, 1000);
  },[])

  const getQuestion = async() =>{
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("thToken")}`,
      },
    };  
    // console.log(process.env)
    const { data } = await axios.post(
      process.env.REACT_APP_UPDATE_USER,
      { idx: ind },
      config
    );
    if (data == "Thanks wait for result") {
        setGameOver(true);
    }
    else
    setQues(data);
    const res=await axios.get(process.env.REACT_APP_CHECK_LEADER_BOARD,config);
    console.log(res.data);
  }

  useEffect(()=>{
      setTimeout(()=> getQuestion(), 1000)
     
  },[ind])

  const handleSubmit = async (e) => {
   e.preventDefault();
    if (!ans){
      alert("Please enter an answer")
    }
      if (ques.ans !== ans) {
        alert("wrong");
        setAns("")
      } else {
        setInd(ind + 1);
        setTimeout(() => getQuestion(), 1000);
        setAns("")
      }
  }

  return (
    <>
      {gameBefore && <h1>Game has not begun</h1>}

      {(gameAfter ||  gameOver) && <h1>Thank you for playing!</h1>}
      {gamein && !gameAfter && !gameBefore && !gameOver &&
        <div>
          <h1>{!ques && <span>Loading...</span>}</h1>
          <h1>{ques && ques.ques}</h1>
          <input value={ans} onChange={(e) => setAns(e.target.value)} />
          <button onClick={handleSubmit}>Send</button>
        </div>
      }
    </>
  );
};

export default Play;
