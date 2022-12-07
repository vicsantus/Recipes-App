import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import render from './renderWith';
import Header from '../../components/Header';
// import SearchBar from '../../components/SearchBar';

describe('1- Testando o arquivo Header', () => {
  test('1- Verifica se deve-se exibir um alert com a mensagem "Your search must have only 1 (one) character", se o radio selecionado for First letter.', () => {
    render(<Header />);
    const msg = screen.getByText(/Your search must have only 1 (one) character/i);
    expect(msg).not.toBeInTheDocument();
    const labelFirstLetter = screen.queryByTestId('first-letter-search-radio');
    expect(labelFirstLetter).toBeDefined();
    const btn = screen.getByTestId('exec-search-btn');
    userEvent.click(btn);
    const search = screen.queryByTestId('search-input');
    userEvent.type(search, 'Your search must have only 1 (one) character');
    expect(search).toBeInTheDocument();
    expect(search).toHaveValue('Your search must have only 1 (one) character');
  });
});
