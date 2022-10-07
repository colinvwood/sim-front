import './sim-form.styles.css';
import VpnStatus from '../additional/vpn-status.component.jsx';
import Notification from '../additional/notification.component.jsx';
import LoadingAnimation from '../additional/loading-animation.component.jsx';

import { useState } from 'react';


const SimForm = (props) => {

  const [formValues, setFormValues] = useState({
    'mutationRate': 1.6 * 10 ** -10,
    'genomeSize': 2800000,
    'capacity': 100000,
    'repetitions': 1,
    'combos': "1"
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);


  return (
    <div>
      <VpnStatus />

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
              value={formValues['sampleSize'] ? formValues['sampleSize'] : ''}
              onChange={handleInputChange} 
              required
            />
          </li>

          <li>
            <label htmlFor="genomeSize">
              The genome length of each individual:
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
              The mutation rate (mutations per site per generation):
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
            <label htmlFor="combos">
              The combination sizes to use during Tier 1 and Tier 2 analyses. 
              Enter a single number or a list (e.g. 1,2,3) 
            </label>
            <input
              type="text"
              name="combos"
              value={formValues['combos'] ? formValues['combos'] : ''}
              onChange={handleInputChange} 
              required
            />
          </li>

          <li>
            <label htmlFor="repetitions">
              The number of independent simulations to run with the above 
              parameters: 
            </label>
            <input
              type="number"
              name="repetitions"
              value={formValues['repetitions'] ? formValues['repetitions'] : ''}
              onChange={handleInputChange} 
              required
            />
          </li>
        
          <input type="submit" value="Submit" />
          <button onClick={clearForm}>
            Reset
          </button>
          <LoadingAnimation loading={loading} />
        </ul>
      </form>
      
      <Notification 
        hide={!submitted} 
        message={"Successfully submitted simulation"}
        color={"green"}
      />
    </div>
  )

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setSubmitted(false);

    try {
      const response = await fetch('https://www.colinwood.dev/express/sim-new', {
        method: 'POST', 
        body: JSON.stringify(formValues),
        headers: {
          'Content-Type': 'application/json'
        },  
      });

      setLoading(false);
      setSubmitted(true);
      clearForm(event);
    } catch (error) {
      setLoading(false);
      console.log("Error submitting new simulation form. ", error);
    }
  }

  async function handleInputChange(event) {
    event.preventDefault();
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }

  async function clearForm(event) {
    event.preventDefault();
    setLoading(false);
    setFormValues({
      'mutationRate': 1.6 * 10 ** -10,
      'genomeSize': 2800000,
      'capacity': 100000,
      'repetitions': 1,
      'combos': "1"
    });
  }

}

export default SimForm;