import React from 'react';
import axios from 'axios';
import utils from '../utils/notifications';
import firebase from '../database/db.js';
import _ from 'lodash';


class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: props.userId,
      user: '-LOPS342YelDQCwBafda',
      projects: [],
      isLoading: true
    }
  }

  componentDidMount() {
    const projects = this.getUserProjects(this.state.user);
    this.setState({projects: projects}, () => {
      setTimeout(() => {
        this.setState({isLoading: false});
      }, 1000)
    });
  }
  
  getUserProjects(userId) {
    var ref = firebase.database().ref();
    var usersRef = ref.child('users');
    var projectsRef = ref.child('projects');
    var projectsArray = [];
    const that = this;
    
    // Get all of the users projects ids
    usersRef.child(this.state.user).once('value')
      .then((snapshot) => {
        const projectsIds = snapshot.val().projects.creator;
        const projectsIdsArray = _.values(projectsIds);
        return projectsIdsArray;
      })

      // Use the project ids to get the project objects
      .then((projectsIdsArray) => {
        projectsIdsArray.forEach((projectId) => {
          projectsRef.child(projectId).once('value')
            .then((project) => {
              var value = project.val();
              projectsArray.push(value);
            })
        })
      })

      return projectsArray;
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>
    } else {
      return (
        this.state.projects.map((project) => {
          return <li>{project.projectName} | {project.description}</li>;
        })
      )
    }
  }

  
}

export default ProfileView;