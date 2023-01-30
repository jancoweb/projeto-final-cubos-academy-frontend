import { useEffect, useState } from 'react';
import closeIcon from '../../assets/close-icon.svg';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import editUser from '../../services/user/editUser';
import getUser from '../../services/user/getUser';
import ShowPasswordIcon from '../../assets/mostrar-senha.svg';
import DontShowPasswordIcon from '../../assets/nao-mostrar-senha.svg';
import CheckOk from '../../assets/check-ok.png';
import InputMask from 'react-input-mask';

import * as yup from 'yup';
import './styles.css';

function ModalEditUser() {
  const { showModalUser, setShowModalUser } = useGlobalContext();
  const { openPopUp, setOpenPopUp } = useGlobalContext();
  const [errorAPI, setErrorAPI] = useState('');
  const [editConfirmation, setEditConfirmation] = useState(false);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    cpf: '',
    phone: '',
    new_password: '',
    confirm_newPassword: '',
  });

  const [values, setValues] = useState({
    showPassword: false,
    showConfirmPssword: false,
  });

  function handleCloseModal() {
    setEditConfirmation(false);
    setShowModalUser(false);
    setErrors({
      first_name: '',
      last_name: '',
      email: '',
      new_password: '',
      confirm_newPassword: '',
    });
  }

  function handleChangeInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

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

  async function handleSubmit(e) {
    e.preventDefault();

    setErrors({
      first_name: '',
      last_name: '',
      email: '',
      new_password: '',
      confirm_newPassword: '',
    });

    async function validate() {
      let schemaYup = yup.object().shape({
        confirm_newPassword: yup
          .string()
          .required({
            confirm_newPassword: 'Campo "confirmar senha" é obrigatório!',
          })
          .oneOf([yup.ref('new_password')], 'Senhas devem Coincidir!'),

        new_password: yup
          .string()
          .required({ new_password: 'Campo "nova senha" é obrigatório!' }),

        email: yup
          .string()
          .email({ email: 'Insira um email válido!' })
          .required({ email: 'O campo "Email" é obrigatório!' }),

        last_name: yup
          .string()
          .required({ last_name: 'Campo "Sobrenome" é obrigatório!' }),

        first_name: yup
          .string()
          .required({ first_name: 'Campo "Nome" é obrigatório!' }),
      });

      try {
        await schemaYup.validate({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          new_password: form.password,
          confirm_newPassword: form.confirmPassword,
        });

        return true;
      } catch (error) {
        setErrors(error.errors[0]);
        return false;
      }
    }

    if (!(await validate())) {
      return;
    }

    try {
      if (!(await secondValidate())) {
        return;
      }

      const response = await editUser(form);

      if (response.error) {
        setErrorAPI(response.message);
        setTimeout(() => setErrorAPI(''), 3000);
        return;
      }

      setEditConfirmation(true);
      setTimeout(() => handleCloseModal(), 4000);
    } catch (error) {
      setErrorAPI(error.message);
    }
  }

  useEffect(() => {
    (async function () {
      const response = await getUser();
      setForm({ ...response.user });
    })();
  }, [showModalUser]);

  return (
    <>
      {!editConfirmation && (
        <div className="container-modalUser">
          <div className="modalUser__card">
            <div className="modalUser__card--title">
              <h1>Edite seu cadastro</h1>
              <img
                className="close-modalUser"
                src={closeIcon}
                alt="Fechar"
                onClick={handleCloseModal}
              />
            </div>
            <form className="modalUser__form" onSubmit={handleSubmit}>
              <label>Nome*</label>
              <input
                className={
                  !errors.first_name
                    ? 'modalEditUser__inputDefault'
                    : 'modalEditUser__inputError'
                }
                type="text"
                name="first_name"
                onChange={e => handleChangeInput(e)}
                value={form.first_name}
              />
              {errors.first_name && (
                <span className="error-notification-modal">
                  {errors.first_name}
                </span>
              )}
              <label>Sobrenome*</label>
              <input
                className={
                  !errors.last_name
                    ? 'modalEditUser__inputDefault'
                    : 'modalEditUser__inputError'
                }
                type="text"
                name="last_name"
                onChange={e => handleChangeInput(e)}
                value={form.last_name}
              />
              {errors.last_name && (
                <span className="error-notification-modal">
                  {errors.last_name}
                </span>
              )}
              <label>Email*</label>
              <input
                className={
                  !errors.email
                    ? 'modalEditUser__inputDefault'
                    : 'modalEditUser__inputError'
                }
                type="text"
                name="email"
                onChange={e => handleChangeInput(e)}
                value={form.email}
              />
              {errors.email && (
                <span className="error-notification-modal">{errors.email}</span>
              )}
              <div className="two-inputsUser">
                <div className="cpfUser_input">
                  <label>CPF</label>
                  <InputMask
                    className="modalEditUser__inputDefault"
                    name="cpf"
                    mask="999.999.999-99"
                    onChange={e => handleChangeInput(e)}
                    value={form.cpf}
                  />
                  {errors.cpf && (
                    <span className="error-notification-modal">
                      {errors.cpf}
                    </span>
                  )}
                </div>

                <div className="phoneUser_input">
                  <label>Telefone</label>
                  <InputMask
                    className="modalEditUser__inputDefault"
                    placeholder="(DD) 9 9472-8888"
                    mask="99 9 9999-9999"
                    name="phone"
                    onChange={e => handleChangeInput(e)}
                    value={form.phone}
                  />
                </div>
              </div>
              <label>Nova senha*</label>
              <input
                className={
                  !errors.new_password
                    ? 'modalEditUser__inputDefault'
                    : 'modalEditUser__inputError'
                }
                type={values.showPassword ? 'text' : 'password'}
                name="password"
                onChange={e => handleChangeInput(e)}
                value={form.password}
              />
              {errors.new_password && (
                <span className="error-notification-modal">
                  {errors.new_password}
                </span>
              )}
              <img
                onClick={handleClickShowPassword}
                className={
                  errors.confirm_newPassword
                    ? 'swapPasswordIconErrorConfirm'
                    : '' || !errors.new_password
                    ? 'swapPasswordIcon'
                    : 'swapPasswordIconError'
                }
                src={
                  values.showPassword ? ShowPasswordIcon : DontShowPasswordIcon
                }
                alt="ShowPasswordIcon"
              />
              <label>Confirmar senha*</label>

              <input
                className={
                  !errors.confirm_newPassword
                    ? 'modalEditUser__inputDefault'
                    : 'modalEditUser__inputError'
                }
                type={values.showConfirmPssword ? 'text' : 'password'}
                name="confirmPassword"
                onChange={e => handleChangeInput(e)}
                value={form.confirmPassword}
              />
              {errors.confirm_newPassword && (
                <span className="error-notification-modal">
                  {errors.confirm_newPassword}
                </span>
              )}
              <img
                onClick={handleClickShowConfirmPassword}
                className={
                  !errors.confirm_newPassword
                    ? 'swapConfirmPasswordIcon'
                    : 'swapConfirmPasswordIconError '
                }
                src={
                  values.showConfirmPssword
                    ? ShowPasswordIcon
                    : DontShowPasswordIcon
                }
                alt="ShowPasswordIcon"
              />

              {errorAPI && setOpenPopUp({ ...openPopUp, error: errorAPI })}

              <div className="modalUser__form--buttons">
                <button className="confirm-buttonUser" type="submit">
                  Aplicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editConfirmation && (
        <div className="container-modalUser">
          <div className="userAlteration-allClear">
            <img
              className="close-userAlteration-allClear"
              src={closeIcon}
              alt="Fechar"
              onClick={handleCloseModal}
            />
            <img src={CheckOk} alt="CheckOk" />
            <h1>Cadastro alterado com sucesso!</h1>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalEditUser;
