import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Button,
} from '@mui/material';

import './styles.css';

function RegistrationSteps({ activeStep, setActiveStep }) {
  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = [
    {
      label: 'Cadastre-se',
      description: `Por favor, escreva seu nome e e-mail`,
    },
    {
      label: 'Escolha uma senha',
      description: 'Escolha uma senha segura',
    },
    {
      label: 'Cadastro realizado com sucesso',
      description: 'E-mail e senha cadastrados com sucesso.',
    },
  ];

  return (
    <div>
      <Box className="signup-left-steps">
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map(step => (
            <Step key={step.label}>
              <StepLabel>
                <Typography className="signup-left-steps-label">
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent>
                <Typography className="signup-left-steps-description">
                  {step.description}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        <Button
          sx={{
            mt: 3,
            color: '#FFF',
            '&:hover': {
              backgroundColor: '#0E8750',
              boxShadow: 'none',
            },
            background: '#0E8750',
            borderRadius: '15px',
            width: 70,
          }}
          onClick={handleReset}
        >
          Voltar
        </Button>
      </Box>
    </div>
  );
}

export default RegistrationSteps;
