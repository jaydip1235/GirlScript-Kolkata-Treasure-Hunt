import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input,InputGroup,InputRightElement,Button,Stack,InputLeftElement,Center, Text } from '@chakra-ui/react';
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
        const { data } = await axios.post(process.env.REACT_APP_LOGIN,
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




  useEffect(() => {
    if (localStorage.getItem("thToken")) {
      navigate("/play");
    }

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
<Text margin={"50px"} marginInline={"100px"} fontSize={'larger'}>
    <Text fontSize={"xxx-large"}>Rules:</Text>
    <hr/>
1. 23 questions in total each carrying 1 mark. Total duration is 100 minutes.
<br/>
2. One cannot go to the next question without answering the present question.
<br/>
3. Each answer is one/two/three/four word type answer and an user can try as much answers as possible. No marks will be deducted for that.
   He/she can only move to the next question if the answer is correct.
   <br/>
4. Leaderboard will be updated simultaneously and one can view the leaderboard at any time. If two teams
  have same score than one who completes first will come at the top of leaderboard.
  <br/>
5. It is not mandatory to answer all 23 questions in 80 minutes. The no. of correct answers matters.
<br/>
6. If a team member answers a question correctly and move to the next question then the other team member needs
    to refresh the page to view the next question.
</Text>
        </div>
    </>
  );
};

export default Login;
