import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


const VpnStatus = (props) => {

  const [vpnStatus, setVpnStatus] = useState(-1);

  useEffect(() => {
    const checkVpn = async () => {
      var response = await fetch('https://www.colinwood.dev/express/check-vpn', {
        method: 'GET',   
      });
      response = await response.json();
      var vpnIsConnected = response.vpnStatus;
      if (vpnIsConnected) {
        setVpnStatus(1);
      } else {
        setVpnStatus(0);
      }
    }

    try {
      checkVpn();
    }
    catch (error) {
      console.log("Error checking vpn status. ", error);
    }
    
  }, []);

  // fetch has not completed yet
  if (vpnStatus == -1) {
    return null;
  }

  var message;
  if (vpnStatus == 1) {
    message = (
      <span id="connected-message">
        <p>You are logged into the vpn.</p>
      </span>
    )
  } else if (vpnStatus == 0) {
    message = (
      <span id="not-connected-message">
        <p>You are not logged into the vpn. Do that first{' '}
          <Link to="/vpn-connect"> 
           here.
          </Link>
        </p>
      </span> 
    );
  }

  return (
    <div>
      {message}
    </div>
  )

}

export default VpnStatus;