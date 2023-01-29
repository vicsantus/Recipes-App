import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from './Header';
import '../styles/DoneRecipes.css';

const fiveSeconds = 5000;
function DoneRecipes() {
  const history = useHistory();

  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneRecipesFilter, setDoneRecipesFilter] = useState([]);
  const [doneRecipesShow, setDoneRecipesShow] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const doneRecipesInStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    console.log(doneRecipesInStorage);
    setDoneRecipes(doneRecipesInStorage);
    setDoneRecipesShow(doneRecipesInStorage);
  }, []);

  useEffect(() => {
    if (doneRecipesFilter.length > 0) {
      setDoneRecipesShow(doneRecipesFilter);
    }
  }, [doneRecipesFilter]);
  const shareRecipe = async ({ target }) => {
    setCopied(true);
    setTimeout(() => setCopied(false), fiveSeconds);
    await clipboardCopy(`http://localhost:3000${target.alt}`);
  };

  return (
    <div className="btnDoneRecipes">
      <Header />
      <div>
        <button
          className="buttonAll"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setDoneRecipesFilter(doneRecipes) }
        >
          All
        </button>
        <button
          className="buttonMeals"
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setDoneRecipesFilter(doneRecipes
            .filter((item) => item.type === 'meal')) }
        >
          Meals
        </button>
        <button
          className="buttonDrinks"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setDoneRecipesFilter(doneRecipes
            .filter((item) => item.type === 'drink')) }
        >
          Drinks
        </button>

      </div>
      {
        doneRecipesShow.map((item, index) => {
          if (item.type === 'meal') {
            return (
              <div key={ index }>

                <button
                  onClick={ ({ target }) => history.push(`/meals/${target.alt}`) }
                  type="button"
                >
                  <img
                    style={ { width: '175px' } }
                    data-testid={ `${index}-horizontal-image` }
                    src={ item.image }
                    alt={ item.id }
                  />
                </button>
                <button
                  onClick={ ({ target }) => history.push(`/meals/${target.id}`) }
                  type="button"
                >
                  <p
                    id={ item.id }
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {item.name}
                  </p>
                </button>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${item.nationality} - ${item.category}`}
                </p>
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {item.doneDate}
                </p>
                <p
                  data-testid={ `${0}-${item.tags[0]}-horizontal-tag` }
                >
                  {item.tags[0]}
                </p>
                <p
                  data-testid={ `${0}-${item.tags[1]}-horizontal-tag` }
                >
                  {item.tags[1]}
                </p>
                <button
                  type="button"
                  onClick={ (e) => shareRecipe(e) }
                >
                  <img
                    src={ shareIcon }
                    alt={ `/meals/${item.id}` }
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                {copied && (<span>Link copied!</span>)}
              </div>
            );
          } if (item.type === 'drink') {
            return (
              <div key={ index }>
                <button
                  type="button"
                  onClick={ ({ target }) => history.push(`/drinks/${target.alt}`) }
                >
                  <img
                    id={ item.id }
                    style={ { width: '175px' } }
                    data-testid={ `${index}-horizontal-image` }
                    src={ item.image }
                    alt={ item.id }
                  />
                </button>
                <button
                  type="button"
                  onClick={ ({ target }) => history.push(`/drinks/${target.id}`) }
                >
                  <p
                    id={ item.id }
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {item.name}
                  </p>
                </button>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {item.alcoholicOrNot}
                </p>
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {item.doneDate}
                </p>
                <button
                  type="button"
                  onClick={ (e) => shareRecipe(e) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt={ `/drinks/${item.id}` }
                  />
                </button>
                {copied && (<span>Link copied!</span>)}
              </div>
            );
          }
          return null;
        })
      }
    </div>
  );
}

export default DoneRecipes;
