import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from './renderWith';

const EMAIL_TEST = 'renanbf1992@outlook.com';
const PASSWORD_TEST = '1234567';

describe('1- Testando o arquivo Profile', () => {
  test('1- Verifica se o email da pessoa usuária está na tela', async () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, EMAIL_TEST);
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputPassword, PASSWORD_TEST);
    const buttonEnter = screen.getByRole('button', { name: /enter/i });
    userEvent.click(buttonEnter);
    const buttonProfile = screen.getByTestId('profile-top-btn');
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    userEvent.click(buttonProfile);
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  test('2- Verifica se há um botão que redireciona para a página "Favorite Recipes"', () => {
    renderWithRouter(<App />);
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    expect(screen.getByText('Favorite Recipes')).toBeInTheDocument();
  });

  test('3- Verifica se há um botão que redireciona para a página "Done Recipes"', () => {
    const { history } = renderWithRouter(<App />);
    const profileIcon = screen.getByRole('img', { name: /profile icon/i });
    userEvent.click(profileIcon);
    act(() => {
      history.push('/profile');
    });
    const doneBtn = screen.getByTestId('profile-done-btn');
    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    userEvent.click(doneBtn);
    expect(screen.getByText('Done Recipes')).toBeInTheDocument();
  });

  test('4- Verifica se há um botão Logout que redireciona para a página "Login"', () => {
    const { history } = renderWithRouter(<App />);
    const profileIcon = screen.getByRole('img', { name: /profile icon/i });
    userEvent.click(profileIcon);
    act(() => {
      history.push('/profile');
    });
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
    userEvent.click(logoutBtn);
    expect(screen.getByRole('button', { name: /enter/i })).toBeInTheDocument();
  });
});
