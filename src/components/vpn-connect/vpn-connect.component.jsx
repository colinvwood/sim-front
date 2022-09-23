import './vpn-connect.styles.css';

import { useState } from 'react';

const VpnConnect = (props) => {

  const [formValues, setFormValues] = useState({});

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
        
        <input type="submit" value="submit" />
      </form>
    </div>
  )

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch('https://www.colinwood.dev/express/vpn-connect', {
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

export default VpnConnect;