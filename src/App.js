import React, { useMemo, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import Login from './components/Login';
import Profile from './components/Profile';
import RecipeDetails from './components/RecipeDetails';
import RecipeInProgress from './components/RecipeInProgress';
import Recipes from './components/Recipes';
import ApiContext from './context/ApiContext';

function App() {
  const [apis, setApis] = useState('');

  const [hasInfo, setHasInfo] = useState(false);
  const capturaMesmo = (param) => {
    setHasInfo(param);
  };

  const states = useMemo(() => ({
    apis, setApis, hasInfo, setHasInfo, capturaMesmo,
  }), [apis, hasInfo]);

  return (
    <ApiContext.Provider value={ states }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Recipes } />
          <Route path="/meals/:id-da-receita" component={ RecipeDetails } />
          <Route
            path="/meals/:id-da-receita/in_progress"
            component={ RecipeInProgress }
          />
          <Route exact path="/drinks" component={ Recipes } />
          <Route path="/drinks/:id-da-receita" component={ RecipeDetails } />
          <Route
            path="/drinks/:id-da-receita/in_progress"
            component={ RecipeInProgress }
          />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  );
}

export default App;
