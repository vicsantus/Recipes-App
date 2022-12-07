import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import ApiContext from '../context/ApiContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHaertIcon from '../images/whiteHeartIcon.svg';
import favoriteToStorage from '../services/favoriteToStorage';
import useApiResponse from './hooks/recipeDetails/useApiResponse';
import useCopieFav from './hooks/recipeDetails/useCopieFav';
// import useApiResponse from './hooks/recipeDetails/useApiResponse';

function RecipeInProgress() {
  // const states = useContext(ApiContext);

  const history = useHistory();
  const { location: { pathname } } = history;
  const mOrD = pathname.includes('/meals/');
  const idPath = JSON.parse(pathname
    .replace('/in-progress', '')
    .replace(mOrD ? '/meals/' : '/drinks/', ''));
  const pathWithOutProg = pathname.replace('/in-progress', '');
  const [ingredCheck, setIngredCheck] = useState([]);
  const {
    apiResponse,
    ingreds,
    measure,
    youTubeId,
    nameToMap,
  } = useApiResponse({ idPath, pathname, mOrD });
  const btnOk = ingreds.length === ingredCheck.length;
  // const {
  //   favorite,
  //   setFavorite,
  // } = states.recipe;
  const {
    copied,
    favorite,
    setFavorite,
    shareRecipe,
  } = useCopieFav({ pathname: pathWithOutProg });

  const onChecked = ({ target, idxx }) => {
    if (target.checked) {
      setIngredCheck([
        ...ingredCheck,
        idxx,
      ]);
    } else {
      const ingWithOutThis = ingredCheck.filter((idx) => idx !== idxx);
      setIngredCheck(ingWithOutThis);
    }
  };

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!local || local.length === 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(ingredCheck));
    } else if (local !== ingredCheck && ingredCheck.length !== 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(ingredCheck));
    } else {
      setIngredCheck(local);
    }
  }, [ingredCheck]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const idsLocal = local?.map((objs) => objs.id);
    if (idsLocal?.includes(JSON.stringify(idPath))) {
      setFavorite(true);
    }
  }, [apiResponse, idPath, setFavorite]);

  const clickFinish = () => {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    const date = new Date();
    const doneRec = {
      id: mOrD ? apiResponse[0].idMeal : apiResponse[0].idDrink,
      type: mOrD ? 'meal' : 'drink',
      nationality: !apiResponse[0]?.strArea ? '' : apiResponse[0]?.strArea,
      category: apiResponse[0]?.strCategory !== null ? apiResponse[0]?.strCategory : '',
      alcoholicOrNot: !mOrD ? apiResponse[0]?.strAlcoholic : '',
      name: mOrD ? apiResponse[0]?.strMeal : apiResponse[0]?.strDrink,
      image: mOrD ? apiResponse[0]?.strMealThumb : apiResponse[0]?.strDrinkThumb,
      doneDate: date.toISOString(),
      tags: apiResponse[0]?.strTags !== null
        ? apiResponse[0]?.strTags.split(',') : [],
    };
    // `${newDate[2]}/${newDate[1]}/${newDate[0]} - ${newDate[3]}:${newDate[4]}`
    console.log(doneRec);
    if (!local || local.length === 0) {
      localStorage.setItem('doneRecipes', JSON.stringify([doneRec]));
    } else if (!local.includes(doneRec)) {
      localStorage.setItem('doneRecipes', JSON.stringify([...local, doneRec]));
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify([]));
  };

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
          <h1
            data-testid="recipe-title"
          >
            {mOrD ? food.strMeal : food.strDrink }
          </h1>
          <h2
            data-testid="recipe-category"
          >
            {mOrD ? food.strCategory : (`${food.strCategory} ${food.strAlcoholic}`)}
          </h2>
          {!mOrD && (
            <h2>{food.strAlcoholic}</h2>
          )}
          Ingredientes
          <aside>
            {ingreds?.map((ingred, idxx) => (
              <label
                data-testid={ `${idxx}-ingredient-step` }
                key={ idxx }
                htmlFor={ `ingredient ${idxx + 1}` }
                onChange={ ({ target }) => onChecked({ target, idxx }) }
                style={ ingredCheck?.includes(idxx)
                  ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                  : { textDecoration: 'none solid rgb(0, 0, 0)' } }
              >
                <input
                  id={ `ingredient ${idxx + 1}` }
                  checked={ !!ingredCheck?.includes(idxx) }
                  type="checkbox"
                />
                {`${measure[idxx]} ${ingred}`}
                {console.log(apiResponse[0]?.strTags)}
              </label>
            ))}
          </aside>
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
      <div>
        <button
          className="btnFinishCont"
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ () => {
            clickFinish();
            history.push('/done-recipes');
          } }
          disabled={ !btnOk }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeInProgress;
