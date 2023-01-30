import { useState } from 'react';
import RegistrationSteps from '../../components/RegistrationSteps';
import RegistrationForm from '../../components/RegistrationForm';
import './styles.css';

function SignUp() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="container-signup">
      <div className="signup-left-side">
        <RegistrationSteps
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>
      <div className="signup-right-side">
        <RegistrationForm
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>
    </div>
  );
}

export default SignUp;
