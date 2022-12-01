import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ApiContext from '../context/ApiContext';
import CardInfoContext from '../context/CardInfoContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import drinksFetchInput from '../services/drinksFetchInput';
import mealsFetchInput from '../services/mealsFetchInput';
import CardInfoDrinks from './CardInfoDrinks';
import CardInfoMeals from './CardInfoMeals';

function Header() {
  const states = useContext(ApiContext);

  const btnToHidden = ['/profile', '/done-recipes', '/favorite-recipes'];

  const history = useHistory();

  const titleName = history.location.pathname.split('/')[1];
  const titleWithOutSlash = titleName.replace('-', ' ').split(' ');
  const titleCorrectly = titleWithOutSlash
    .map((ttl) => `${ttl.charAt(0).toUpperCase() + ttl.slice(1)} `);
  const a = btnToHidden.includes(history.location.pathname);

  const [searchBar, setSearchBar] = useState(false);
  const [search, setSearch] = useState('');
  const [searchFor, setSearchFor] = useState('');
  const [resultSearch, setresultSearch] = useState([]);

  const searchSame = () => {
    if (search.length > 1 && searchFor === 'first-letter') {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (history.location.pathname === '/meals') {
      mealsFetchInput(search, searchFor)
        .then((res) => setresultSearch(res));
      if (resultSearch?.length === 0) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
    if (history.location.pathname === '/drinks') {
      drinksFetchInput(search, searchFor).then((res) => setresultSearch(res));
      if (resultSearch?.length === 0) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
  };

  useEffect(() => {
    states.capturaMesmo(resultSearch?.length > 0);

    if (history.location.pathname === '/meals' && resultSearch?.length === 1) {
      history.push(`/meals/${resultSearch[0].idMeal}`);
    }
    if (history.location.pathname === '/drinks' && resultSearch?.length === 1) {
      history.push(`/drinks/${resultSearch[0].idDrink}`);
    }
  }, [resultSearch, history, states]);

  return (
    <div>
      <h1 data-testid="page-title">{titleCorrectly}</h1>
      <Link to="/profile">
        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </Link>

      {
        !a && (
          <button
            type="button"
            onClick={ () => (!searchBar ? setSearchBar(true) : setSearchBar(false)) }
          >
            <img
              src={ searchIcon }
              alt="search icon"
              data-testid="search-top-btn"
            />
          </button>
        )
      }

      {
        searchBar && (
          <div>
            <input
              type="text"
              name="search"
              value={ search }
              data-testid="search-input"
              onChange={ ({ target }) => setSearch(target.value) }
            />
            <label htmlFor="ingredient">
              <input
                type="radio"
                name="search-for"
                id="ingredient"
                value="ingredient"
                onClick={ (e) => setSearchFor(e.target.value) }
                data-testid="ingredient-search-radio"
              />
              Ingredient
            </label>
            <label htmlFor="name">
              <input
                type="radio"
                name="search-for"
                id="name"
                value="name"
                onClick={ (e) => setSearchFor(e.target.value) }
                data-testid="name-search-radio"
              />
              Name
            </label>
            <label htmlFor="first-letter">
              <input
                type="radio"
                name="search-for"
                id="first-letter"
                value="first-letter"
                onClick={ (e) => setSearchFor(e.target.value) }
                data-testid="first-letter-search-radio"
              />
              First Letter
            </label>
            <button
              type="button"
              data-testid="exec-search-btn"
              onClick={ () => searchSame() }
            >
              Search
            </button>

            <div>
              {
                history.location.pathname === '/meals' && (
                  <CardInfoContext.Provider value={ resultSearch }>
                    <CardInfoMeals />
                  </CardInfoContext.Provider>
                )
              }
            </div>
            <div>
              {
                history.location.pathname === '/drinks' && (
                  <CardInfoContext.Provider value={ resultSearch }>
                    <CardInfoDrinks />
                  </CardInfoContext.Provider>
                )
              }
            </div>

          </div>
        )
      }
    </div>
  );
}

// Header.propTypes = {
//   hasInfo: PropTypes.func.isRequired,
// };

export default Header;
