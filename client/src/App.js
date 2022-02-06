import {Routes,Route} from 'react-router-dom';
import Landing from './components/Landing';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login'
import Nav from './components/Nav';
import Play from './components/Play'
// require('dotenv').config()
// import './App.css';

function App() {
  return (
      <div>
        <Nav/>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/:codeId' element={<Home/>}/> */}
        <Route path="/play" element={<Play/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
