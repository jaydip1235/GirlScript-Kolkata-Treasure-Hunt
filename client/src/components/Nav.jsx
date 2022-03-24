import { ReactNode, useState, useEffect } from 'react';
import {MdMusicNote,MdMusicOff,MdLeaderboard} from 'react-icons/md';
import Music from '../assets/music.mp3';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate,NavLink } from 'react-router-dom';

// const NavLink = ({ children }: { children: ReactNode }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={'md'}
//     _hover={{
//       textDecoration: 'none',
//       bg: useColorModeValue('gray.200', 'gray.700'),
//     }}
//     href={'#'}>
//     {children}
//   </Link>
// );

export default function Nav() {
    const navigate=useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [playing,setPlaying]=useState(false);
  const [audio]=useState(new Audio(Music));
  audio.addEventListener('ended',()=>{
      audio.play();
  })
  const playMusic=()=>{
    if(!playing) audio.play();
    else audio.pause();
    setPlaying(!playing);
  }

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <NavLink to="/play">
              <Avatar
                size={"md"}
                src={
                  "https://i.postimg.cc/tJyp2pyv/gsk.jpg"
                }
                marginLeft="-2"
              />{" "}
            </NavLink>
          </Box>
              <Text fontSize='lg'>Treasure Hunt</Text>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={2}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button onClick={playMusic}>
                {playing ? <MdMusicOff /> : <MdMusicNote />}
              </Button>
              <Button
                rightIcon={<MdLeaderboard />}
                onClick={() => navigate("/leaderboard")}
                colorScheme="teal"
                variant="outline"
              >
                LEADERBOARD
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}