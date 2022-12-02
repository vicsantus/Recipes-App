import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function RecipeDetails() {
  const history = useHistory();
  const [apiResponse, setApiResponse] = useState(null);
  const [ingreds, setIngreds] = useState([]);
  const [measure, setMeasure] = useState([]);
  const { location: { pathname } } = history;
  const mOrD = pathname.includes('/meals/');
  const idPath = JSON.parse(pathname
    .replace(mOrD ? '/meals/' : '/drinks/', ''));

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
      console.log(apiResponse);
      setIngreds(ingreExistNotNull);
      setMeasure(measuExistNotNull);
    }
  }, [apiResponse]);

  // console.log(apiResponse);

  return (
    <div>
      {apiResponse?.map((food, idx) => (
        <section key={ idx }>
          <img
            data-testid="recipe-photo"
            src={ mOrD ? food.strMealThumb : food.strDrinkThumb }
            alt={ mOrD ? food.strMealThumb : food.strDrinkThumb }
          />
          <h1 data-testid="recipe-title">{mOrD ? food.strMeal : food.strDrink }</h1>
          <h2 data-testid="recipe-category">{food.strCategory}</h2>
          <ul>
            Ingredientes
            {ingreds?.map((item, idxx) => (
              <li
                data-testid={ `${idxx}-ingredient-name-and-measure` }
                key={ idxx }
              >
                {item}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{food.strInstructions}</p>
          {mOrD && (<iframe
            width="560"
            height="315"
            src={ food.strYoutube }
            title="YouTube video player"
            frameBorder="0"
            allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            data-testid="video"
          />)}
        </section>
      ))}
    </div>
  );
}

export default RecipeDetails;
