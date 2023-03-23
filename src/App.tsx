import React from 'react';
import { Routes , Route} from 'react-router-dom'
import Home from './pages/Home';
import NavBar from './components/NavBar'
import Bisection from './pages/RootOfEquation/Bisection';
import './App.css';
import Falsepos from './pages/RootOfEquation/Falsepos';
import Onepoint from './pages/RootOfEquation/Onepoint';
import Newton from './pages/RootOfEquation/Newton';
import Secant from './pages/RootOfEquation/Secant';
import Cramer from './pages/Linear Agebra/Cramer';

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
        <Route path="/cramer" element={<Cramer/>}/>
      </Routes>
    </>
  );
}

export default App;
