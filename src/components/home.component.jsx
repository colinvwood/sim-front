import { Routes, Route, Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <div>
      <h1>Home Page of Sim Front: {props.hi}</h1>

      <Link to="/sim">
        Start a new simulation
      </Link>
      <Link to="/data">
        Retrieve a simulation's data
      </Link>
    </div>

  )

}

export default Home;