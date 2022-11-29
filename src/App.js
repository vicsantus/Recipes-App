import React, { useMemo, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Recipes from './components/Recipes';
import ApiContext from './context/ApiContext';

function App() {
  const [apis, setApis] = useState('');

  const states = useMemo(() => ({
    apis, setApis,
  }), [apis]);

  return (
    <ApiContext.Provider value={ states }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/meals">
            <Recipes />
          </Route>
          <Route exact path="/drinks">
            <Recipes />
          </Route>
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  );
}

export default App;
