import './data.styles.css';
import Run from './run.component.jsx';
import VpnStatus from '../vpn-status/vpn-status.component.jsx';

import { useState, useEffect } from 'react';

const Data = (props) => {

  const [simName, setSimName] = useState('');
  const [recentNumber, setRecentNumber] = useState(0);
  const [rows, setRows] = useState([]);
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    var key = 0;
    var tempRuns = [];
    for (var row of rows) {
      tempRuns = [...tempRuns, <Run data={row} key={key++} />];
    }
    setRuns(tempRuns);
  }, [rows]);

  return(
    <div>
      <VpnStatus />

      <h1>
      Retrieve simulation data.
      </h1>
      <p>
        Check the status of a simulation or retreive the output of a 
        completed simulation.
      </p>

      <form name="nameForm" onSubmit={handleRetrieveSubmit}>
        <ul>
          <li>
            <label htmlFor="simName">
              Search by name of simulation: 
            </label>
            <input
              type="text"
              name="simName"
              value={simName}
              onChange={handleSimNameChange} 
            />
          </li>
          <p><b>OR</b></p>
          <li>
            <label htmlFor="recentNumber">
              Retreive the n most recently submitted simulations, n:  
            </label>
            <input 
              type="number" 
              name="recentNumber" 
              value={recentNumber} 
              onChange={handleRecentNumChange}
            />
          </li>
        </ul>
        
        <input type="submit" value="Submit" />
        <button onClick={clearForm}>
          Reset
        </button>
      </form>

      {runs}

    </div>
    
  )

  async function handleRetrieveSubmit(event) {
    event.preventDefault();

    var body;
    if (simName) {
      body = JSON.stringify( { simName: simName } );
    } else if (recentNumber) {
      body = JSON.stringify( { recentNumber: recentNumber } );
    }

    try {
      const response = await fetch('https://www.colinwood.dev/express/retrieve-records', {
        method: 'POST', 
        body: body,
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const records = await response.json();
      const rows = records.records;
      setRows(rows);

    } catch (error) {
      console.log("Error fetching records.");
    }
  }

  async function handleSimNameChange(event) {
    event.preventDefault();
    setSimName(event.target.value);
  }

  async function handleRecentNumChange(event) {
    event.preventDefault();
    setRecentNumber(event.target.value);
  }

  async function clearForm(event) {
    event.preventDefault();
    setSimName('');
    setRecentNumber(0);
  }

}

export default Data;