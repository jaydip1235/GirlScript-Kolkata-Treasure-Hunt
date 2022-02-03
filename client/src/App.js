import {Routes,Route} from 'react-router-dom';
import Login from './components/Login'
import Play from './components/Play'
// require('dotenv').config()
// import './App.css';

function App() {
  return (
      <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        {/* <Route path='/:codeId' element={<Home/>}/> */}
        <Route path="/play" element={<Play/>}/>
      </Routes>
    </div>
  );
}

export default App;
