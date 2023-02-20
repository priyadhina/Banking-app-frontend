import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import { getToken, removeUserSession, setUserSession } from './helpers/Utils';

const App = () => {
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`http://localhost:4000/verifyToken?token=${token}`)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
      })
      .catch((error) => {
        removeUserSession();
      });
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/home" component={Layout} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
