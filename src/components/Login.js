import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const history = useHistory();

  const infoUser = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  const validaEntrada = () => {
    const senhaMinimo = 6;
    const emailRegex = /\S+@\S+\.\S+/;
    const emailValido = emailRegex.test(email);
    const senhaValida = senha.length > senhaMinimo;

    return emailValido && senhaValida;
  };

  return (
    <main>
      <form className="form">
        <h1 className="titulo">Recipes App</h1>
        <div>
          <label htmlFor="email">
            <input
              className="email"
              type="text"
              data-testid="email-input"
              value={ email }
              placeholder="Insira seu email"
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <input
              className="senha"
              type="password"
              data-testid="password-input"
              value={ senha }
              placeholder="Insira sua senha"
              onChange={ ({ target }) => setSenha(target.value) }
            />
          </label>
        </div>
        <div className="buttonEntrar">
          <button
            className="buttonEntrar"
            disabled={ !validaEntrada() }
            type="button"
            data-testid="login-submit-btn"
            onClick={ infoUser }
          >
            Enter
          </button>
        </div>
      </form>
    </main>
  );
}
