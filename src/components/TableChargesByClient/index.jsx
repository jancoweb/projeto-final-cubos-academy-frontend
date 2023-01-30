import Grid from '@mui/material/Grid';
import addChargeIcon from '../../assets/addCharge.svg';
import ArrowUpDownIcon from '../../assets/arrowupandown.svg';
import deleteChargeIcon from '../../assets/deleteChargeIcon.svg';
import editChargeIcon from '../../assets/editChargeIcon.svg';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import formatDate from '../../utils/format/formatDate';
import formatValue from '../../utils/format/formatValue';
import { compareAsc } from 'date-fns';
import './styles.css';

function TableChargesByClient() {
  const {
    chargesByClient,
    setShowModalCharges,
    clientDataInfos,
    setShowPopupDelete,
    setDeletingCharge,
    setShowModalChargeDetail,
  } = useGlobalContext();

  const currentDate = new Date();

  function handleDelete(charge) {
    setShowPopupDelete(true);
    setDeletingCharge(charge);
  }

  return (
    <div className="container-charges">
      <div className="charges-by-client">
        <div className="charges-by-client__header">
          <h1>Cobranças do cliente</h1>
          <button onClick={() => setShowModalCharges(clientDataInfos)}>
            <img src={addChargeIcon} alt="add charge icon" />
            <span>Nova cobrança</span>
          </button>
        </div>
        <Grid container spacing={2} className="charges-by-client__data">
          <Grid item xs={1.9}>
            <div className="charges-by-client__arrow">
              <img src={ArrowUpDownIcon} alt="ArrowUpDownIcon" />
              <p className="charges-by-client__data-title">ID Cob.</p>
            </div>
          </Grid>
          <Grid item xs={1.9}>
            <div className="charges-by-client__arrow">
              <img src={ArrowUpDownIcon} alt="ArrowUpDownIcon" />
              <p className="charges-by-client__data-title">Data de venc.</p>
            </div>
          </Grid>
          <Grid item xs={1.9}>
            <p className="charges-by-client__data-title">Valor</p>
          </Grid>
          <Grid item xs={1.9}>
            <p className="charges-by-client__data-title">Status</p>
          </Grid>
          <Grid item xs={3}>
            <p className="charges-by-client__data-title">Descrição</p>
          </Grid>
          <Grid item xs={1.4}></Grid>
        </Grid>
        {chargesByClient.map(charge => (
          <Grid
            container
            spacing={2}
            key={charge.id}
            className="charges-by-client__data clickable"
          >
            <Grid item xs={1.9}>
              <p
                onClick={() => setShowModalChargeDetail(charge)}
                className="charges-by-client__data-info"
              >
                {charge.id}
              </p>
            </Grid>
            <Grid item xs={1.9}>
              <p
                onClick={() => setShowModalChargeDetail(charge)}
                className="charges-by-client__data-info"
              >
                {formatDate(charge.duedate)}
              </p>
            </Grid>
            <Grid item xs={1.9}>
              <p
                onClick={() => setShowModalChargeDetail(charge)}
                className="charges-by-client__data-info"
              >
                {`R$ ` + formatValue(charge.value)}
              </p>
            </Grid>
            <Grid item xs={1.9}>
              <p
                onClick={() => setShowModalChargeDetail(charge)}
                className="charges-by-client__data-info"
              >
                <span
                  className={
                    charge.status
                      ? 'status-charges-table-dataClients__paid'
                      : compareAsc(currentDate, new Date(charge.duedate)) === -1
                      ? 'status-charges-table-dataClients__expected'
                      : 'status-charges-table-dataClients__overdue'
                  }
                >
                  {charge.status
                    ? 'Paga'
                    : compareAsc(currentDate, new Date(charge.duedate)) === -1
                    ? 'Pendente'
                    : 'Vencida'}
                </span>
              </p>
            </Grid>
            <Grid item xs={3}>
              <p
                onClick={() => setShowModalChargeDetail(charge)}
                className="charges-by-client__data-info"
              >
                {charge.description}
              </p>
            </Grid>
            <Grid item xs={1.4}>
              <div className="charges-by-client__icons">
                <img
                  className="cursor-pointer"
                  src={editChargeIcon}
                  alt="edit icon"
                />
                <img
                  className="cursor-pointer"
                  src={deleteChargeIcon}
                  alt="delete icon"
                  onClick={() => handleDelete(charge)}
                />
              </div>
            </Grid>
          </Grid>
        ))}
      </div>
    </div>
  );
}

export default TableChargesByClient;
