import React from 'react';
import axios from 'axios';
import utils from '../utils/notifications';
import firebase from '../database/db.js';


class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: props.userId,
      user: '-LOPS342YelDQCwBafda',
      projects: []
    }
  }

  componentDidMount() {
    this.getUserProjects(this.state.user);
  }
  
  getUserProjects(userId) {
    console.log(this)
    var ref = firebase.database().ref();
    var usersRef = ref.child('users');
    var projectsRef = ref.child('projects');
    const that = this;
    
    usersRef.child(this.state.user).once('value')
      .then((snapshot) => {
        const projects = snapshot.val().projects.creator;
        return projects;
      })
      .then((projects) => {
        const projectsArray = [];
        for (var project in projects) {
          projectsArray.push(project);
        }
        that.setState({projects: projectsArray});
      })
      
      
      // console.log(projectsArray);

  }

  render() {
    return (
      this.state.projects.map((project) => {
        return <li>{project}</li>;
      })
    )
  }
}

export default ProfileView;