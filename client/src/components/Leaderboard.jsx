import React, { useEffect, useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from '@chakra-ui/react'
import axios from 'axios';

const Leaderboard = () => {
    const [users,setUsers]=useState([]);
    const setLeaderBoard=async()=>{
        try {
            const config = {
                headers: {
                  "Content-Type": "application/json",
                },
              };
              const {data}=await axios.get(process.env.REACT_APP_CHECK_LEADER_BOARD,config);
              setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        setLeaderBoard();
    },[])
  return <>
  <Table variant='striped' colorScheme='purple'>
  {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
  <Thead>
    <Tr>
      <Th >Rank</Th>
      <Th>Username</Th>
      <Th isNumeric>Score</Th>
    </Tr>
  </Thead>
  <Tbody>
      {
          users.length>0 && users.map((user,ind)=>{
              return (
                <Tr>
      <Td>{ind+1}</Td>
      <Td>{user.username}</Td>
      <Td isNumeric>{user.score}</Td>
    </Tr>
              )
              })
      }
  </Tbody>
  {/* <Tfoot>
    <Tr>
      <Th>To convert</Th>
      <Th>into</Th>
      <Th isNumeric>multiply by</Th>
    </Tr>
  </Tfoot> */}
</Table>
  </>;
};

export default Leaderboard;
