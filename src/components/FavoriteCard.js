import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import clipboardCopy from 'clipboard-copy';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteCard(data) {
  const [copied, setCopied] = useState(false);
  const { id, idx, image, name, type, category, nationality,
    alcoholicOrNot, setFavorites } = data;

  const descriptionRender = () => {
    if (type === 'drink') {
      return <p>{alcoholicOrNot}</p>;
    }
    return (<p>{`${nationality} - ${category}`}</p>);
  };

  const unFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavs = favorites.filter((el) => el.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
    setFavorites(newFavs);
  };

  const toClipboard = () => {
    const threeSeconds = 3000;
    setCopied(true);
    setTimeout(() => setCopied(false), threeSeconds);
    copy(`http://localhost:3000/${type}s/${id}`);
  };

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          data-testid={ `${idx}-horizontal-image` }
          src={ image }
          alt={ name }
          className="favoritesIMG"
        />

      </Link>
      <div>
        <Link to={ `/${type}s/${id}` }>
          <h2 data-testid={ `${idx}-horizontal-name` }>{name}</h2>

        </Link>
        <p data-testid={ `${idx}-horizontal-top-text` }>
          {descriptionRender()}
        </p>
      </div>
      <div>
        <button type="button" onClick={ unFavorite }>
          <img
            data-testid={ `${idx}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt="black-heart"
          />
        </button>
        <button type="button" onClick={ toClipboard }>
          <img
            data-testid={ `${idx}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share-icon"
          />
        </button>
      </div>
      {
        copied && <span> Link copied</span>
      }

    </div>
  );
}

export default FavoriteCard;
