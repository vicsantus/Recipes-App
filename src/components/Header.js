import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const btnToHidden = ['/profile', '/done-recipes', '/favorite-recipes'];

  const history = useHistory();

  const titleName = history.location.pathname.split('/')[1];
  const titleWithOutSlash = titleName.replace('-', ' ').split(' ');
  const titleCorrectly = titleWithOutSlash
    .map((ttl) => `${ttl.charAt(0).toUpperCase() + ttl.slice(1)} `);
  const a = btnToHidden.includes(history.location.pathname);

  const [searchBar, setSearchBar] = useState(false);
  const [search, setSearch] = useState('');
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
          <input
            type="text"
            value={ search }
            data-testid="search-input"
            onChange={ ({ target }) => setSearch(target.value) }
          />
        )
      }
    </div>
  );
}

export default Header;
