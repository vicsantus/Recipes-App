import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWith';
import App from '../../App';

const EMAIL_TEST = 'renanbf1992@outlook.com';
const PASSWORD_TEST = '1234567';

describe('1- Testando o arquivo Header', () => {
  test.skip('1- Verifica se o email da pessoa usuária está na tela', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, EMAIL_TEST);
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputPassword, PASSWORD_TEST);
    const buttonEnter = screen.getByRole('button', { name: /enter/i });
    userEvent.click(buttonEnter);
    const buttonSearch = screen.getByRole('img', { name: /search icon/i });
    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);
    expect(screen.getByText('Meals')).toBeInTheDocument();
    const buttonDrinks = screen.getByRole('img', { name: /drinks icon/i });
    userEvent.click(buttonDrinks);
    expect(screen.getByText('Drinks')).toBeInTheDocument();
    const buttonSearch2 = screen.queryByTestId('exec-search-btn');
    userEvent.click(buttonSearch2);
    const buttonMeals = screen.getByRole('img', { name: /meals icon/i });
    userEvent.click(buttonMeals);
    expect(buttonSearch2).toBeInTheDocument();
    userEvent.click(buttonSearch2);
    expect(window.alert).toHaveBeenCalledTimes(2);
  });

  test.skip('2- Verifica se o email da pessoa usuária está na tela de receitas', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithRouter(<App />);
    const buttonSearch = screen.getByRole('img', { name: /search icon/i });
    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);
    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'Sushi');
    expect(inputSearch).toHaveValue('Sushi');
    const labelName = screen.queryByTestId('name-search-radio');
    userEvent.click(labelName);
    const buttonSearch2 = screen.queryByTestId('exec-search-btn');
    userEvent.click(buttonSearch2);
    userEvent.click(window.alert);
  });
});
