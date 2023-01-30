import { useState } from 'react';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import * as yup from 'yup';

import confirmation from '../../assets/check-ok.png';
import clientIcon from '../../assets/client-icon.svg';
import closeIcon from '../../assets/close-icon.svg';
import addClient from '../../services/customer/addClient';
import updateClient from '../../services/customer/updateClient';
import MaskedCpfOnlyNumbers from '../../components/maskCPF/maskCPF';
import './styles.css';

function ModalClient() {
  const {
    showModalClient,
    setShowModalClient,
    setIsEditingClient,
    isEditingClient,
    clientDataInfos,
  } = useGlobalContext();

  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    response: '',
    responseError: '',
  });

  const [confirm, setConfirm] = useState(false);

  const [form, setForm] = useState({
    id: clientDataInfos.id,
    name: clientDataInfos.name || '',
    email: clientDataInfos.email || '',
    cpf: clientDataInfos.cpf || '',
    phone: clientDataInfos.phone || '',
    street: clientDataInfos.street,
    district: clientDataInfos.district || '',
    city: clientDataInfos.city || '',
    state: clientDataInfos.state || '',
    zip_code: clientDataInfos.zip_code || '',
    address_complement: clientDataInfos.address_complement || '',
  });

  function handleCloseModal() {
    setShowModalClient(false);
    setIsEditingClient(false);
  }

  function handleChangeInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({
      nome: '',
      email: '',
      cpf: '',
      telefone: '',
    });

    async function validate() {
      let schemaYup = yup.object().shape({
        telefone: yup
          .string()
          .required({ telefone: 'O campo telefone é obrigatório!' })
          .matches(/^[0-9]+$/, { telefone: 'Insira um telefone válido!' })
          .min(10, { telefone: 'Insira no mínimo 10 dígitos!' })
          .max(11, { telefone: 'Insira no máximo 11 dígitos!' }),

        cpf: yup
          .string()
          .required({ cpf: 'O campo CPF é obrigatório!' })
          .matches(/[0-9]+$/, { cpf: 'Insira um CPF válido!' })
          .min(11, { cpf: 'Insira um CPF válido!' })
          .max(11, { cpf: 'Insira um CPF válido!' }),

        email: yup
          .string()
          .email({ email: 'Insira um email válido!' })
          .required({ email: 'O campo email é obrigatório!' }),

        name: yup.string().required({ nome: 'Campo nome é obrigatório!' }),
      });

      try {
        await schemaYup.validate({
          name: form.name,
          email: form.email,
          cpf: form.cpf,
          telefone: form.phone,
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
      const response = isEditingClient
        ? await updateClient(form)
        : await addClient(form);
      if (response.error) return setErrors({ response: response.error });

      setConfirm(true);
    } catch (error) {
      return setErrors({ responseError: error.message });
    }

    setTimeout(() => {
      setShowModalClient(false);
      setConfirm(false);
    }, 3000);
  }

  async function autoCompleteAddress() {
    if (!form.zip_code) {
      return;
    }

    const url = `https://viacep.com.br/ws/${form.zip_code}/json/`;
    const response = await fetch(url);
    const addressResponse = await response.json();

    setForm({
      ...form,
      street: addressResponse.logradouro,
      district: addressResponse.bairro,
      city: addressResponse.localidade,
      state: addressResponse.uf,
    });
  }

  return (
    <>
      {showModalClient && (
        <div className="container-modalClient">
          <div className="modalClient__card">
            <div className="modalClient__card--title">
              <img
                className="client-icon"
                src={clientIcon}
                alt="ícone do cliente"
              />
              <h1>
                {isEditingClient ? 'Editar Cliente' : 'Cadastro do Cliente'}
              </h1>
              <img
                className="close-modalClient"
                src={closeIcon}
                alt="Fechar"
                onClick={handleCloseModal}
              />
            </div>
            <form className="modalClient__form" onSubmit={handleSubmit}>
              <label htmlFor="name">Nome*</label>
              <input
                className={
                  errors.nome
                    ? 'modalClient__form__inputError'
                    : 'modalClient__form__inputDefault'
                }
                type="text"
                name="name"
                value={form.name}
                onChange={handleChangeInput}
              />
              {errors.nome && (
                <span className="error-notification-modal">{errors.nome}</span>
              )}
              <label htmlFor="email">Email*</label>
              <input
                className={
                  errors.email
                    ? 'modalClient__form__inputError'
                    : 'modalClient__form__inputDefault'
                }
                type="email"
                name="email"
                value={form.email}
                onChange={handleChangeInput}
              />
              {errors.email && (
                <span className="error-notification-modal">{errors.email}</span>
              )}
              <div className="two-inputs">
                <div>
                  <label htmlFor="cpf">CPF*</label>
                  <MaskedCpfOnlyNumbers
                    className={
                      errors.cpf
                        ? 'modalClient__form__inputError'
                        : 'modalClient__form__inputDefault'
                    }
                    mask="999.999.999-99"
                    type="text"
                    name="cpf"
                    value={form.cpf}
                    onChange={handleChangeInput}
                  />
                  {errors.cpf && (
                    <span className="error-notification-modal">
                      {errors.cpf}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="phone">Telefone*</label>
                  <input
                    className={
                      errors.telefone
                        ? 'modalClient__form__inputError'
                        : 'modalClient__form__inputDefault'
                    }
                    type="number"
                    name="phone"
                    value={form.phone}
                    onChange={handleChangeInput}
                    placeholder="86 99999-8888"
                  />
                  {errors.telefone && (
                    <span className="error-notification-modal">
                      {errors.telefone}
                    </span>
                  )}
                </div>
              </div>
              <label htmlFor="street">Endereço</label>
              <input
                className="modalClient__form__inputDefault"
                type="text"
                name="street"
                value={form.street}
                onChange={handleChangeInput}
              />
              <label htmlFor="address_complement">Complemento</label>
              <input
                className="modalClient__form__inputDefault"
                type="text"
                name="address_complement"
                value={form.address_complement}
                onChange={handleChangeInput}
              />
              <div className="two-inputs">
                <div>
                  <label htmlFor="zip_code">CEP</label>
                  <input
                    className="modalClient__form__inputDefault"
                    type="number"
                    name="zip_code"
                    value={form.zip_code}
                    onChange={handleChangeInput}
                    onBlur={autoCompleteAddress}
                  />
                </div>
                <div>
                  <label htmlFor="district">Bairro</label>
                  <input
                    className="modalClient__form__inputDefault"
                    type="text"
                    name="district"
                    value={form.district}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="two-inputs">
                <div className="seventy">
                  <label htmlFor="city">Cidade</label>
                  <input
                    className="modalClient__form__inputDefault"
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="thirty">
                  <label htmlFor="state">UF</label>
                  <input
                    className="modalClient__form__inputDefault"
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="modalClient__form--buttons">
                {errors.response && (
                  <span className="error-notification">{errors.response}</span>
                )}
                {errors.responseError && (
                  <span className="error-notification">
                    {errors.responseError}
                  </span>
                )}
                <button
                  onClick={handleCloseModal}
                  className="cancel-button"
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  className="confirm-button"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Aplicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirm && (
        <div className="container-modalClient">
          <div className="registration-allClear">
            <img src={confirmation} alt="checkOk" />
            <h1>Cliente adicionado com sucesso!</h1>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalClient;
