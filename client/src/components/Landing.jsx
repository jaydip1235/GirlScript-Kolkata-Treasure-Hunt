import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loop from '../assets/loop.mp4';

const Landing = () => {
    const navigate=useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/login');
        },10000)
    },[])
  return <div className='video-div'>
  <video autoPlay muted loop id="myVideo"
  style={{
    position: 'fixed',
    right: '0',
    bottom: '0',
    minWidth: '100vw',
    minHeight: '100vh',
    objectFit:'cover'
  }}
  >
  <source src={Loop} type="video/mp4"/>
</video>
  </div>;
};

export default Landing;
