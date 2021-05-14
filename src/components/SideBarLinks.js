import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import '../styles/sidebarlinks.css';
import ContextGlobal from '../context/ContextGlobal';

const SideBarLinks = (props) => {
  return (
    <ContextGlobal.Consumer>
      {(context) => {
        const activeLinkStyle = context.activeLink === props.link ? 'link-active' : '';
        return (
          <li>
            <Link className={activeLinkStyle} to={'/' + props.link}>
              {props.text}
            </Link>
            <p>
              <FontAwesomeIcon icon={faChevronRight} />
            </p>
          </li>
        );
      }}
    </ContextGlobal.Consumer>
  );
};

export default SideBarLinks;
