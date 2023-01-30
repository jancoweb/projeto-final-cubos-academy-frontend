import HomePink from '../../assets/home-pink.png';
import HomeGray from '../../assets/home-gray.png';
import ClientsGray from '../../assets/clients-gray.png';
import ClientsPink from '../../assets/clients-pink.png';
import ChargesGray from '../../assets/charges-gray.png';
import ChargesPink from '../../assets/charges-pink.png';
import getAllClients from '../../services/customer/getAllClients';

import { useGlobalContext } from '../../hooks/useGlobalContext';

function NavigateBar() {
  const {
    activeIcon,
    setActiveIcon,
    setClientDataInfos,
    setAllTransactionsType,
    setAllClientsType,
  } = useGlobalContext();

  function handleHomeIcon() {
    setActiveIcon({ home: true, clients: false, charges: false });
    setAllTransactionsType(false);
    setClientDataInfos(false);
    setAllClientsType('allClients');
  }

  async function handleClientIcon() {
    setActiveIcon({ home: false, clients: true, charges: false });
    setAllTransactionsType(false);
    setClientDataInfos(false);
    setAllClientsType('allClients');
  }

  function handleChargeIcon() {
    setActiveIcon({ home: false, clients: false, charges: true });
    setAllTransactionsType(false);
    setClientDataInfos(false);
    setAllClientsType('allClients');
  }

  return (
    <>
      <div
        className={
          activeIcon.home === false
            ? 'navigateBar-home'
            : 'navigateBar-home active-border'
        }
        onClick={() => handleHomeIcon()}
      >
        <img
          src={activeIcon.home === false ? HomeGray : HomePink}
          alt="HomeIcon"
        />
      </div>

      <div
        className={
          activeIcon.clients === false
            ? 'navigateBar-clients'
            : 'navigateBar-clients active-border'
        }
        onClick={() => handleClientIcon()}
      >
        <img
          src={activeIcon.clients === false ? ClientsGray : ClientsPink}
          alt="ClientsIcon"
        />
      </div>

      <div
        className={
          activeIcon.charges === false
            ? 'navigateBar-charges'
            : 'navigateBar-charges active-border'
        }
        onClick={() => handleChargeIcon()}
      >
        <img
          src={activeIcon.charges === false ? ChargesGray : ChargesPink}
          alt="ChargesIcon"
        />
      </div>
    </>
  );
}

export default NavigateBar;
