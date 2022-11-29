import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando o arquivo App', () => {
  test('1- Verifica se existem campos para digitar email e senha', () => {
    render(<App />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    expect(email).toBeDefined();
    expect(senha).toBeDefined();
  });
});

test('2- Verifica se a página muda após o usuário clicar no botão de Enter', () => {
  render(<App />);
  const email = screen.getByTestId('email-input');
  const senha = screen.getByTestId('password-input');
  const enter = screen.getByTestId('login-submit-btn');
  userEvent.type(email, 'email@test.com');
  userEvent.type(senha, '1234567');
  userEvent.click(enter);
});
