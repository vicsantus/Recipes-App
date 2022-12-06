const favoriteToStorage = (arrFav, namePath) => {
  if (namePath === 'Drink') {
    const favoriteLocal = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const verify = favoriteLocal.some((item) => item.name === arrFav.strMeal);
    if (verify) {
      const deleteFav = favoriteLocal.filter((item) => item.name !== arrFav.strMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(deleteFav));
    } else {
      favoriteLocal.push({
        id: arrFav.idMeal,
        type: 'meal',
        nationality: arrFav.strArea,
        category: arrFav.strCategory,
        alcoholicOrNot: '',
        name: arrFav.strMeal,
        image: arrFav.strMealThumb,
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteLocal));
    }
  }
  if (namePath === 'Meal') {
    const favoriteLocal = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const verify = favoriteLocal.some((item) => item.name === arrFav.strDrink);

    if (verify) {
      const deleteFav = favoriteLocal.filter((item) => item.name !== arrFav.strDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(deleteFav));
    } else {
      favoriteLocal.push({
        id: arrFav.idDrink,
        type: 'drink',
        nationality: '',
        category: arrFav.strCategory,
        alcoholicOrNot: arrFav.strAlcoholic,
        name: arrFav.strDrink,
        image: arrFav.strDrinkThumb,
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteLocal));
    }
  }
};

export default favoriteToStorage;
