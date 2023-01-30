import '../../styles/main.css';

import ConteudoHeader from '../../components/ConteudoHeader';
import ListarTodasAsCobrancas from '../ListarTodasAsCobrancas';

function Charges() {
  return (
    <div className="main-home-generalContent">
      <header className="main-generalContent-header">
        <h1 className="header-title-home">Resumo das cobranças</h1>
        <ConteudoHeader />
      </header>

      <ListarTodasAsCobrancas />
    </div>
  );
}

export default Charges;
