import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import recommendationFetch from '../services/fetchRecom';
import '../App.css';

const six = 6;

function RecipeDetails() {
  const history = useHistory();
  const [apiResponse, setApiResponse] = useState(null);
  const [ingreds, setIngreds] = useState([]);
  const [measure, setMeasure] = useState([]);
  const { location: { pathname } } = history;
  const mOrD = pathname.includes('/meals/');
  const idPath = JSON.parse(pathname
    .replace(mOrD ? '/meals/' : '/drinks/', ''));

  const [youTubeId, setYouTubeId] = useState(null);
  const [recommendation, setRecommendation] = useState([]);
  const [nameToMap, setNameToMap] = useState('');

  useEffect(() => {
    const namePath = pathname.split('/');
    recommendationFetch(namePath[1]).then((res) => setRecommendation(res));
    if (namePath[1] === 'meals') {
      setNameToMap('Drink');
    }
    if (namePath[1] === 'drinks') {
      setNameToMap('Meal');
    }
  }, [pathname]);

  useEffect(() => {
    const makeFetch = async () => {
      let url = '';
      if (mOrD) {
        url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idPath}`;
      } else {
        url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idPath}`;
      }
      const fetched = await fetch(url);
      const json = await fetched.json();
      setApiResponse(mOrD ? json.meals : json.drinks);
    };
    makeFetch();
  }, [idPath, pathname, mOrD]);

  useEffect(() => {
    if (apiResponse) {
      const ingre = Object
        .keys(apiResponse[0])
        .map((item) => (item.includes('strIngredient') ? item : null));
      const ingreWithOutNull = ingre.filter((item) => item !== null);
      const ingreExist = ingreWithOutNull?.map((igd) => apiResponse[0][igd]);
      const ingreExistNotNull = ingreExist
        .filter((item) => (item !== null) && (item !== ''));

      const measu = Object
        .keys(apiResponse[0])
        .map((item) => (item.includes('strMeasure') ? item : null));
      const measuWithOutNull = measu.filter((item) => item !== null);
      const measuExist = measuWithOutNull?.map((igd) => apiResponse[0][igd]);
      const measuExistNotNull = measuExist.filter((item) => item !== null);
      setIngreds(ingreExistNotNull);
      setMeasure(measuExistNotNull);

      if (mOrD) {
        const a = apiResponse[0].strYoutube.split('=')[1];
        setYouTubeId(a);
      }
    }
  }, [apiResponse, mOrD]);

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
          {!mOrD && (
            <h2>{food.strAlcoholic}</h2>
          )}
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
      <div>
        <button
          className="btnStartCont"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
        >
          Start Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeDetails;
