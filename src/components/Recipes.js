import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ApiContext from '../context/ApiContext';
import Footer from './Footer';
import Header from './Header';

export default function Recipes() {
  const [apiResult, setApiResult] = useState();
  const [resultCategs, setResultCategs] = useState(null);
  const [actualCateg, setActualCateg] = useState('All');
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

  const mgxFour = 4;
  let allCategoriesRepeat = [];
  if (resultCategs) {
    allCategoriesRepeat = testPath
      ? resultCategs.meals.map((cat) => cat.strCategory)
      : resultCategs.drinks.map((cat) => cat.strCategory);
  }
  const fiveCategories = [...new Set(allCategoriesRepeat)]
    .filter((_fd, idx) => idx <= mgxFour);

  useEffect(() => {
    const makeFetch = async () => {
      const responseMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const jsonM = await responseMeals.json();
      const jsonD = await responseDrinks.json();
      setApiResult({ meals: jsonM.meals, drinks: jsonD.drinks });
    };
    makeFetch();
  }, []);

  useEffect(() => {
    const makeFetch = async () => {
      const responseMeals = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const jsonM = await responseMeals.json();
      const jsonD = await responseDrinks.json();
      setResultCategs({ meals: jsonM.meals, drinks: jsonD.drinks });
    };
    makeFetch();
  }, []);

  const handleClickCateg = async ({ target }) => {
    if (target.name !== 'All' && actualCateg !== target.name) {
      setActualCateg(target.name);
      const urlMeals = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.name}`;
      const urlDrinks = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.name}`;
      const foods = await fetch(testPath ? urlMeals : urlDrinks);
      const jsonFood = await foods.json();
      if (testPath) {
        setApiResult({ ...apiResult, meals: jsonFood.meals });
      } else {
        setApiResult({ ...apiResult, drinks: jsonFood.drinks });
      }
    } else {
      setActualCateg('All');
      const responseMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const jsonM = await responseMeals.json();
      const jsonD = await responseDrinks.json();
      setApiResult({ meals: jsonM.meals, drinks: jsonD.drinks });
    }
  };

  useEffect(() => {
    states.setApis(apiResult);
  }, [apiResult, states]);

  return (
    <>
      <Header hasInfo={ capturaMesmo } />
      <div>
        <button
          onClick={ handleClickCateg }
          name="All"
          type="button"
          data-testid="All-category-filter"
        >
          All
        </button>
        {fiveCategories?.map((categ) => (
          <button
            type="button"
            name={ categ }
            key={ categ }
            onClick={ handleClickCateg }
            data-testid={ `${categ}-category-filter` }
          >
            {categ}
          </button>
        ))}
        {
          !hasInfo && (
            <div>
              {foodsDoze?.map((foods, idx) => (
                <Link
                  key={ idx }
                  to={ `/${testPath ? 'meals' : 'drinks'}`
                      + `/${!testPath ? foods.idDrink : foods.idMeal}` }
                >
                  <div data-testid={ `${idx}-recipe-card` }>
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
                </Link>
              ))}
            </div>
          )
        }
      </div>
      <Footer />
    </>
  );
}
