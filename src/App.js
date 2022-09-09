import { Link, Routes, Route } from "react-router-dom";

import Home from './components/home.component.jsx';
import Sim from './components/sim/sim.component.jsx';
import Data from './components/data/data.component.jsx';

export default function App() {
  return (
    <div>
      <h1>Sim front</h1>

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/sim" element={ <Sim /> } />
        <Route path="/data" element={ <Data /> } />
      </Routes>


        
        
    </div>
  );
}

