import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Login from '../components/Login';
import renderWithRouter from './helpers/renderWith';

describe('Testes elementos footer', () => {
  test.skip('Teste se a página carrega com os elementos renderizados', () => {
    const { history } = renderWithRouter(<Login />);
    act(() => history.push('/meals'));
    const footerEl = screen.getByTestId('footer');
    const foodsEl = screen.getByTestId('food-bottom-btn');
    const drinksEl = screen.getByTestId('drinks-bottom-btn');

    expect(footerEl).toBeInTheDocument();
    expect(foodsEl).toBeInTheDocument();
    expect(drinksEl).toBeInTheDocument();
  });
  test.skip('Teste as ações dos usuário clicando nos ícones', () => {
    const { history } = renderWithRouter(<Login />);
    history.push('/meals');

    const foodsEl = screen.getByTestId('food-bottom-btn');
    const drinksEl = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinksEl);
    expect(history.location.pathname).toBe('/drinks');
    userEvent.click(foodsEl);
    expect(history.location.pathname).toBe('/foods');
  });
});
