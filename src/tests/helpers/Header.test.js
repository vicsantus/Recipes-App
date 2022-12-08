import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWith';
import App from '../../App';

const EMAIL_TEST = 'renanbf1992@outlook.com';
const PASSWORD_TEST = '1234567';

describe('1- Testando o arquivo SearchBar', () => {
  test('1- Verifica se o email da pessoa usuária está na tela', () => {
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
    const search = screen.queryByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
    const searchInput = screen.queryByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    const labelIngredient = screen.getByTestId('ingredient-search-radio');
    expect(labelIngredient).toBeInTheDocument();
    const labelName = screen.queryByTestId('name-search-radio');
    expect(labelName).toBeInTheDocument();
    const labelFirstLetter = screen.queryByTestId('first-letter-search-radio');
    expect(labelFirstLetter).toBeInTheDocument();
    const buttonSearch2 = screen.queryByTestId('exec-search-btn');
    expect(buttonSearch2).toBeInTheDocument();
    userEvent.type(searchInput, 'Yakisoba');
    userEvent.click(labelFirstLetter);
    userEvent.click(buttonSearch2);
  });
});
