import { useGlobalContext } from '../../hooks/useGlobalContext';
import CloseIcon from '../../assets/close-icon.svg';
import ChargesIcon from '../../assets/charges-icon-clean.svg';
import formatDate from '../../utils/format/formatDate';
import formatValue from '../../utils/format/formatValue';
import { compareAsc } from 'date-fns';

import './styles.css';

function ModalChargeDetails() {
  const { setShowModalChargeDetail, showModalChargeDetail } =
    useGlobalContext();

  const currentDate = new Date();

  function handleCloseModal() {
    setShowModalChargeDetail(false);
  }

  return (
    <>
      {showModalChargeDetail && (
        <div className="container-charge-detail">
          <div className="confirm-charge-detail__card">
            <img
              className="confirm-charge-detail__card--close"
              src={CloseIcon}
              alt="Fechar"
              onClick={handleCloseModal}
            />
            <div className="confirm-charge-detail__card--title">
              <img src={ChargesIcon} alt="ChargesIcon" />
              <p>Detalhe da Cobrança</p>
            </div>
            <div className="confirm-charge-detail__card--content">
              <h6>Nome</h6>
              <p>{showModalChargeDetail.name}</p>

              <h6>Descrição</h6>
              <p className="confirm-charge-detail__card--content--description">
                {showModalChargeDetail.description}
              </p>
              <div className="charge-detail__card--content--description-two">
                <div className="--content--description-two">
                  <h6>Vencimento</h6>
                  <p>{formatDate(showModalChargeDetail.duedate)}</p>
                </div>

                <div className="--content--description-two">
                  <h6>Valor</h6>
                  <p>{`R$ ` + formatValue(showModalChargeDetail.value)}</p>
                </div>
              </div>
              <div className="charge-detail__card--content--description-two">
                <div className="--content--description-two">
                  <h6>ID cobranças</h6>
                  <p>{showModalChargeDetail.id}</p>
                </div>

                <div className="--content--description-two">
                  <h6>Status</h6>
                  <p
                    className={
                      showModalChargeDetail.status
                        ? 'status-charges-table-dataClients__paid'
                        : compareAsc(
                            currentDate,
                            new Date(showModalChargeDetail.duedate),
                          ) === -1
                        ? 'status-charges-table-dataClients__expected'
                        : 'status-charges-table-dataClients__overdue'
                    }
                  >
                    {showModalChargeDetail.status
                      ? 'Paga'
                      : compareAsc(
                          currentDate,
                          new Date(showModalChargeDetail.duedate),
                        ) === -1
                      ? 'Pendente'
                      : 'Vencida'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalChargeDetails;
