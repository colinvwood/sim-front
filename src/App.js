import { Routes, Route } from "react-router-dom";

import Home from './components/home.component.jsx';
import Sim from './components/sim/sim.component.jsx';
import Data from './components/data/data.component.jsx';
import VpnConnect from './components/vpn-connect/vpn-connect.component.jsx';

export default function App() {
  return (
    <div>
      <h1>Sim front</h1>

      <Routes basename={process.env.PUBLIC_URL}>
        <Route path="/simulation" element={ <Home /> } />
        <Route path="/simulation/sim" element={ <Sim /> } />
        <Route path="/simulation/data" element={ <Data /> } />
        <Route path="/simulation/vpn-connect" element={ <VpnConnect /> } />
      </Routes>
        
    </div>
  );
}

