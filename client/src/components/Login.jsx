import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input,InputGroup,InputRightElement,Button,Stack,InputLeftElement,Center } from '@chakra-ui/react';
import { AtSignIcon,UnlockIcon,ViewIcon,ViewOffIcon,ArrowForwardIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react'

const Login = () => {
    const navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gameBefore,setGameBefore]=useState();
  const [gamein,setGamein] = useState();
  const [gameAfter,setGameAfter] = useState();
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const toast = useToast()
  const statuses = ['success', 'error', 'warning', 'info']

  
  const handleSubmit = async (e) => {
      e.preventDefault();
    try {
      if (!username.trim() || !password.trim())
      toast({
        title: `Don't leave any field empty!`,
        status: 'warning',
        isClosable: true,
      })
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
        toast({
          title: `Login successful!`,
          status: 'success',
          isClosable: true,
        })
        setTimeout(()=>{
          navigate("/play");
        },2000)
      }
    } catch (error) {
      console.log(error);
      toast({
        title: `Invalid credentials`,
        status: 'error',
        isClosable: true,
      })
    }
  };

//   const validateTime = async() =>{
//    let data = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
//    let mydata = await data.json();
//    let timestamp = Date.parse(mydata.datetime);
//    //console.log(timestamp);
//    let start = Date.parse("2022-02-03T10:21:00.004040+05:30");
//    let end = Date.parse("2022-02-10T18:23:00.004040+05:30");
//    if (timestamp < start) {
//     setGameBefore(true)
//     setGamein(false)
//     setGameAfter(false)
//    console.log("before")
//    } else if (timestamp > end) {
//        setGameBefore(false);
//        setGamein(false);
//        setGameAfter(true);
//   console.log("after");
//    } else {
//        setGameBefore(false);
//        setGamein(true);
//        setGameAfter(false);
//       console.log("in");
//    }
// }


  useEffect(() => {
    if (localStorage.getItem("thToken")) {
      navigate("/play");
    }
    // else{
    // setInterval(validateTime, 1000);
    // }
  },[]);
  return (
    <>

        <div>
          <Stack spacing={4} w={{ base: "96%", md: "31%" }} mx='auto' paddingTop={10}>
  <InputGroup>
    <InputLeftElement
      pointerEvents='none'
      children={<AtSignIcon color='gray.300' />}
    />
    <Input type='text' placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)}/>
  </InputGroup>
  <InputGroup size='md'>
  <InputLeftElement
      pointerEvents='none'
      children={<UnlockIcon color='gray.300' />}
    />
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? <ViewOffIcon color='gray.300' /> : <ViewIcon color='gray.300' />}
        </Button>
      </InputRightElement>
    </InputGroup>
</Stack>
<Stack spacing={4} w={{ base: "70%", md: "16%" }} mx='auto' paddingTop={6}>
    <Button rightIcon={<ArrowForwardIcon />} onClick={handleSubmit} colorScheme='teal' variant='outline'>Login</Button>
</Stack>
        </div>
    </>
  );
};

export default Login;
