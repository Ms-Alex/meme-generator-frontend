import React, { Component } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import NavBar from './components/NavBar'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import AddMeme from './components/AddMeme'
import EditMeme from './components/EditMeme'
import generateAdapter from './Adapter'

const usersAPI = 'http://localhost:4000/api/v1/users'
const memesAPI = 'http://localhost:4000/api/v1/memes'

class App extends Component {
  state = {
    users: [],
    currentUser: '',
    toMain: false,
    allMemes: [],
  }

  componentDidMount = () => {
    this.getAllUsers()
    this.getAllMemes()
  }

  getAllUsers = () => {
    generateAdapter(usersAPI).index(data => this.setState({
      users: data
    }))
  }

  getAllMemes = () => {
    generateAdapter(memesAPI).index(data => this.setState({
      allMemes: data
    }))
  }

  createUser = (name) => {
    generateAdapter(usersAPI).create({username: name}, data => this.setState({
      currentUser: data, 
      toMain: true
    }))
  }

  // EVENT LISTENERS
  onLoginSubmit = (username) => {
    let user = this.state.users.find(user => user.username.toLowerCase() === username.toLowerCase())

    if(!user) {
      this.createUser(username);
    } else {
      this.setState({ currentUser: user, toMain: true })
    }
  }

  handleExitClick = () => {
    this.setState({
      currentUser: '', 
      toMain: false,
    })
  }

  // HELPER FUNCTS
  redirectMain = () => {
    if (this.state.toMain === true) {
      return <Redirect to="/main" />
    }
  }

  showView = () => {
    // console.log(this.state.currentUser)
    if (this.state.currentUser !== '') {
      return <NavBar handleClick={this.handleExitClick} />
    }
  }

  addMemeToState = (memeObj) => {
    let currentMemes = this.state.allMemes
    this.setState({
      allMemes: [...currentMemes, memeObj]
    })
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          {this.redirectMain()}
          {this.showView()}

          <Route exact path="/" render={ routerProps => <Login {...routerProps} onLoginSubmit={this.onLoginSubmit} /> } />

          <Route exact path="/main" component={routerProps => <Home user={this.state.currentUser} allMemes={this.state.allMemes} /> } />

          <Route exact path="/profile" render={ routerProps => <Profile user={this.state.currentUser} allMemes={this.state.allMemes} /> } />

          <Route exact path="/add-meme" render={ routerProps => <AddMeme user={this.state.currentUser} addMemeToState={this.addMemeToState} />} />

          <Route exact path="/edit-meme" render={ routerProps => <EditMeme user={this.state.currentUser}  /> } />

        </React.Fragment>
      </Router>
    );
  }
}

export default App;
