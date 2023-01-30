import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BotaoEditarPerfil from '../../assets/bota-editar-perfil.png';
import BotaoSair from '../../assets/botao-logOut.png';
import GreenArrow from '../../assets/green-arrow.png';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import getUser from '../../services/user/getUser';
import capitalizeName from '../../utils/format/capitalizeName';
import formatName from '../../utils/format/formatName';
import { clear } from '../../utils/storage';

function ConteudoHeader() {
  const navigate = useNavigate();
  const { setShowModalUser, showModalUser } = useGlobalContext();
  const [showPopUpUser, setShowPopUpUser] = useState(false);
  const [userData, setUserData] = useState({});

  function handleLeave() {
    navigate('/');
    clear();
  }

  async function handleShowUserInfo() {
    const usuario = await getUser();

    const firstName = formatName(usuario.user.first_name);
    const lastName = formatName(usuario.user.last_name);

    const letraPrimeiroNome = firstName.slice(0, 1);
    const letraSobrenome = lastName.slice(0, 1);
    const nomeCapitalizado = await capitalizeName(firstName);

    setUserData({
      capitalizedName: nomeCapitalizado,
      first_name: firstName,
      last_name: lastName,
      siglaNome: (letraPrimeiroNome + letraSobrenome).toUpperCase(),
    });
  }

  useEffect(() => {
    handleShowUserInfo();
  }, [showModalUser]);

  return (
    <>
      <div className="main-header-rightSide">
        <h2>{userData.siglaNome}</h2>
        <p>{userData.capitalizedName}</p>
        <img
          onClick={() => setShowPopUpUser(!showPopUpUser)}
          src={GreenArrow}
          alt="green-arrow"
        />
        {showPopUpUser && (
          <div className="main-header-popUp">
            <img
              onClick={() => setShowModalUser(true)}
              src={BotaoEditarPerfil}
              alt="BotaoEditarPerfil"
            />
            <img
              onClick={() => handleLeave()}
              src={BotaoSair}
              alt="BotaoSair"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ConteudoHeader;
