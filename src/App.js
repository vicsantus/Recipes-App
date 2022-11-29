import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Recipes from './components/Recipes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/meals">
          <Recipes />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
