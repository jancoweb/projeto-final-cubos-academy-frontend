import { useState, useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';

export function useGlobalProvider() {
  const [clients, setClients] = useState([]);
  const [nonDefaultingClients, setNonDefaultingClients] = useState([]);
  const [defaulterClients, setDefaulterClients] = useState([]);
  const [clientDataInfos, setClientDataInfos] = useState(false);
  const [deletingCharge, setDeletingCharge] = useState();

  const [transactions, setTransactions] = useState([]);

  const [foreseenCharges, setForeseenCharges] = useState([]);
  const [paidCharges, setPaidCharges] = useState([]);
  const [overdueCharges, setOverdueCharges] = useState([]);
  const [allCharges, setAllCharges] = useState([]);
  const [chargesByClient, setChargesByClient] = useState([]);

  const [isEditingClient, setIsEditingClient] = useState(false);
  const [isEditingCharge, setIsEditingCharge] = useState(false);
  const [showModalClient, setShowModalClient] = useState(false);
  const [showModalUser, setShowModalUser] = useState(false);
  const [showModalCharges, setShowModalCharges] = useState(false);
  const [showModalChargeDetail, setShowModalChargeDetail] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [allTransactionsType, setAllTransactionsType] = useState(false);
  const [allClientsType, setAllClientsType] = useState('allClients');
  const [openPopUp, setOpenPopUp] = useState({
    error: false,
    success: false,
  });
  const [activeIcon, setActiveIcon] = useState({
    home: true,
    clients: false,
    charges: false,
  });

  return {
    isEditingClient,
    setIsEditingClient,
    showModalClient,
    setShowModalClient,
    showModalUser,
    setShowModalUser,
    showModalCharges,
    setShowModalCharges,
    setClients,
    clients,
    setNonDefaultingClients,
    nonDefaultingClients,
    setDefaulterClients,
    defaulterClients,
    setTransactions,
    transactions,
    activeIcon,
    setActiveIcon,
    setClientDataInfos,
    clientDataInfos,
    overdueCharges,
    foreseenCharges,
    paidCharges,
    allCharges,
    chargesByClient,
    setOverdueCharges,
    setForeseenCharges,
    setPaidCharges,
    setAllCharges,
    setChargesByClient,
    showPopupDelete,
    setShowPopupDelete,
    openPopUp,
    setOpenPopUp,
    showModalChargeDetail,
    setShowModalChargeDetail,
    deletingCharge,
    setDeletingCharge,
    allTransactionsType,
    setAllTransactionsType,
    allClientsType,
    setAllClientsType,
    isEditingCharge,
    setIsEditingCharge,
  };
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
