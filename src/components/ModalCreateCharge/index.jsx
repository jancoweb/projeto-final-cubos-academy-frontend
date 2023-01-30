import closeIcon from '../../assets/close-icon.svg';
import ChargesIcon from '../../assets/charges-icon-clean.svg';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import addCharges from '../../services/charges/addCharges';
import editCharge from '../../services/charges/editCharge';

import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../hooks/useGlobalContext';

import './styles.css';

function ModalCreateCharge() {
  const {
    setShowModalCharges,
    showModalCharges,
    openPopUp,
    setOpenPopUp,
    isEditingCharge,
    setIsEditingCharge,
  } = useGlobalContext();

  const [form, setForm] = useState({
    clientId: showModalCharges.id,
    description: '',
    dueDate: '',
    value: '',
    status: '',
  });

  function handleCloseModal() {
    setShowModalCharges(false);
    setIsEditingCharge(false);
  }

  function handleChangeInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleChangeRadio(e) {
    setForm({ ...form, status: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = isEditingCharge
        ? await editCharge(form, form.id)
        : await addCharges(form);
      if (response.error)
        return setOpenPopUp({ ...openPopUp, error: response.data.message });

      setOpenPopUp({
        ...openPopUp,
        success: 'Cobrança cadastrada com sucesso',
      });
    } catch (error) {
      return setOpenPopUp({ ...openPopUp, error: error.message });
    }

    setTimeout(() => {
      handleCloseModal();
    }, 1000);
  }

  useEffect(() => {
    if (isEditingCharge) {
      setForm({
        ...showModalCharges,
        value: showModalCharges.value / 100,
      });
    }
  }, [showModalCharges]);

  return (
    <>
      {showModalCharges && (
        <div className="container-modalCharge">
          <div className="modalCharge__card">
            <div className="modalCharge__card--title">
              <img
                className="charge-icon"
                src={ChargesIcon}
                alt="ícone do cliente"
              />
              <h1>
                {isEditingCharge ? 'Editar Cobrança' : 'Cadastro de Cobrança'}
              </h1>
              <img
                className="close-modalCharge"
                src={closeIcon}
                alt="Fechar"
                onClick={handleCloseModal}
              />
            </div>
            <form className="modalCharge__form" onSubmit={handleSubmit}>
              <label>Nome*</label>
              <input
                className="modalCharge__form__inputDefault "
                type="text"
                defaultValue={showModalCharges.name}
                readOnly
              />

              <label>Descrição*</label>
              <textarea
                className="modalCharge__form__inputDefault descriptionCharge"
                type="text"
                name="description"
                value={form.description}
                onChange={handleChangeInput}
              />

              <div className="modalCharge__form__twoInputs">
                <div>
                  <label>Vencimento:*</label>
                  <input
                    className="modalCharge__form__inputDefault"
                    type="date"
                    placeholder="ex: 02/04/1996"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChangeInput}
                  />
                </div>
                <div>
                  <label>Valor:*</label>
                  <input
                    required
                    className="modalCharge__form__inputDefault"
                    type="number"
                    placeholder="ex: R$ 10,00"
                    name="value"
                    value={form.value}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>

              <div className="modalCharge__form__radioButtons">
                <FormControl>
                  <FormLabel
                    className="modalCharge__form__radioButtons__label"
                    id="demo-radio-buttons-group-label"
                  >
                    Status:*
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="controlled-radio-buttons-group"
                    onChange={handleChangeRadio}
                  >
                    <FormControlLabel
                      className="labelRadioMUI"
                      value={true}
                      control={<Radio />}
                      label="Cobrança Paga"
                    />

                    <FormControlLabel
                      className="labelRadioMUI"
                      value={false}
                      control={<Radio />}
                      label="Cobrança Pendente"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="modalCharge__form--buttons">
                <button
                  onClick={handleCloseModal}
                  className="cancel-button"
                  type="button"
                >
                  Cancelar
                </button>
                <button className="confirm-button" type="submit">
                  Aplicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalCreateCharge;
