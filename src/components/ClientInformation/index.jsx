import editClientIcon from '../../assets/editClientIcon.svg';
import Grid from '@mui/material/Grid';
import './styles.css';
import { useGlobalContext } from '../../hooks/useGlobalContext';

function ClientInformation() {
  const {
    setIsEditingClient,
    setShowModalClient,
    clientDataInfos
  } = useGlobalContext();

  function handleEditClient() {
    setShowModalClient(true);
    setIsEditingClient(true)
  }

  const withoutInfo = "Não informado.";

  const client = {
    id: clientDataInfos.id,
    email: clientDataInfos.email || '',
    phone: clientDataInfos.phone || '',
    cpf: clientDataInfos.cpf || '',
    street: clientDataInfos.street || '',
    district: clientDataInfos.district || '',
    city: clientDataInfos.city || '',
    state: clientDataInfos.state || '',
    zip_code: clientDataInfos.zip_code || '',
    address_complement: clientDataInfos.address_complement || '',
  };

  return (
    <div className="container-client-information">
      <div className="client-information">
        <div className="client-information__header">
          <h1>Dados do cliente</h1>
          <button onClick={() => handleEditClient()}>
            <img src={editClientIcon} alt="edit icon" />
            <span>Editar cliente</span>
          </button>
        </div>
        <Grid className="client-information__grid" container spacing={3}>
          <Grid item xs={2.5}>
            <h3 className="client-information__titles">E-mail</h3>
            <span className="client-information__content">{client.email}</span>
          </Grid>
          <Grid item xs={2}>
            <h3 className="client-information__titles">Telefone</h3>
            <span className="client-information__content">{client.phone}</span>
          </Grid>
          <Grid item xs={2}>
            <h3 className="client-information__titles">CPF</h3>
            <span className="client-information__content">{client.cpf}</span>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={2.5}>
            <h3 className="client-information__titles">Endereço</h3>
            <span className="client-information__content">{client.street || withoutInfo}</span>
          </Grid>
          <Grid item xs={2}>
            <h3 className="client-information__titles">Bairro</h3>
            <span className="client-information__content">
              {client.district || withoutInfo}
            </span>
          </Grid>
          <Grid item xs={2}>
            <h3 className="client-information__titles">Complemento</h3>
            <span className="client-information__content">
              {client.address_complement || withoutInfo}
            </span>
          </Grid>
          <Grid item xs={2}>
            <h3 className="client-information__titles">CEP</h3>
            <span className="client-information__content">
              {client.zip_code || withoutInfo}
            </span>
          </Grid>
          <Grid item xs={2}>
            <h3 className="client-information__titles">Cidade</h3>
            <span className="client-information__content">{client.city || withoutInfo}</span>
          </Grid>
          <Grid item xs={1.5}>
            <h3 className="client-information__titles">Estado</h3>
            <span className="client-information__content">{client.state || withoutInfo}</span>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ClientInformation;
