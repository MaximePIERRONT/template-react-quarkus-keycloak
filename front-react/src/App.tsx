import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import User from './model/User';

function App() {
  const [user, setUser]= useState<User | undefined>();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
          'http://localhost:8080/user', { headers: { "Authorization": "Bearer " + localStorage.getItem("react-token") } }
      );
      setUser(result.data);
    };
    fetchData();
  }, []);


  return (
      <div className="App">
        <header className="App-header">
          <h1>Secure React App</h1>
          <div>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div>

            <h2>Response from Quarkus API: /user </h2>

            <p>Name: {user?.name}</p>
            <p>Email:{user?.email}</p>

          </div>
        </header>
      </div>
  );
}

export default App;
