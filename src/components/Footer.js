import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Drinks Icon"
          height="35px"
        />

      </Link>
      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="Meals Icon"
          height="35px"
        />
      </Link>
    </footer>
  );
}

export default Footer;
