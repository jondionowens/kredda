import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const ProjectForm = (props) => {
  return (
    <div>
      <TextField id="projectName" type="text" label="Project name" onChange={props.handleChange} /><br/>
      <TextField id="role" type="text" label="Your role" onChange={props.handleChange} /><br/>
      <TextField id="projectDescription" label="Project description" type="text" onChange={props.handleChange} /><br/><br/>
      <Button variant="contained" color="primary" onClick={props.handleSubmit}>Next</Button>
    </div>
  )
}

export default ProjectForm;