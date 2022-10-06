import LoadingAnimation from '../additional/loading-animation.component.jsx';
import Notification from '../additional/notification.component.jsx';

import { useState } from 'react';

const VpnConnect = (props) => {

  const [formValues, setFormValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [badLogin, setBadLogin] = useState(false);

  return (
    <div>
      <h1>Login to NAU Vpn</h1>

      <form onSubmit={handleSubmit}>
        <ul>
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
        </ul>
        
        <input type="submit" value="Submit" />
        <button onClick={clearForm}>
          Reset
        </button>
        <LoadingAnimation loading={loading} />
      </form>

      <Notification 
        hide={!submitted} 
        message={"Successfully connected to vpn."} 
        color={"green"}
      />
      <Notification
        hide={!badLogin}
        message={"Timed out. Credentials incorrect or forgot push \
                  notification. Please try again."}
        color={"orange"}
      />
    </div>
  )

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setBadLogin(false);

    try {
      const response = await fetch('https://www.colinwood.dev/express/vpn-connect', {
        method: 'POST', 
        body: JSON.stringify(formValues),
        headers: {
          'Content-Type': 'application/json'
        },  
      });

      const status = await response.json();
      console.log("response status: ", status);
      setLoading(false);
      if (status.status == 'success') {
        setSubmitted(true);
      } else if (status.status == 'error') {
        setBadLogin(true);
      }
      clearForm(event);
      
    } catch (error) {
      setLoading(false);
      clearForm(event);
      console.log("Error logging into vpn. ", error);
    }
  }

  async function handleInputChange(event) {
    event.preventDefault();
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }

  async function clearForm(event) {
    event.preventDefault();
    setFormValues({});
  }
}

export default VpnConnect;