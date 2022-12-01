import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ApiContext from '../context/ApiContext';
import Header from './Header';

export default function Recipes() {
  const [apiResult, setApiResult] = useState();
  const history = useHistory();
  const { location: { pathname } } = history;
  const states = useContext(ApiContext);
  const testPath = pathname === '/meals';
  let food = [];
  let foodsDoze = [];

  const [hasInfo, setHasInfo] = useState(false);

  const capturaMesmo = (param) => {
    setHasInfo(param);
  };

  if (apiResult) {
    food = history.location.pathname === '/meals'
      ? [...apiResult.meals] : [...apiResult.drinks];
    const mgxEleven = 11;
    foodsDoze = food.filter((_fd, idx) => idx <= mgxEleven);
  }

  useEffect(() => {
    const makeFetch = async () => {
      try {
        const responseMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const jsonM = await responseMeals.json();
        const jsonD = await responseDrinks.json();
        setApiResult({ meals: jsonM.meals, drinks: jsonD.drinks });
      } catch (e) {
        console.error(`Aconteceu algum erro na chamada da API: ${e}`);
      }
    };
    makeFetch();
  }, []);

  useEffect(() => {
    states.setApis(apiResult);
  }, [apiResult, states]);

  return (
    <div>
      <Header hasInfo={ capturaMesmo } />
      {
        !hasInfo && (

          <div>
            {foodsDoze && foodsDoze.map((foods, idx) => (
              <div key={ idx } data-testid={ `${idx}-recipe-card` }>
                <img
                  style={ { width: '75px' } }
                  data-testid={ `${idx}-card-img` }
                  src={ testPath ? foods.strMealThumb : foods.strDrinkThumb }
                  alt={ testPath ? foods.idMeal : foods.idDrinks }
                />
                <p data-testid={ `${idx}-card-name` }>
                  { testPath ? foods.strMeal : foods.strDrink}
                </p>
              </div>
            ))}
          </div>
        )
      }

    </div>
  );
}
