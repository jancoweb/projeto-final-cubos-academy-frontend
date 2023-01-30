import { useGlobalContext } from '../../hooks/useGlobalContext';
import alertIcon from '../../assets/alertIcon.svg';
import closeIcon from '../../assets/close-icon.svg';
import { useState } from 'react'
import deleteCharge from '../../services/charges/deleteCharge';
import './styles.css';

function ConfirmDeletePopup() {
  const {
    showPopupDelete,
    setShowPopupDelete,
    deletingCharge,
    setOpenPopUp,
    openPopUp,
    foreseenCharges
  } = useGlobalContext();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleCloseModal() {
    setShowPopupDelete(false);
  };

  async function handleSubmit() {
    const found = foreseenCharges.filter((charge) => {
      return charge.id == deletingCharge.id;
    });

    try {
      const response = await deleteCharge(found[0].id);
      if (response.error) return setOpenPopUp({ ...openPopUp, error: 'Não foi possível excluir a cobrança.' });

      setOpenPopUp({ ...openPopUp, success: "A cobrança foi excluída com sucesso." })
    } catch (error) {
      setOpenPopUp({ ...openPopUp, error: 'Não foi possível excluir a cobrança.' });
    }

    setTimeout(() => {
      setShowPopupDelete(false);
    }, 1000);
  };

  return (
    <>
      {showPopupDelete && (
        <div className='container-confirm-delete'>
          <div className='confirm-delete__card'>
            <img
              className="confirm-delete__card--close"
              src={closeIcon}
              alt="Fechar"
              onClick={handleCloseModal}
            />
            <img
              className='alert-icon'
              src={alertIcon}
              alt="Ícone de alerta!"
            />
            <span>Tem certeza que deseja excluir esta cobrança?</span>
            <div className='confirm-delete__buttons'>
              <button
                className='confirm-delete__buttons--cancel'
                onClick={handleCloseModal}
              >
                Não
              </button>
              <button
                className='confirm-delete__buttons--confirm'
                onClick={handleSubmit}
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmDeletePopup;
