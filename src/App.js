import { Link, Routes, Route } from "react-router-dom";

import Home from './components/home.component';
import Sim from './components/sim/sim.component';
import Data from './components/data/data.component';

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

