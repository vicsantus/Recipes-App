const mealsFetchInput = (typed, param) => {
  let url = '';
  if (param === 'ingredient') {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${typed}`;
  }
  if (param === 'name') {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${typed}`;
  }
  if (param === 'first-letter') {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${typed}`;
  }

  const request = fetch(url)
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => console.error(error));
  return request;
};

export default mealsFetchInput;
