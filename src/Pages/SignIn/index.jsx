import LoginForm from '../../components/LoginForm';
import './styles.css';

function SignIn() {
  return (
    <div className="container-signin">
      <div className="signin-left">
        <h1 className="signin-left-title">
          Gerencie todos os pagamentos da sua empresa em um só lugar.
        </h1>
      </div>

      <div className="signin-right">
        <LoginForm />
      </div>
    </div>
  );
}

export default SignIn;
