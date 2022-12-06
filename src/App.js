import React, { useMemo, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
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
  const [recipe, setRecipe] = useState(null);

  const [hasInfo, setHasInfo] = useState(false);
  const capturaMesmo = (param) => {
    setHasInfo(param);
  };

  const states = useMemo(() => ({
    apis, setApis, hasInfo, setHasInfo, capturaMesmo, recipe, setRecipe,
  }), [apis, hasInfo, recipe]);

  return (
    <ApiContext.Provider value={ states }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/meals/:id_da_receita" component={ RecipeDetails } />
          <Route
            exact
            path="/meals/:id_da_receita/in-progress"
            component={ RecipeInProgress }
          />
          <Route exact path="/drinks" component={ Recipes } />
          <Route exact path="/drinks/:id_da_receita" component={ RecipeDetails } />
          <Route
            exact
            path="/drinks/:id_da_receita/in-progress"
            component={ RecipeInProgress }
          />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  );
}

export default App;
