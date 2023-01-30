import IconEmDias from '../../assets/icon-emDias.png';
import IconInadimplente from '../../assets/icon-inadimplente.svg';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import formatDate from '../../utils/format/formatDate';
import formatValue from '../../utils/format/formatValue';

function ClientsByStatus({ status }) {
  const {
    nonDefaultingClients,
    defaulterClients,
    setActiveIcon,
    setClientDataInfos,
    setAllClientsType
  } = useGlobalContext();

  const clients = status
    ? nonDefaultingClients.slice(0, 4)
    : defaulterClients.slice(0, 4);

  function handleAllClients(status) {
    setActiveIcon({ home: false, clients: true, charges: false });
    setClientDataInfos(false);
    setAllClientsType(status);
  }

  return (
    <div className="container-clientStatus-table">
      <div className="clientStatus-table-title">
        <h1>
          <img src={status ? IconEmDias : IconInadimplente} />
          {`${status ? 'Clientes Em Dia' : 'Clientes Inadimplentes'}`}
        </h1>
        <p
          className={`clientStatus-table-title__${status ? 'non-defaulting' : 'defaulter'}`}
        >
          {`${status ? nonDefaultingClients.length : defaulterClients.length
            }`.padStart(2, '0')}
        </p>
      </div>
      <div>
        <div className="clientStatus-table-typeOfData">
          <h1>Clientes</h1>
          <h1>Data de venc.</h1>
          <h1>Valor</h1>
        </div>
      </div>
      {clients.map(client => (
        <div className="clientStatus-table-body" key={client.id}>
          <p>{client.name}</p>
          <p>{formatDate(client.duedate)}</p>
          <p>{`R$ ` + formatValue(client.value)}</p>
        </div>
      ))}
      <div className="clientStatus-btn">
        <p onClick={() => handleAllClients(status)}>Ver todos</p>
      </div>
    </div>
  );
}

export default ClientsByStatus;
