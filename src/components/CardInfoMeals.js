import React, { useState, useEffect, useContext } from 'react';
import CardInfoContext from '../context/CardInfoContext';

const twelve = 12;
function CardInfoHead() {
  const infoToCard = useContext(CardInfoContext);
  const [showCardItem, setShowCardItem] = useState([]);

  useEffect(() => {
    setShowCardItem(infoToCard);
  }, [infoToCard]);
  return (

    showCardItem?.slice(0, twelve).map((item, index) => (
      <div
        key={ index }
        data-testid={ `${index}-recipe-card` }
      >
        <img
          style={ { width: '50%' } }
          data-testid={ `${index}-card-img` }
          src={ item.strMealThumb }
          alt={ item.strMeal }
        />
        <p
          data-testid={ `${index}-card-name` }
        >
          {item.strMeal}
        </p>
      </div>
    ))

  );
}

export default CardInfoHead;
