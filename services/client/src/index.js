import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import UsersList from './components/UsersList';
import AddUser from './components/AddUser';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      username: '',
      email: ''
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  async getUsers() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`);
      this.setState({ users: res.data.data.users });
    } catch (err) {
      console.log(err);
    }
  }

  async addUser(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email
    };
    try {
      await axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data);
      this.getUsers();
      this.setState({ username: '', email: '' });
    } catch (err) {
      console.log(err);
    }
  }

  handleChange(event) {
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <br/>
              <h1 className="title is-1 is-1">All Users</h1>
              <hr/><br/>
              <AddUser 
                addUser={this.addUser.bind(this)}
                handleChange={this.handleChange.bind(this)}
                email={this.state.email}
                username={this.state.username}
              />
              <br/><br/>
              <UsersList users={this.state.users}/>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);
