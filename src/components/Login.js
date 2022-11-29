import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    <div>
      <input
        type="text"
        data-testid="email-input"
        value={ email }
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        type="password"
        data-testid="password-input"
        value={ senha }
        onChange={ ({ target }) => setSenha(target.value) }
      />
      <button
        disabled={ !validaEntrada() }
        type="button"
        data-testid="login-submit-btn"
        onClick={ infoUser }
      >
        Enter
      </button>
    </div>
  );
}
