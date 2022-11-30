import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
// import Recipes from '../components/Recipes';
import renderWithRouter from './helpers/renderWith';

const mgxSeisMil = 60000;

describe('Testando o arquivo Recipes', () => {
  jest.setTimeout(mgxSeisMil);
  test('1- Verifica se existe 12 recipe cards', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(history.location.pathname).toBe('/meals');
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const enter = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'email@test.com');
    userEvent.type(senha, '1234567');
    userEvent.click(enter);
    let meal12 = null;
    await waitFor(async () => {
      screen.logTestingPlaygroundURL();
      meal12 = await screen.findByTestId('11-recipe-card');
    }, { timeout: 8000 });
    expect(meal12).toBeInTheDocument();
  });
});
