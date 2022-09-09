import './sim-form.styles.css';

import { useState, useEffect } from 'react';

const SimForm = (props) => {

  const [formValues, setFormValues] = useState({
    'mutationRate': 1.6 * 10 ** -10,
    'genomeSize': 2800000,
    'repetitions': 1
  });

  /*
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);
  */

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        <li>
          <label htmlFor="name">
            Give the run a unique/memorable name:
          </label>
          <input
            type="text"
            name="name"
            value={formValues['name'] ? formValues['name'] : ''}
            onChange={handleInputChange} 
            required
          />
        </li>

        <li>
          <label htmlFor="srcGen">
            The number of generations to run the simulation pre transmission:
          </label>
          <input
            type="number"
            name="srcGen"
            value={formValues['srcGen'] ? formValues['srcGen'] : ''}
            onChange={handleInputChange} 
            required
          />
        </li>

        <li>
          <label htmlFor="recGen">
            The number of generations to run the simulation post transmission:
          </label>
          <input
            type="number"
            name="recGen"
            value={formValues['recGen'] ? formValues['recGen'] : ''}
            onChange={handleInputChange} 
            required
          />
        </li>

        <li>
          <label htmlFor="bottleneck">
            The transmission bottleneck:
          </label>
          <input
            type="number"
            name="bottleneck"
            value={formValues['bottleneck'] ? formValues['bottleneck'] : ''}
            onChange={handleInputChange} 
            required
          />
        </li>

        <li>
          <label htmlFor="capacity">
            Each population's carrying capacity: 
          </label>
          <input
            type="number"
            name="capacity"
            value={formValues['capacity'] ? formValues['capacity'] : ''}
            onChange={handleInputChange} 
            required
          />
        </li>

        <li>
          <label htmlFor="sampleSize">
            The size of each sample taken from the source and recipient
            populations at the end of the simulation: 
          </label>
          <input
            type="number"
            name="sampleSize"
            value={formValues['sampleSize'] ? formValues['sampelSize'] : ''}
            onChange={handleInputChange} 
            required
          />
        </li>

        <li>
          <label htmlFor="genomeSize">
            Each population's carrying capacity: 
          </label>
          <input
            type="number"
            name="genomeSize"
            value={formValues['genomeSize'] ? formValues['genomeSize'] : ''}
            onChange={handleInputChange} 
            required
          />
        </li>

        <li>
          <label htmlFor="mutationRate">
            The population's mutation rate (mutations per site per generation):
          </label>
          <input
            type="number"
            name="mutationRate"
            value={formValues['mutationRate'] ? formValues['mutationRate'] : ''}
            onChange={handleInputChange} 
            required
          />
        </li>

        <li>
          <label htmlFor="repetitions">
            The number of independent simulations with the above parameters: 
          </label>
          <input
            type="number"
            name="repetitions"
            value={formValues['repetitions'] ? formValues['repetitions'] : ''}
            onChange={handleInputChange} 
            required
          />
        </li>

        <h3>
          In order to run the simulation on monsoon you have to login to the
          vpn using your NAU credentials:
        </h3>

        <li>
          <label htmlFor="username">
          Username:
          </label>
          <input
            type="text"
            name="username"
            value={formValues['username'] ? formValues['username'] : ''}
            onChange={handleInputChange} 
            required
          />
        </li>
        
        <li>
          <label htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formValues['password'] ? formValues['password'] : ''}
            onChange={handleInputChange} 
            required
          />
        </li>
      
        <li>
          <label htmlFor="twoFactor">
            Two factor authentication (6-digit code or push):
          </label>
          <input
            type="text"
            name="twoFactor"
            value={formValues['twoFactor'] ? formValues['twoFactor'] : ''}
            onChange={handleInputChange} 
            required
          />
        </li>
      
        <input type="submit" value="Submit" />
      </ul>
    </form>
  )

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch('https://www.colinwood.dev/express/sim-new', {
      method: 'POST', 
      body: JSON.stringify(formValues),
      headers: {
        'Content-Type': 'application/json'
      },  
    });
    
    // handle errors
  }

  async function handleInputChange(event) {
    event.preventDefault();
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }
}



export default SimForm;