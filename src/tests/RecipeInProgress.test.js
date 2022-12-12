import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import React from 'react';
import RecipeInProgress from '../components/RecipeInProgress';
import renderWithRouter from './helpers/renderWith';
import mockDrinkDetails from './mocks/mockDrinkDetails';
import mockMealDetails from './mocks/mockMealDetails';

const mgxSeisMil = 60000;
const caminho = '/drinks/13332/in-progress';
const ingrStepZero = '0-ingredient-step';

// beforeEach(() => {

// });

jest.mock('clipboard-copy');

afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

describe('Testando o arquivo RecipeInProgress com uma mock expecifica', () => {
  jest.setTimeout(mgxSeisMil);
  test('1- Verifica se a pagina de recipe in progress está sendo renderizada', async () => {
    jest.spyOn(window, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinkDetails),
    });
    const { history: { location: { pathname } } } = renderWithRouter(
      <RecipeInProgress />,
      { initialEntries: [caminho] },
    );

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toMatchObject([]);
    expect(pathname).toBe(caminho);

    const shotName = await screen.findByTestId('recipe-category');
    expect(shotName).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();

    const checks = await screen.findAllByRole('checkbox');
    expect(checks.length).toBe(3);
    expect(screen.getByTestId('1-ingredient-step').style.textDecoration).toMatch(/none solid/i);
    userEvent.click(checks[0]);
    userEvent.click(checks[1]);
    userEvent.click(checks[2]);
    expect(screen.getByTestId(ingrStepZero).style.textDecoration).toMatch(/line-through solid/i);
    expect(screen.getByTestId('1-ingredient-step').style.textDecoration).toMatch(/line-through solid/i);
    expect(screen.getByTestId('2-ingredient-step').style.textDecoration).toMatch(/line-through solid/i);
    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toMatchObject({ 13332: [0, 1, 2] });

    renderWithRouter(
      <RecipeInProgress />,
      { initialEntries: [caminho] },
    );
    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toMatchObject({ 13332: [0, 1, 2] });
    expect(screen.getByTestId('2-ingredient-step').style.textDecoration).toMatch(/line-through solid/i);
    userEvent.click(checks[0]);
    userEvent.click(checks[1]);
    userEvent.click(checks[2]);
    expect(screen.getByTestId(ingrStepZero).style.textDecoration).toMatch(/none solid/i);
    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toMatchObject({ 13332: [] });

    const fav = screen.getAllByRole('button');
    const imgHearth = screen.getAllByTestId('favorite-btn')[0];
    expect(imgHearth).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(fav[1]);
    expect(imgHearth).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(fav[1]);
    expect(imgHearth).toHaveAttribute('src', 'whiteHeartIcon.svg');

    expect(fav[0]).toBeInTheDocument();

    expect(fav[2]).toBeDisabled();
    userEvent.click(checks[0]);
    userEvent.click(checks[1]);
    userEvent.click(checks[2]);
    userEvent.click(fav[2]);
    expect(fav[2]).toBeEnabled();
    // expect(window.localStorage.setItem).toHaveBeenCalledTimes(14);

    expect(JSON.parse(localStorage.getItem('doneRecipes'))).toMatchObject([{ type: 'drink', nationality: '', id: '13332', alcoholicOrNot: 'Alcoholic' }]);
    // expect()
  });

  test('2- Verifica se a pagina de recipe in progress está sendo renderizada com mock de meals', async () => {
    const caminho2 = '/meals/52875/in-progress';
    jest.spyOn(window, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealDetails),
    });
    renderWithRouter(
      <RecipeInProgress />,
      { initialEntries: [caminho2] },
    );

    const shotName = await screen.findByTestId('recipe-category');
    expect(shotName.innerHTML).toBe('');

    const btn = screen.getAllByRole('button');
    const checks2 = await screen.findByTestId(ingrStepZero);
    expect(checks2.innerHTML).toMatch('450ml Chicken Stock');
    userEvent.click(checks2);
    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toMatchObject({ 52875: [0] });

    copy.mockImplementation(() => {});
    userEvent.click(btn[0]);
    await waitFor(() => {
      expect(copy).toHaveBeenCalledTimes(1);
      expect(copy).toHaveBeenCalledWith('http://localhost:3000/meals/52875');
    });
    await waitFor(() => {
      expect(screen.getByText('Link copied!')).toBeInTheDocument();
    });
    userEvent.click(btn[0]);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
    expect(copy).toHaveBeenCalledTimes(2);

    const video = await screen.findByTestId('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', 'https://www.youtube.com/embed/xr-CpPE_lNk');

    userEvent.click(btn[2]);
    const doneRecipeJson = JSON.parse(localStorage.getItem('doneRecipes'));

    expect(doneRecipeJson).toHaveLength(2);
    expect(JSON.parse(localStorage.getItem('doneRecipes'))).toMatchObject([{ tags: [] }, { tags: ['Pie', 'Meat'] }]);
  });
});
