import React, { Fragment, useState, useEffect } from "react";
import './App.css';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

//components
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";


function App() {

  

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:4000/api/v1/auth/verify/", {
        method: "GET",
        headers: { jwt_token : localStorage.token }
      }); 

      const parseRes = await response.json();
      //parseRes === true ? setIsAuthenticated(true) : 
      //setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth()
  })

    const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

    return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={props =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={props =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
