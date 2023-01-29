import React, { useState, useEffect } from 'react';
import Header from './Header';
import FavoriteCard from './FavoriteCard';
import '../styles/FavoriteRecipes.css';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [filterName, setFilterName] = useState('all');

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const filterFavorites = () => (
    filterName === 'all' ? favorites : favorites.filter(({ type }) => type === filterName)
  );

  const favoritesFiltered = filterFavorites();

  return (
    <div className="btnFavoriteRecipes">
      <Header />
      <div>
        <button
          className="buttonAll"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilterName('all') }
        >
          All
        </button>
      </div>
      <div>
        <button
          className="buttonMeals"
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => setFilterName('meal') }
        >
          Meals
        </button>
      </div>
      <div>
        <button
          className="buttonDrinks"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilterName('drink') }
        >
          Drinks
        </button>
      </div>
      {favoritesFiltered && favoritesFiltered.map((el, idx) => (
        <FavoriteCard
          key={ el.name }
          idx={ idx }
          setFavorites={ setFavorites }
          { ...el }
        />
      ))}
    </div>
  );
}

export default FavoriteRecipes;
