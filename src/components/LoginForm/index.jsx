import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login from '../../services/user/login';
import { getItem, setItem } from '../../utils/storage';
import './styles.css';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [showPasswordLogin, setShowPassword] = useState(false);

  useEffect(() => {
    const token = getItem('token');
    if (token) navigate('/main');
  }, []);

  async function handleSubmitEmailPassword(e) {
    e.preventDefault();
    setError('');

    try {
      if (!email || !password) {
        setError('E-mail e senha obrigatórios.');
        setTimeout(() => setError(''), 3000);
        return;
      }

      const response = await login({ email, password });

      if (response.error) {
        setError(response.message);
        setTimeout(() => setError(''), 3000);
        return;
      }

      setItem('token', response.message.token);
      setItem('userId', response.message.user.id);
      navigate('/main');
    } catch (error) {
      setError(error.message);
      return;
    }
  }

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleChange = prop => event => {
    if (event.nativeEvent.data === ' ') {
      if (prop === 'email' || prop === 'password') {
        return;
      }
    }

    if (prop === 'email') {
      setEmail(event.target.value);
    }
    if (prop === 'password') {
      setPassword(event.target.value);
    }
  };

  return (
    <div className="loginform-container">
      <h1>Faça seu login!</h1>
      <div className="loginform-email">
        <label>E-mail</label>
        <TextField
          inputProps={{ style: { fontSize: 14 } }}
          className="loginform-input-email"
          id="outlined-basic-email"
          placeholder="Digite seu e-mail"
          variant="outlined"
          name="email"
          value={email}
          onChange={handleChange('email')}
        />
      </div>

      <a className="loginform-forgotPassword" href="">
        Esqueceu a senha?
      </a>

      <div className="loginform-password">
        <label>Senha</label>
        <OutlinedInput
          sx={{
            fontSize: '14px',
          }}
          className="loginform-input-password"
          placeholder="Digite sua senha"
          id="outlined-adornment-Loginpassword"
          type={showPasswordLogin ? 'text' : 'password'}
          value={password}
          onChange={handleChange('password')}
          name="password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPasswordLogin)}
                onMouseDown={handleMouseDownPassword}
              >
                {showPasswordLogin ? <VisibilityOff /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>

      {error && <span className="error-notification">{error}</span>}
      <button
        onClick={handleSubmitEmailPassword}
        className="loginform-button-login"
      >
        Entrar
      </button>

      <p className="loginform-footer">
        Ainda não possui uma conta?{'  '}
        <Link to="sign-up">Cadastre-se</Link>
      </p>
    </div>
  );
}

export default LoginForm;
