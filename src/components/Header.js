import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const btnToHidden = ['/profile', '/done-recipes', '/favorite-recipes'];

  const history = useHistory();

  const titleName = history.location.pathname.split('/')[1];
  const a = btnToHidden.includes(history.location.pathname);

  const [searchBar, setSearchBar] = useState(false);
  const [search, setSearch] = useState('');
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
