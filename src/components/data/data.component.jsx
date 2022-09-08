import './data.styles.css';

import { useState, useEffect } from 'react';

const Data = (props) => {

  const [formValues, setFormValues] = useState({});

  return(

    <form onSubmit={handleSubmit}>
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

      <input type="submit" value="submit" />
    </form>
  )

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch('https://www.colinwood.dev/express/login', {
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

export default Data;