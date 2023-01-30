import '../../styles/main.css';

import ConteudoHeader from '../../components/ConteudoHeader';
import ListarTodosOsClientes from '../../components/ListarTodosOsClientes';
import ClientInformation from '../../components/ClientInformation';
import TableChargesByClient from '../TableChargesByClient';
import ClientIcon from '../../assets/client-icon.svg';
import { useGlobalContext } from '../../hooks/useGlobalContext';

function Clients() {
  const { clientDataInfos, setClientDataInfos } = useGlobalContext();

  return (
    <div className="main-home-generalContent">
      <header className="main-generalContent-header">
        <div className="header-title-clients">
          {!clientDataInfos ? (
            <h1>Clientes</h1>
          ) : (
            <h1
              className="header-title-backToClients"
              onClick={() => setClientDataInfos(false)}
            >
              Clientes
            </h1>
          )}
          {clientDataInfos && <p>{'>'} Detalhes do cliente</p>}
        </div>
        <ConteudoHeader />
      </header>

      {!clientDataInfos && (
        <div className="main-generalStatus-clients">
          <ListarTodosOsClientes />
        </div>
      )}

      {clientDataInfos && (
        <div className="main-especificStatus-client">
          <div className="main-specificClient-name">
            <img src={ClientIcon} alt="ClientsgrayIcon" />
            <p>{clientDataInfos.name}</p>
          </div>
          <ClientInformation />
          <TableChargesByClient />
        </div>
      )}
    </div>
  );
}

export default Clients;
