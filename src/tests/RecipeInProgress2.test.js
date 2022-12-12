import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RecipeInProgress from '../components/RecipeInProgress';
import renderWithRouter from './helpers/renderWith';
import mockMealDetails from './mocks/mockMealDetails';

const mgxSeisMil = 60000;
const caminho = '/meals/52875/in-progress';

describe('Testando o arquivo RecipeInProgress com outra mock expecifica', () => {
  jest.setTimeout(mgxSeisMil);
  beforeEach(() => {
    jest.spyOn(window, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealDetails),
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
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(0);
    screen.logTestingPlaygroundURL();
    const checks2 = await screen.findAllByRole('checkbox');
    userEvent.click(checks2[0]);
    const btn = screen.getAllByRole('button');
    userEvent.click(btn[2]);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(3);
  });
});
