import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import ThemeToggle from './ThemeToggle';

import '../styles/header.css';
import { useContext } from 'react';
import ContextGlobal from '../context/ContextGlobal';

const Header = (props) => {
  const contextGlobal = useContext(ContextGlobal);

  return (
    <header>
      <div className="header__items">
        <button>
          <FontAwesomeIcon icon={faEllipsisV} onClick={() => contextGlobal.sideBarToggle()} />
        </button>
        <h1>
          <FontAwesomeIcon icon={faAddressCard} />
          {/* <p className={document.body.classList.value}>Registration Form</p> */}
        </h1>
        <div className="header__items__theme">
          <label>Theme</label>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
