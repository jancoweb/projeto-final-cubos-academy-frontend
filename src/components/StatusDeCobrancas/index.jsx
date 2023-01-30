import './styles.css';

import CobrancaPaga from '../../assets/icone-cobranca-paga.png';
import CobrancaPrevista from '../../assets/icone-corbranca-prevista.png';
import CobrancaVencida from '../../assets/icone-corbranca-vencida.png';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import formatValue from '../../utils/format/formatValue';

function StatusDeCobrancas() {

  const { paidCharges, overdueCharges, foreseenCharges } = useGlobalContext();
  let paid = 0;
  let overdue = 0;
  let foreseen = 0;

  paidCharges.forEach(charge => {
    paid = paid + charge.value;
  });

  overdueCharges.forEach(charge => {
    overdue = overdue + charge.value;
  });

  foreseenCharges.forEach(charge => {
    foreseen = foreseen + charge.value;
  });

  return (
    <div className="main-status">
      <div className="main-paid-charges">
        <img src={CobrancaPaga} alt="CobrancaPaga" />
        <div className="paid-charges-infos">
          <h1>Cobranças Pagas</h1>
          <p>R$ {formatValue(paid)}</p>
        </div>
      </div>
      <div className="main-overdue-charges">
        <img src={CobrancaVencida} alt="CobrancaVencida" />
        <div className="overdue-charges-infos">
          <h1>Cobranças Vencidas</h1>
          <p>R$ {formatValue(overdue)}</p>
        </div>
      </div>
      <div className="main-anticipated-charges">
        <img src={CobrancaPrevista} alt="CobrancaPrevista" />
        <div className="anticipated-charges-infos">
          <h1>Cobranças Previstas</h1>
          <p>R$ {formatValue(foreseen)}</p>
        </div>
      </div>
    </div>
  );
}

export default StatusDeCobrancas;
