import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import CardInfoContext from '../context/CardInfoContext';
import CardInfoDrinks from './CardInfoDrinks';
import CardInfoMeals from './CardInfoMeals';
import '../styles/SearchBar.css';

export default function SearchBar({
  searchBar,
  search,
  setSearchFor,
  setSearch,
  searchSame,
  resultSearch }) {
  const history = useHistory();
  return (
    <div>
      {
        searchBar && (
          <div>
            <div className="textInputId">
              <input
                className="textInput"
                type="text"
                name="search"
                value={ search }
                data-testid="search-input"
                onChange={ ({ target }) => setSearch(target.value) }
              />
            </div>
            <div>
              <div className="labelInputId">
                <label htmlFor="ingredient">
                  <input
                    className="inputId"
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
                    className="inputId"
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
                    className="inputId"
                    type="radio"
                    name="search-for"
                    id="first-letter"
                    value="first-letter"
                    onClick={ (e) => setSearchFor(e.target.value) }
                    data-testid="first-letter-search-radio"
                  />
                  First Letter
                </label>
              </div>
              <div className="btnSearchId">
                <button
                  className="btnSearch"
                  type="button"
                  data-testid="exec-search-btn"
                  onClick={ () => searchSame() }
                >
                  Search
                </button>
              </div>
            </div>
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

SearchBar.propTypes = {
  resultSearch: PropTypes.shape({}).isRequired,
  search: PropTypes.string.isRequired,
  searchBar: PropTypes.bool.isRequired,
  searchSame: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  setSearchFor: PropTypes.func.isRequired,
};
