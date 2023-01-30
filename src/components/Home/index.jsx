import '../../styles/main.css';

import ConteudoHeader from '../../components/ConteudoHeader';
import ClientsByStatus from '../../components/ClientsByStatus';
import StatusDeCobrancas from '../../components/StatusDeCobrancas';
import TabelaCobranca from '../../components/TabelaCobranca';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import { getItem } from '../../utils/storage';
import api from '../../services/api';
import { useEffect } from 'react';

function Home() {

  const chargeStatus = ['paid', 'overdue', 'foreseen'];
  const { clients, overdueCharges } = useGlobalContext();

  async function checkStatus() {
    const token = getItem('token');
    try {
      let isOverdue = overdueCharges.filter((charge) => {
        for (let client of clients) {
          if (charge.client_id == client.id) return client
        };
      })
      isOverdue.forEach(async (client) => {
        await api.patch(`/client/${client.client_id}`, { status: client.status }, { headers: { 'Authorization': `Bearer ${token}` } });
      });

    } catch (error) {

    }
  }
  checkStatus()

  return (
    <div className="main-home-generalContent">
      <header className="main-generalContent-header">
        <h1 className="header-title-home">Resumo das cobranças</h1>
        <ConteudoHeader />
      </header>
      <div className="main-status">
        <StatusDeCobrancas />
      </div>
      <div className="main-generalCharges">
        {chargeStatus.map(status => (
          <div key={status} className={`generalCharges-${status}`}>
            <TabelaCobranca status={status} />
          </div>
        ))}
      </div>
      <div className="main-clients-status">
        <ClientsByStatus status={false} />
        <ClientsByStatus status={true} />
      </div>
    </div>
  );
}

export default Home;