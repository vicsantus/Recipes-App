const recommendationFetch = (pathname) => {
  let url = '';
  if (pathname === 'meals') {
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const request = fetch(url)
      .then((response) => response.json())
      .then((data) => data.drinks)
      .catch((error) => console.error(error));
    return request;
  }
  if (pathname === 'drinks') {
    url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const request = fetch(url)
      .then((response) => response.json())
      .then((data) => data.meals)
      .catch((error) => console.error(error));
    return request;
  }
};

export default recommendationFetch;
