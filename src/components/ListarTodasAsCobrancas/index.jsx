import './styles.css';

import ArrowUpDownIcon from '../../assets/arrowupandown.svg';
import botaoEditarCobranca from '../../assets/botao-editar-cobranca.svg';
import botaoExcluirCobranca from '../../assets/botao-excluir-cobranca.svg';
import FilterIcon from '../../assets/filtericon.svg';
import SearchIcon from '../../assets/search-icon.svg';
import chargesIcon from '../../assets/charges-icon-clean.svg';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import formatDate from '../../utils/format/formatDate';
import formatValue from '../../utils/format/formatValue';
import { compareAsc } from 'date-fns';
import { useState } from 'react';

function ListarTodasAsCobrancas() {
  const {
    allCharges,
    setShowPopupDelete,
    setShowModalChargeDetail,
    setDeletingCharge,
    allTransactionsType,
    paidCharges,
    overdueCharges,
    foreseenCharges,
    setShowModalCharges,
    setIsEditingCharge,
  } = useGlobalContext();

  const currentDate = new Date();

  function handleDelete(charge) {
    setShowPopupDelete(true);
    setDeletingCharge(charge);
  }

  function handleEdit(charge) {
    setShowModalCharges(charge);
    setIsEditingCharge(charge);
  }

  function findCharges(chargesType) {
    const charges =
      chargesType === 'paid'
        ? paidCharges
        : chargesType === 'overdue'
        ? overdueCharges
        : chargesType === 'foreseen'
        ? foreseenCharges
        : allCharges;

    return charges;
  }

  const localCharges = findCharges(allTransactionsType);
  const [search, setSearch] = useState('');

  const filteredCharges = localCharges.filter(
    charge =>
      charge.name.toLowerCase().startsWith(search.toLowerCase()) ||
      charge.id.toString().startsWith(search.toLowerCase()),
  );

  return (
    <div className="main-generalStatus-charges">
      <div className="status-charges-title">
        <div className="status-charges-title-left">
          <img src={chargesIcon} alt="chargesIcon" />
          <h1>Cobranças</h1>
        </div>

        <div className="status-charges-title-right">
          <img
            className="filter-icon-charges"
            src={FilterIcon}
            alt="FilterIcon"
          />
          <input
            className="filter-input-charges"
            type="text"
            placeholder="Pesquisa"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <img
            className="magnifier-icon-charges"
            src={SearchIcon}
            alt="SearchIcon"
          />
        </div>
      </div>

      <div className="status-charges-table">
        <div className="status-charges-table-dataTitle">
          <p>
            <img src={ArrowUpDownIcon} alt="ArrowUpDownIcon" /> Cliente
          </p>
          <p>
            <img src={ArrowUpDownIcon} alt="ArrowUpDownIcon" /> ID Cob.
          </p>
          <p>Valor</p>
          <p>Data de venc.</p>
          <p>Status</p>
          <p>Descrição</p>
        </div>
        {filteredCharges.map(charge => (
          <div className="status-charges-table-dataClients" key={charge.id}>
            <div className="status-charges-table-dataClientsClickable ">
              <p onClick={() => setShowModalChargeDetail(charge)}>
                {charge.name}
              </p>
              <p onClick={() => setShowModalChargeDetail(charge)}>
                {charge.id}
              </p>
              <p onClick={() => setShowModalChargeDetail(charge)}>
                {`R$ ` + formatValue(charge.value)}
              </p>
              <p onClick={() => setShowModalChargeDetail(charge)}>
                {formatDate(charge.duedate)}
              </p>
              <p onClick={() => setShowModalChargeDetail(charge)}>
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
              <p onClick={() => setShowModalChargeDetail(charge)}>
                {charge.description}
              </p>
            </div>

            <img
              onClick={() => handleEdit(charge)}
              src={botaoEditarCobranca}
              alt="botaoEditarCobranca"
            />
            <img
              onClick={() => handleDelete(charge)}
              src={botaoExcluirCobranca}
              alt="ArrowUpDownIcon"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListarTodasAsCobrancas;
