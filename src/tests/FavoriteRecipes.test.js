import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import FavoriteRecipes from '../components/FavoriteRecipes';

const corba = [[{ id: '52977', type: 'food', nationality: 'Turkish', category: 'Side', alcoholicOrNot: '', name: 'Corba', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg' }]];

beforeEach(() => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(corba));
});

describe('Test favorite pages', () => {
  test.skip('Renderização elementos e filtro', () => {
    renderWithRouter(<FavoriteRecipes />);
    const btnFilterAll = screen.getByTestId('filter-by-all-btn');
    const btnFilterMeal = screen.getByTestId('filter-by-meal-btn');
    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(btnFilterAll);
    expect(screen.getByText('Corba')).toBeInTheDocument();
    userEvent.click(btnFilterMeal);
    expect(screen.getByText('Corba')).toBeInTheDocument();
    userEvent.click(filterDrink);
  });
  test.skip('Utilização buttons do card', () => {
    renderWithRouter(<FavoriteRecipes />);
    const btnShare = screen.getByTestId('0,horizontal-share-btn');
    const btnFav = screen.getByTestId('0,horizontal-share-btn');
    userEvent.click(btnShare);
    userEvent.click(btnFav);
  });
});
