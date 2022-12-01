import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWith';
import mockCategDrinks from './mocks/mockCategDrinks';
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
    expect(await screen.findByTestId('10-card-img')).toBeInTheDocument();
    userEvent.click(categBeef);
    expect(await screen.findByTestId('10-recipe-card')).toBeInTheDocument();
  });

  test('3- Verifica se categorias de drinks existem e aparecem na ordem correta', async () => {
    jest.spyOn(window, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCategDrinks),
    });
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    expect(history.location.pathname).toBe('/drinks');
    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
    let categShake = null;
    await waitFor(async () => {
      categShake = await screen.findByTestId('Shake-category-filter');
    }, { timeout: 8000 });
    expect(categShake).toBeInTheDocument();
    userEvent.click(categShake);
    expect(await screen.findByTestId('0-card-name')).toBeInTheDocument();
    expect(await screen.findByTestId('9-card-img')).toBeInTheDocument();
    userEvent.click(categShake);
    expect(await screen.findByTestId('9-recipe-card')).toBeInTheDocument();
  });
});
