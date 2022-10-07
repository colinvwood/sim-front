import './run.styles.css';
import LoadingAnimation from '../additional/loading-animation.component.jsx';
import download from 'downloadjs';

import { useState } from 'react';

const Run = (props) => {

  const [loading, setLoading] = useState(false);

  const values = []
  for (let key in props.data) {
    values.push(
      <div className="runValue" id={key} key={key}>
        <p>{key}:</p>
        <p>{props.data[key]}</p>
      </div>
    );
  }

  return(
    <div id="runData">
      {values}
      {props.data.status == "finished" && 
        <button id={props.data['run_id']} onClick={handleRunClick}>
          Download
        </button>
      }
      <LoadingAnimation loading={loading} />
    </div>
  )

  async function handleRunClick(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://www.colinwood.dev/express/retrieve-stats', {
        method: 'POST', 
        body: JSON.stringify( props.data ),
        headers: {
        'Content-Type': 'application/json'
        },  
      });
      
      const jsonResponse = await response.json();
      const file = jsonResponse.csvStatsFile;
      try {
        const fileResponse = await fetch(`https://www.colinwood.dev/express/retrieve-stats?file=${file}`, {
          method: 'GET', 
          headers: {
          'Content-Type': 'application/json'
          },  
        });
        const fileBlob = await fileResponse.blob();
        download(fileBlob, `stats-run-${event.target.id}.csv`);
      } catch (error) {
        console.log("Error getting run stats.")
      } 

    } catch (error) {
      console.log("Error posting for run stats. ", error);
    } finally {
      setLoading(false);
    }
  }

}


export default Run;