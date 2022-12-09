const inProgressRecipe = (arr) => {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgress !== null && inProgress !== undefined) {
    if (arr.strMeal) {
      const a = Object.keys(inProgress?.meals)?.map((item) => item === arr.idMeal);
      return a[0];
    }
    if (arr.strDrink) {
      const a = Object.keys(inProgress?.drinks)?.map((item) => item === arr.idDrink);
      return a[0];
    }
  }
};

export default inProgressRecipe;
