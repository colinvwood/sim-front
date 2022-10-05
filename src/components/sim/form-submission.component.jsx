import './form-submission.styles.css';

const FormSubmissionStatus = (props) => { 
  if (!props.submissionStatus) {
    return null;
  } 

  return (
    <span id="submission-message">
      <p>Simulation submitted successfully.</p>
    </span>
  )
}

export default FormSubmissionStatus;