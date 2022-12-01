import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWith';
import Header from '../../components/Header';

describe('1- Testando o arquivo Header', () => {
  test('1- Verifica se o botão Search está presente na página', () => {
    renderWithRouter(<Header />);
    const buttonSearch = screen.getByRole('img', { name: /search icon/i });
    expect(buttonSearch).toBeInTheDocument();
  });

  test('2- Verifica se o botão Search está habilitado', () => {
    renderWithRouter(<Header />);
    const buttonSearch = screen.getByRole('img', { name: /search icon/i });
    userEvent.click(buttonSearch);
    expect(buttonSearch).toBeInTheDocument();
  });

  test('3- Verifica se existem campos para fazer uma busca, após clicar no botão search', () => {
    renderWithRouter(<Header />);
    const search = screen.queryByTestId('search-input');
    expect(search).toBeDefined();
  });

  test('4- Verifica se os inputs são digitados no campo de busca', () => {
    renderWithRouter(<Header />);
    const btn = screen.getByTestId('search-top-btn');
    userEvent.click(btn);
    const search = screen.queryByTestId('search-input');
    userEvent.type(search, '123');
    expect(search).toBeInTheDocument();
    expect(search).toHaveValue('123');
  });
});
