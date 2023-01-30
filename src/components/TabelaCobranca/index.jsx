import { useGlobalContext } from '../../hooks/useGlobalContext';
import formatValue from '../../utils/format/formatValue';

function TabelaCobranca({ status }) {
  const {
    paidCharges,
    foreseenCharges,
    overdueCharges,
    setActiveIcon,
    setClientDataInfos,
    setAllTransactionsType,
  } = useGlobalContext();

  function localCharges(chargeStatus) {
    const charges =
      chargeStatus === 'paid'
        ? paidCharges.slice(0, 4)
        : chargeStatus === 'overdue'
          ? overdueCharges.slice(0, 4)
          : foreseenCharges.slice(0, 4);

    return charges;
  }

  const charges = localCharges(status);

  function handleAllCharges(status) {
    setActiveIcon({ home: false, clients: false, charges: true });
    setClientDataInfos(false);

    if (status === 'paid') {
      setAllTransactionsType('paid');
      return;
    }
    if (status === 'overdue') {
      setAllTransactionsType('overdue');
      return;
    }
    if (status === 'foreseen') {
      setAllTransactionsType('foreseen');
      return;
    }
  }

  return (
    <div>
      <div className="generalCharges-title">
        <h1>
          {`Cobranças 
        ${status === 'paid'
              ? 'Pagas'
              : status === 'overdue'
                ? 'Vencidas'
                : 'Previstas'
            }`}
        </h1>
        <p className={`generalCharges-title-${status}`}>
          {`${status === 'paid'
            ? paidCharges.length
            : status === 'overdue'
              ? overdueCharges.length
              : foreseenCharges.length
            }`.padStart(2, '0')}
        </p>
      </div>

      <div className="generalCharges-content">
        <div className="generalCharges-content-TypeOfdata">
          <p>Cliente</p>
          <p>ID da cob.</p>
          <p>Valor</p>
        </div>
        {charges.map(charge => (
          <div className="generalCharges-content-data" key={charge.id}>
            <p>{charge.name}</p>
            <p>{charge.id}</p>
            <p>{`R$ ` + formatValue(charge.value)}</p>
          </div>
        ))}
      </div>

      <div className="generalCharges-moreInfo">
        <p onClick={() => handleAllCharges(status)}>Ver todos</p>
      </div>
    </div>
  );
}

export default TabelaCobranca;
