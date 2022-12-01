import React, { useState, useEffect, useContext } from 'react';
import CardInfoContext from '../context/CardInfoContext';

const twelve = 12;
function CardInfoDrinks() {
  const infoToCard = useContext(CardInfoContext);
  const [showCardItem, setShowCardItem] = useState([]);

  useEffect(() => {
    setShowCardItem(infoToCard);
  }, [infoToCard]);
  return (

    showCardItem?.slice(0, twelve).map((item, index) => (
      <div
        key={ item.idDrink }
        data-testid={ `${index}-recipe-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ item.strDrinkThumb }
          alt={ item.strDrink }
        />
        <p
          data-testid={ `${index}-card-name` }
        >
          {item.strDrink}
        </p>
      </div>
    ))

  );
}

export default CardInfoDrinks;
