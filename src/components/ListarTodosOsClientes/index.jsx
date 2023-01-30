import './styles.css';

import ArrowUpDownIcon from '../../assets/arrowupandown.svg';
import AvatarIcon from '../../assets/avataricon.svg';
import ChargeIcon from '../../assets/charge.svg';
import FilterIcon from '../../assets/filtericon.svg';
import SearchIcon from '../../assets/search-icon.svg';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import getCharges from '../../services/charges/getCharges';
import { useState } from 'react';
import formatName from '../../utils/format/formatName';

function ListarTodosOsClientes() {
  const {
    setShowModalClient,
    setShowModalCharges,
    clients,
    nonDefaultingClients,
    defaulterClients,
    setClientDataInfos,
    setChargesByClient,
    allClientsType,
  } = useGlobalContext();

  async function handleSetClientInfo(client) {
    setClientDataInfos(client);

    const chargesByClient = await getCharges(client.id);
    setChargesByClient(chargesByClient.charges);
  }

  function findClients(clientType) {
    const localClients =
      clientType === 'allClients'
        ? clients
        : !clientType
          ? defaulterClients
          : nonDefaultingClients

    return localClients;
  }

  const localClients = findClients(allClientsType);
  const [search, setSearch] = useState('');

  const filteredClients = localClients.filter(client =>
    client.name.toLowerCase().startsWith(search.toLowerCase())
    || client.cpf.startsWith(search.toLowerCase())
    || client.email.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <div className="main-generalStatus-clients">
      <div className="status-clients-title">
        <div className="status-clients-title-left">
          <img src={AvatarIcon} alt="AvatarIcon" />
          <h1>Clientes</h1>
        </div>
        <div className="status-clients-title-right">
          <button onClick={() => setShowModalClient(true)}>
            + Adicionar cliente
          </button>
          <img
            className="filter-icon-clients"
            src={FilterIcon}
            alt="FilterIcon"
          />
          <input
            className="filter-input-clients"
            type="text"
            placeholder="Pesquisa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            className="magnifier-icon-clients"
            src={SearchIcon}
            alt="SearchIcon"
          />
        </div>
      </div>

      <div className="status-clients-table">
        <div className="status-clients-table-dataTitle">
          <p>
            <img src={ArrowUpDownIcon} alt="ArrowUpDownIcon" /> Cliente
          </p>
          <p>CPF</p>
          <p>E-mail</p>
          <p>Telefone</p>
          <p>Status</p>
          <p>Criar Cobrança</p>
        </div>
        {filteredClients.map(client => (
          <div className="status-clients-table-dataClients" key={client.id}>
            <p onClick={() => handleSetClientInfo(client)}>{client.name}</p>
            <p onClick={() => handleSetClientInfo(client)}>{client.cpf}</p>
            <p onClick={() => handleSetClientInfo(client)}>{client.email}</p>
            <p onClick={() => handleSetClientInfo(client)}>{client.phone}</p>
            <p>
              <span
                className={`status-clients-table-dataClients__${client.charge_status ? 'non-defaulting' : 'defaulter'
                  }`}
                onClick={() => handleSetClientInfo(client)}
              >
                {client.charge_status ? 'Em dia' : 'Inadimplente'}
              </span>
            </p>
            <p>
              <img
                onClick={() => setShowModalCharges(client)}
                className="icon-chargeClient"
                src={ChargeIcon}
                alt="ChargeIcon"
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListarTodosOsClientes;
