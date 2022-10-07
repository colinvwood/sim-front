import Notification from './notification.component.jsx';

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
    message = <Notification 
                hide={false} 
                message={"You are connected to the vpn."}
                color={"green"}
              />;
  } else if (vpnStatus == 0) {
    const children = <p>Do that first <Link to="/simulation/vpn-connect">here.</Link></p>;
    message = <Notification 
                hide={false} 
                message={"You are not connected to the vpn."}
                color={"orange"}
                children={children}
              />;
  }
  

  return (
    <div>
      {message}
    </div>
  )

}

export default VpnStatus;