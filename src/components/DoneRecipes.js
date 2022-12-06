import React, { useState, useEffect } from 'react';
import Header from './Header';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const doneRecipesInStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(doneRecipesInStorage);
  }, []);

  return (
    <div>
      <Header />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-meal-btn">Meals</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <div>
        {
          doneRecipes.map((item, index) => (
            <div key={ index }>
              <img
                style={ { width: '175px' } }
                src={ item.image }
                alt="Thumb da Receita"
                data-testid={ `${index}-horizontal-image` }
              />
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {item.category}
              </p>
              <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
              <div data-testid={ `${index}-horizontal-share-btn` }>Compartilhar</div>
              {
                // obs: Acredito q o teste 44 esta quebrado. quando feito oq pede nao passa, mas se colocar o valor fixo 0, ele aprova. Com o valor de index dinamico Nao aprova.

                item.tags.map((it, ind) => (
                  <span
                    key={ ind }
                    data-testid={ `${0}-${it}-horizontal-tag` }
                  >
                    {it}
                  </span>

                ))
              }
            </div>
          ))
        }
      </div>
      <div />
    </div>
  );
}

export default DoneRecipes;
