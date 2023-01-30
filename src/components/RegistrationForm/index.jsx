import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from '@mui/material';
import CheckOk from '../../assets/check-ok.png';
import './styles.css';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import signUp from '../../services/user/signUp';

function RegistrationForm({ activeStep, setActiveStep }) {
  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPssword: false,
    name: '',
    lastName: '',
    email: '',
  });

  const [error, setError] = useState('');

  function handleFirstSubmit() {
    setError('');

    if (
      (activeStep === 0 && !values.name) ||
      !values.email ||
      !values.lastName
    ) {
      setError('Nome, sobrenome e email são obrigatórios!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (!validateEmail(values.email)) {
      setError('Digite um email  válido.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (validateName(values.name)) {
      setError('Digite um nome e sobrenome válidos!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (validateName(values.lastName)) {
      setError('Digite um nome e sobrenome válidos!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    handleNext();
  }

  async function handleSecondSubmit() {
    setError('');

    if ((activeStep === 1 && !values.password) || !values.confirmPassword) {
      setError('Senha e confirmação de senha obrigatórias.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError('As senhas informadas não conferem.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      const user = {
        first_name: values.name,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      const response = await signUp(user);

      if (response.error) {
        setError(response.message);
        setTimeout(() => setError(''), 3000);
        return;
      }

      handleNext();
    } catch (error) {
      setError(error.message);
    }
  }

  const handleChange = prop => event => {
    if (event.nativeEvent.data === ' ') {
      if (
        prop === 'email' ||
        prop === 'password' ||
        prop === 'confirmPassword'
      ) {
        return;
      }
    }

    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPssword: !values.showConfirmPssword,
    });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const validateName = name => {
    const re = /[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g;
    return re.test(name);
  };

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="container-registration">
      <div className="registration-formSteps">
        {activeStep == 0 && (
          <div className="registration-name-email">
            <h1>Adicione seus dados</h1>
            <div className="data-name-input">
              <label>Nome*</label>

              <TextField
                inputProps={{ style: { fontSize: 14 } }}
                className="data-name-textfield"
                placeholder="Digite o seu nome"
                id="outlined-start-adornment"
                name="name"
                value={values.name}
                onChange={handleChange('name')}
              />
            </div>

            <div className="data-lastName-input">
              <label>Sobrenome*</label>

              <TextField
                inputProps={{ style: { fontSize: 14 } }}
                className="data-lastName-textfield"
                placeholder="Digite o seu sobrenome"
                id="outlined-start-adornment"
                name="lastName"
                value={values.lastName}
                onChange={handleChange('lastName')}
              />
            </div>

            <div className="data-password-input">
              <label>E-mail*</label>
              <TextField
                inputProps={{ style: { fontSize: 14 } }}
                className="data-email-textfield"
                placeholder="Digite o seu email"
                id="outlined-start-adornment"
                name="email"
                value={values.email}
                onChange={handleChange('email')}
              />
            </div>

            {error && <span className="error-notification">{error}</span>}

            <Button
              className="signup-continue-btn"
              variant="contained"
              onClick={handleFirstSubmit}
              sx={{ mt: 5 }}
            >
              Continuar
            </Button>

            <p className="signup-span">
              Ja possui conta? Faça seu{' '}
              <a href="/" className="signup-link">
                Login
              </a>
            </p>
          </div>
        )}

        {activeStep == 1 && (
          <div className="registration-password-confirmPassword">
            <h1>Escolha uma senha</h1>

            <div className="registration-password">
              <label>Senha*</label>
              <OutlinedInput
                sx={{
                  fontSize: '14px',
                }}
                className="registration-password-input"
                placeholder="Senha"
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                name="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <div className="registration-confirmPassword">
              <label>Repita a senha*</label>
              <OutlinedInput
                sx={{
                  fontSize: '14px',
                }}
                className="registration-confirmPassword-input"
                placeholder="Confirmar senha"
                id="outlined-adornment-confirmPassword"
                type={values.showConfirmPssword ? 'text' : 'password'}
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                name="confirmPassword"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showConfirmPssword ? (
                        <VisibilityOff />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            {error && <span className="error-notification">{error}</span>}

            <Button
              className="signup-confirmRegistration-btn"
              variant="contained"
              onClick={handleSecondSubmit}
              sx={{ mt: 5 }}
            >
              Continuar
            </Button>

            <p className="signup-span">
              Ja possui conta? Faça seu{' '}
              <a href="/" className="signup-link">
                Login
              </a>
            </p>
          </div>
        )}

        {activeStep == 2 && (
          <div className="registration-finalStep">
            <div className="registration-allClear">
              <img src={CheckOk} alt="CheckOk" />
              <h1>Cadastro realizado com sucesso!</h1>
            </div>
            <Button
              className="signup-goToLogin-btn"
              variant="contained"
              href="/"
              sx={{ mt: 5 }}
            >
              Ir para Login
            </Button>
          </div>
        )}
      </div>

      <div className="steps-footer">
        <div
          className={`${
            activeStep == 0 ? 'steps-footer-green' : ''
          } steps-footer-bars `}
        ></div>
        <div
          className={`${
            activeStep == 1 ? 'steps-footer-green' : ''
          } steps-footer-bars `}
        ></div>
        <div
          className={`${
            activeStep == 2 ? 'steps-footer-green' : ''
          } steps-footer-bars `}
        ></div>
      </div>
    </div>
  );
}

export default RegistrationForm;
