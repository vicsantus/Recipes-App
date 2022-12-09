const inProgressRecipe = (arr) => {
  const inProgress = JSON.parse(localStorage.getItem('doneRecipes'));
  if (inProgress !== null && inProgress !== undefined) {
    // console.log(inProgress);
    // console.log(arr.idMeal);
    if (arr.strMeal) {
      const a = inProgress.some((item) => +item.id === +arr.idMeal);
      // console.log(a);
      return a;
    }
    if (arr.strDrink) {
      const a = inProgress.some((item) => +item.id === +arr.idDrink);
      return a;
    }
  }
};

export default inProgressRecipe;
