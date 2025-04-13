import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import EditorPage from './components/EditorPage';
import Dashboard from './components/Dashboard'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <div>
      <Toaster  position='top-center'></Toaster>
    </div>
    <Routes>
     <Route path='/' element={ <Dashboard /> } />
     <Route path='/Home' element={ <Home/> } />
     <Route path='/Signup' element={ <Signup /> } />
     <Route path='/Login' element={ <Login /> } />
     <Route path='/editor/:roomId' element={ <EditorPage /> } />
    </Routes>
    </>
  );
}

export default App;
