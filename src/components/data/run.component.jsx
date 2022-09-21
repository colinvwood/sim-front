import './run.styles.css';

const Run = (props) => {

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
      <button id={props.data.runId}>Select</button>
    </div>
  )
}


export default Run;