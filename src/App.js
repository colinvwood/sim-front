import { BrowserRouter as Router, Link } from 'react-router-dom';
import './App.css';

import Home from './components/home.component';

function App() {
  return (
    <div className="App">
      <Home hi={"hi"}/>
    </div>
  );
}

export default App;
