import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
      <Link
        key={ index }
        to={ `/drinks/${item.idDrink}` }
      >
        <div
          key={ item.idDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            className="imagem2"
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
      </Link>
    ))

  );
}

export default CardInfoDrinks;
