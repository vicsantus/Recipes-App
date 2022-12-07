import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWith';
import SearchBar from '../../components/SearchBar';

describe('1- Testando o arquivo SearchBar', () => {
  test('1- Verifica se existem campos para fazer uma busca, após clicar no botão search', () => {
    renderWithRouter(<SearchBar />);
    const search = screen.queryByTestId('search-input');
    expect(search).toBeDefined();
  });

  test('2- Verifica se existe uma label Ingredient na página', () => {
    renderWithRouter(<SearchBar />);
    const labelIngredient = screen.queryByTestId('ingredient-search-radio');
    expect(labelIngredient).toBeDefined();
  });

  test('3- Verifica se existe uma label Name na página', () => {
    renderWithRouter(<SearchBar />);
    const labelName = screen.queryByTestId('name-search-radio');
    expect(labelName).toBeDefined();
  });

  test('4- Verifica se existe uma label First Letter na página', () => {
    renderWithRouter(<SearchBar />);
    const labelFirstLetter = screen.queryByTestId('first-letter-search-radio');
    expect(labelFirstLetter).toBeDefined();
  });

  test('5- Verifica se existe um botão search na página', () => {
    renderWithRouter(<SearchBar />);
    const buttonSearch = screen.queryByTestId('exec-search-btn');
    expect(buttonSearch).toBeDefined();
  });
});
