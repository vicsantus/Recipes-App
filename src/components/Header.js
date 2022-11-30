import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import mealsFetchInput from '../services/mealsFetchInput';

function Header() {
  const btnToHidden = ['/profile', '/done-recipes', '/favorite-recipes'];

  const history = useHistory();

  const titleName = history.location.pathname.split('/')[1];
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
      mealsFetchInput(search, searchFor).then((res) => setresultSearch(res));
    }
    // if (history.location.pathname === '/meals') {

    // }
  };

  useEffect(() => {
    console.log(resultSearch);
  }, [resultSearch]);

  return (
    <div>
      <h1>{titleName}</h1>
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIcon } alt="profile icon" />
      </button>

      {
        !a && (
          <button
            type="button"
            data-testid="search-top-btn"
            onClick={ () => (!searchBar ? setSearchBar(true) : setSearchBar(false)) }
          >
            <img src={ searchIcon } alt="search icon" />
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
          </div>
        )
      }
    </div>
  );
}

export default Header;
