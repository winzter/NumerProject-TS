import React from 'react';
import { Routes , Route} from 'react-router-dom'
import Home from './pages/Home';
import NavBar from './components/NavBar'
import Bisection from './RootOfEquation/Bisection';
import './App.css';
import Falsepos from './RootOfEquation/Falsepos';
import Onepoint from './RootOfEquation/Onepoint';
import Newton from './RootOfEquation/Newton';
import Secant from './RootOfEquation/Secant';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/bisection" element={<Bisection/>}/>
        <Route path="/falseposition" element={<Falsepos/>}/>
        <Route path="/onepoint" element={<Onepoint/>}/>
        <Route path="/newtonraphson" element={<Newton/>}/>
        <Route path="/secantmethod" element={<Secant/>}/>
      </Routes>
    </>
  );
}

export default App;
