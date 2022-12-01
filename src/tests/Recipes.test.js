import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
// import Recipes from '../components/Recipes';
import renderWithRouter from './helpers/renderWith';
import mockCategories from './mocks/mockCategories';
import mockRecipesMeals from './mocks/mockRecipesMeals';

const mgxSeisMil = 60000;

describe('Testando o arquivo Recipes', () => {
  jest.setTimeout(mgxSeisMil);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('1- Verifica se existe 12 recipe cards', async () => {
    jest.spyOn(window, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockRecipesMeals),
    });
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
      meal12 = await screen.findByTestId('11-recipe-card');
    }, { timeout: 8000 });
    expect(meal12).toBeInTheDocument();
  });

  test('2- Verifica se categorias existem e aparecem na ordem correta', async () => {
    jest.spyOn(window, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCategories),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(history.location.pathname).toBe('/meals');
    const categBeef = await screen.findByTestId('Beef-category-filter');
    expect(categBeef).toBeInTheDocument();
    userEvent.click(categBeef);
    expect(await screen.findByTestId('0-card-name')).toBeInTheDocument();
    expect(await screen.findByTestId('11-card-img')).toBeInTheDocument();
    userEvent.click(categBeef);
    expect(await screen.findByTestId('11-recipe-card')).toBeInTheDocument();
  });

  test('3- Verifica se os erros de fetch estão sendo feitos corretamente', async () => {
    jest.spyOn(window, 'fetch');
    global.fetch.mockResolvedValue({
      status: 401,
      body: { success: false },
    });

    const logSpy = jest.spyOn(console, 'log');
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(history.location.pathname).toBe('/meals');
    const categBeef = screen.queryByTestId('Beef-category-filter');
    expect(categBeef).toBeFalsy();
    expect(logSpy).toHaveBeenCalledWith('hello');
  });
});
