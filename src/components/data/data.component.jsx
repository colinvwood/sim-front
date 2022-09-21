import './data.styles.css';
import Run from './run.component.jsx';

import { useState, useEffect } from 'react';

const Data = (props) => {

  const [simName, setSimName] = useState('');
  const [recentNumber, setRecentNumber] = useState(5);

  return(

    
    <div>
      <h1>
      Retrieve simulation data.
      </h1>
      <p>
        Check the status of a simulation or retreive the output of a 
        completed simulation.
      </p>

      <form onSubmit={handleSimNameSubmit}>
        <label htmlFor="simName">
          Search by name of simulation: 
        </label>
        <input
          type="text"
          name="name"
          value={simName}
          onChange={handleSimNameChange} 
          required
        />

        <input type="submit" value="submit" />
      </form>

      <p>(Or)</p>

      <form onSubmit={handleRecentNumberSubmit}>
        <label htmlFor="recentNumber">
          Retreive the n most recently submitted simulations, n:  
        </label>
        <input 
          type="number" 
          name="recentNumber" 
          value={recentNumber} 
          onChange={handleRecentNumChange} 
        />

        <input type="submit" value="submit" />
      </form>

      <Run data={ {name: "thurs", id: 1, srcGen: 100} } />

    </div>
    
  )

  async function handleSimNameSubmit(event) {
    event.preventDefault();
    const response = await fetch('https://www.colinwood.dev/express/retrieve-name', {
      method: 'POST', 
      body: JSON.stringify( { simName: simName } ),
      headers: {
        'Content-Type': 'application/json'
      },  
    });
    
    // handle errors
  }

  async function handleRecentNumberSubmit(event) {
    event.preventDefault();
    const response = await fetch('https://www.colinwood.dev/express/retrieve-number', {
      method: 'POST', 
      body: JSON.stringify( { recentNumber: recentNumber } ),
      headers: {
        'Content-Type': 'application/json'
      },  
    });
    
    // handle errors
  }

  async function handleSimNameChange(event) {
    event.preventDefault();
    setSimName(event.target.value);
  }

  async function handleRecentNumChange(event) {
    event.preventDefault();
    setRecentNumber(event.target.value);
  }


}

export default Data;