import '../../styles/main.css';

import ModalClient from '../../components/ModalClient';
import ModalEditUser from '../../components/ModalEditUser';
import ModalCreateCharge from '../../components/ModalCreateCharge';
import ModalChargeDetails from '../../components/ModalChargeDetails';
import PopUpVariable from '../../components/PopUpVariable';

import NavigateBar from '../../components/NavigateBar';

import Charges from '../../components/Charges';
import Clients from '../../components/Clients';
import Home from '../../components/Home';

import { useEffect } from 'react';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import getAllClients from '../../services/customer/getAllClients';
import getClientsByChargeStatus from '../../services/customer/getClientsByChargeStatus';
import getChargesByStatus from '../../services/charges/getChargesByStatus';
import getCharges from '../../services/charges/getCharges';
import ConfirmDeletePopup from '../../components/ConfirmDeletePopup';

function Main() {
  const {
    showModalUser,
    showModalClient,
    showModalCharges,
    showModalChargeDetail,
    showPopupDelete,
    activeIcon,
    setClients,
    setNonDefaultingClients,
    setDefaulterClients,
    setOverdueCharges,
    setPaidCharges,
    setForeseenCharges,
    setAllCharges,
  } = useGlobalContext();

  useEffect(() => {
    (async function () {
      const response = await getAllClients();
      setClients(response.clients);

      const nonDefaulting = await getClientsByChargeStatus('adimplente');
      setNonDefaultingClients(nonDefaulting.clients);

      const defaulter = await getClientsByChargeStatus('inadimplente');
      setDefaulterClients(defaulter.clients);
    })();
  }, [showModalClient]);

  useEffect(() => {
    (async function () {
      const foreseenCharges = await getChargesByStatus('previstas');
      setForeseenCharges(foreseenCharges.charges);

      const overdueCharges = await getChargesByStatus('vencidas');
      setOverdueCharges(overdueCharges.charges);

      const paidCharges = await getChargesByStatus('pagas');
      setPaidCharges(paidCharges.charges);

      const allCharges = await getCharges();
      setAllCharges(allCharges.charges);

    })();
  }, [showModalCharges, showPopupDelete]);

  useEffect(() => {
    (async function () {
      if (activeIcon.home) {
        const foreseenCharges = await getChargesByStatus('previstas');
        setForeseenCharges(foreseenCharges.charges);

        const overdueCharges = await getChargesByStatus('vencidas');
        setOverdueCharges(overdueCharges.charges);

        const paidCharges = await getChargesByStatus('pagas');
        setPaidCharges(paidCharges.charges);
      }
    })();
  }, [activeIcon]);

  return (
    <div className="container-main">
      <div className="main-navigateBar">
        <NavigateBar />
      </div>

      {activeIcon.home && <Home />}
      {activeIcon.clients && <Clients />}
      {activeIcon.charges && <Charges />}

      {showModalUser && <ModalEditUser />}
      {showModalClient && <ModalClient />}
      {showModalCharges && <ModalCreateCharge />}
      {showPopupDelete && <ConfirmDeletePopup />}
      {showModalChargeDetail && <ModalChargeDetails />}

      <PopUpVariable />
    </div>
  );
}

export default Main;
