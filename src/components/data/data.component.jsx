import './data.styles.css';

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

    </div>
    
  )

  async function handleSimNameSubmit(event) {
    event.preventDefault();
    const response = await fetch('https://www.colinwood.dev/express/login', {
      method: 'POST', 
      body: { 'simName': simName },
      headers: {
        'Content-Type': 'application/json'
      },  
    });
    
    // handle errors
  }

  async function handleRecentNumberSubmit(event) {
    event.preventDefault();
    const response = await fetch('https://www.colinwood.dev/express/login', {
      method: 'POST', 
      body: { 'recentNumber': recentNumber },
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