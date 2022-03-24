import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
  InputLeftElement,
  Center,
  Image,
  Text,
} from "@chakra-ui/react";
import {
  AtSignIcon,
  UnlockIcon,
  ViewIcon,
  ViewOffIcon,
  ArrowForwardIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Play = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [username, setUsername] = useState();
  const [ind, setInd] = useState();
  const [ques, setQues] = useState();
  const [ans, setAns] = useState();
  const [gameBefore, setGameBefore] = useState();
  const [gamein, setGamein] = useState();
  const [gameAfter, setGameAfter] = useState();
  const [gameOver, setGameOver] = useState();
  const toast = useToast();
  const [startdiff, setStartdiff] = useState();
  const [endDiff, setEndDiff] = useState();
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

    const { data } = await axios.get(process.env.REACT_APP_GET_USER, config);
    setUser(data);
    let ff = 0;
    for (let i = 0; i < data.questions.length; i++) {
      if (data.questions[i].flagVal == false) {
        setInd(i);
        ff = 1;
        break;
      }
    }
    if (ff === 0) {
      if (data.score < 23) setInd(data.score + 1);
      else setInd(24);
    }
    setUsername(data.username);
  };

  useEffect(() => {
    getUser();
  }, []);

  const getTime = (timeDiff, para) => {
    var totalSeconds = Math.floor(timeDiff / 1000);
    var seconds = totalSeconds % 60;
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var hours = Math.floor(totalSeconds / 3600) % 24;
    var days = Math.floor(totalSeconds / (3600 * 24));
    if (!days && !hours && minutes == 5 && seconds == 0 && para == "end") {
      toast({
        title: `5 minutes left!`,
        status: "warning",
        isClosable: true,
      });
    }
    return `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
  };

  const validateTime = async () => {
    let data = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    let mydata = await data.json();
    let timestamp = Date.parse(mydata.datetime);
    let start = Date.parse("2022-03-27T17:00:00.004040+05:30");
    let end = Date.parse("2022-03-27T18:30:00.000000+05:30");
    let startTimeDiff = new Date(start) - new Date();

    setStartdiff(getTime(startTimeDiff, "start"));
    let endTimeDiff = new Date(end) - new Date();
    setEndDiff(getTime(endTimeDiff, "end"));
    if (timestamp < start) {
      setGameBefore(true);
      setGamein(false);
      setGameAfter(false);
    } else if (timestamp > end) {
      setGameBefore(false);
      setGamein(false);
      setGameAfter(true);
    } else {
      setGameBefore(false);
      setGamein(true);
      setGameAfter(false);
    }
  };

  useEffect(() => {
    setInterval(validateTime, 1000);
  }, []);

  const getQuestion = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("thToken")}`,
      },
    };

    const { data } = await axios.post(
      process.env.REACT_APP_UPDATE_USER,
      { idx: ind },
      config
    );
    if (data == "Thanks wait for result") {
      setGameOver(true);
    } else setQues(data);
    const res = await axios.get(
      process.env.REACT_APP_CHECK_LEADER_BOARD,
      config
    );
  };

  useEffect(() => {
    setTimeout(() => getQuestion(), 1000);
  }, [ind]);

  const handleSubmit = async (e) => {
    if (!ans.trim()) {
      toast({
        title: `Please enter a answer!`,
        status: "warning",
        isClosable: true,
      });
    } else {
      if (ques.ans !== ans.toLowerCase().trim()) {
        toast({
          title: `Wrong answer!`,
          status: "error",
          isClosable: true,
        });
        setAns("");
      } else {
        toast({
          title: `Correct answer!`,
          status: "success",
          isClosable: true,
        });
        setInd(ind + 1);
        setTimeout(() => getQuestion(), 1000);
        setAns("");
      }
    }
  };

  return (
    <>
      
      <Stack
        spacing={4}
        w={{ base: "96%", md: "60%" }}
        mx="auto"
        paddingTop={10}
      >
        {gameBefore && <h1>Game starts in {startdiff}</h1>}

        {(gameAfter || gameOver || ind == 25) && (
          <Stack
            spacing={4}
            w={{ base: "100%", md: "100%" }}
            d="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              boxSize="200px"
              src={`https://www.crownconnect.com/assets/ThankYou.jpg`}
              alt="Thank you"
            />
          </Stack>
        )}
        {<Stack></Stack>}
        {gamein && !gameAfter && !gameBefore && !gameOver && ind < 24 && (
          <Stack
            spacing={4}
            w={{ base: "100%", md: "100%" }}
            d="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text>{gamein &&
        !gameAfter &&
        !gameBefore &&
        !gameOver &&
        ind < 24 &&
        `Game ends in ${endDiff}`}</Text>
            <h1>{!ques && <span>Loading...</span>}</h1>
            {/* <h1>{ques && ques.ques}</h1> */}
            <img height="100%" src={ques && ques.ques} alt="" />
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<InfoIcon color="gray.300" />}
              />
              <Input
                pr="4.5rem"
                type="text"
                spellCheck="false"
                placeholder="Type your answer..."
                value={ans}
                onChange={(e) => setAns(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <Button
                rightIcon={<ArrowForwardIcon />}
                onClick={handleSubmit}
                colorScheme="teal"
                variant="outline"
              >
                Submit
              </Button>
            </InputGroup>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default Play;
