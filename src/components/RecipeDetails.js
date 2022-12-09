import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
// import ApiContext from '../context/ApiContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHaertIcon from '../images/whiteHeartIcon.svg';
import favoriteToStorage from '../services/favoriteToStorage';
import useApiResponse from './hooks/recipeDetails/useApiResponse';
import useCopieFav from './hooks/recipeDetails/useCopieFav';
import inProgressRecipe from '../services/inProgressRecipe';
import doneRecipe from '../services/doneRecipe';

const six = 6;

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const mOrD = pathname.includes('/meals/');
  const idPath = JSON.parse(pathname
    .replace(mOrD ? '/meals/' : '/drinks/', ''));
  // const states = useContext(ApiContext);
  const {
    apiResponse,
    ingreds,
    measure,
    youTubeId,
    nameToMap,
    recommendation,
  } = useApiResponse({ idPath, pathname, mOrD });
  const {
    copied,
    favorite,
    setFavorite,
    shareRecipe,
  } = useCopieFav({ pathname });

  const [inProgress, setInProgress] = useState(false);
  const [idDone, setIsDone] = useState(false);

  useEffect(() => {
    if (apiResponse !== null) {
      const namePath = pathname.split('/');
      if (namePath[1] === 'meals') {
        const favoriteLocal = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
        const compare = apiResponse[0];
        const verify = favoriteLocal.some((item) => item.name === compare.strMeal);
        setFavorite(verify);
      }
      if (namePath[1] === 'drinks') {
        const favoriteLocal = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
        const compare = apiResponse[0];
        const verify = favoriteLocal.some((item) => item.name === compare.strDrink);
        setFavorite(verify);
      }
    }
  }, [apiResponse, pathname, setFavorite]);

  useEffect(() => {
    if (apiResponse) {
      const doneReci = doneRecipe(apiResponse[0]);
      setIsDone(doneReci);
      const a = inProgressRecipe(apiResponse[0]);
      setInProgress(a);
    }
  }, [apiResponse]);

  // useEffect(() => {
  //   if (apiResponse && ingreds.length > 0 && measure.length > 0 && !states.recipe) {
  //     states.setRecipe({
  //       apiResponse,
  //       ingreds,
  //       measure,
  //       mOrD,
  //       youTubeId,
  //       nameToMap,
  //       pathname,
  //       favorite,
  //       setFavorite,
  //     });
  //   }
  //   if (states.recipe !== null && states.recipe?.favorite !== favorite) {
  //     states.setRecipe({
  //       ...states.recipe,
  //       favorite,
  //     });
  //   }

  //   console.log(states.recipe);
  // }, [apiResponse,
  //   ingreds,
  //   measure,
  //   mOrD,
  //   youTubeId,
  //   nameToMap,
  //   pathname,
  //   favorite,
  //   setFavorite,
  //   states]);

  return (
    <div>
      {apiResponse?.map((food, idx) => (
        <section key={ idx }>
          <img
            style={ { width: '175px' } }
            data-testid="recipe-photo"
            src={ mOrD ? food.strMealThumb : food.strDrinkThumb }
            alt={ mOrD ? food.strMealThumb : food.strDrinkThumb }
          />
          <h1 data-testid="recipe-title">{mOrD ? food.strMeal : food.strDrink }</h1>
          <h2
            data-testid="recipe-category"
          >
            {mOrD ? food.strCategory : (`${food.strCategory} ${food.strAlcoholic}`)}
          </h2>
          <ul>
            Ingredientes
            {ingreds?.map((item, idxx) => (
              <li
                data-testid={ `${idxx}-ingredient-name-and-measure` }
                key={ idxx }
              >
                {`${measure[idxx]} ${item}`}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{food.strInstructions}</p>
          {mOrD && (
            <iframe
              src={ `https://www.youtube.com/embed/${youTubeId}` }
              title="YouTube video player"
              data-testid="video"
            />
          )}
        </section>
      ))}
      <div>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ shareRecipe }
        >
          <img src={ shareIcon } alt="alt" />
        </button>

        <button
          type="button"
          onClick={ () => {
            favoriteToStorage(apiResponse[0], nameToMap);
            setFavorite(!favorite);
          } }
        >
          <img
            src={ !favorite ? whiteHaertIcon : blackHeartIcon }
            alt="favorite icon"
            data-testid="favorite-btn"
          />

        </button>

        {copied && (<span>Link copied!</span>)}
      </div>
      <div className="container">
        <div className="carousel">
          {
            recommendation.slice(0, six).map((item, index) => (

              <div
                key={ index }
                data-testid={ `${index}-recommendation-card` }
                className="item"
              >
                <div className="image">
                  <img
                    src={ item[`str${nameToMap}Thumb`] }
                    alt="drink thumb"
                  />
                </div>
                <div className="info">
                  <p
                    className="name"
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {item[`str${nameToMap}`]}
                  </p>
                </div>
              </div>

            ))
          }
        </div>
      </div>
      {!idDone && (
        <div>
          <button
            className="btnStartCont"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
          >
            {inProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </div>
      )}

    </div>
  );
}

export default RecipeDetails;
