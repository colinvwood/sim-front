import { Routes, Route, Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <div>
      
      <h1>Home Page of Sim Front: {props.hi}</h1>
      <ul>
        <li>
          <Link to="/sim">
            Start a new simulation
          </Link>
        </li>
        <li>
          <Link to="/data">
            Retrieve a simulation's data
          </Link>
        </li>
        <li>
          <Link to="/vpn-connect">
            Login to the vpn
          </Link>
        </li>
      </ul>
      
    </div>

  )

}

export default Home;