import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RecipeInProgress from '../components/RecipeInProgress';
import renderWithRouter from './helpers/renderWith';
import mockDrinkDetails from './mocks/mockDrinkDetails';

const mgxSeisMil = 60000;
const caminho = '/drinks/13332/in-progress';

describe('Testando o arquivo RecipeInProgress com uma mock expecifica', () => {
  jest.setTimeout(mgxSeisMil);
  beforeEach(() => {
    jest.spyOn(window, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinkDetails),
    });
    const { history } = renderWithRouter(
      <RecipeInProgress />,
      { initialEntries: [caminho] },
    );
    act(() => history.push(caminho));
    const { pathname } = history.location;
    expect(pathname).toBe(caminho);

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('1- Verifica se a pagina de recipe in progress está sendo renderizada', async () => {
    const shotName = await screen.findByTestId('recipe-category');
    expect(shotName).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
    const checks = await screen.findAllByRole('checkbox');
    expect(checks.length).toBe(3);
    expect(screen.getByTestId('1-ingredient-step').style.textDecoration).toMatch(/none solid/i);
    userEvent.click(checks[0]);
    userEvent.click(checks[1]);
    userEvent.click(checks[2]);
    expect(screen.getByTestId('0-ingredient-step').style.textDecoration).toMatch(/line-through solid/i);
    expect(screen.getByTestId('1-ingredient-step').style.textDecoration).toMatch(/line-through solid/i);
    expect(screen.getByTestId('2-ingredient-step').style.textDecoration).toMatch(/line-through solid/i);
    expect(window.localStorage.getItem).toHaveBeenCalledWith('inProgressRecipes');
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(4);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(3);
    renderWithRouter(
      <RecipeInProgress />,
      { initialEntries: [caminho] },
    );
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(6);
    expect(screen.getByTestId('2-ingredient-step').style.textDecoration).toMatch(/line-through solid/i);
    userEvent.click(checks[0]);
    userEvent.click(checks[1]);
    userEvent.click(checks[2]);
    expect(screen.getByTestId('0-ingredient-step').style.textDecoration).toMatch(/none solid/i);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(7);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(9);
    const fav = screen.getAllByRole('button');
    const imgHearth = screen.getAllByTestId('favorite-btn')[0];
    expect(imgHearth).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(fav[1]);
    expect(imgHearth).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(fav[1]);
    expect(imgHearth).toHaveAttribute('src', 'whiteHeartIcon.svg');
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(9);
    expect(fav[0]).toBeInTheDocument();
    userEvent.click(checks[0]);
    userEvent.click(checks[1]);
    userEvent.click(checks[2]);
    userEvent.click(fav[2]);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(14);

    expect(window.localStorage.getItem).toHaveBeenLastCalledWith('doneRecipes');
  });
});
