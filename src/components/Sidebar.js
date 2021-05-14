import Backdrop from './UI/Backdrop';
import SideBarLinks from './SideBarLinks';
import ContextGlobal from '../context/ContextGlobal';

import '../styles/sidebar.css';

const SideBar = (props) => {
  const links = [
    {
      text: 'Login',
      link: 'login',
    },
    {
      text: 'Request',
      link: 'request',
    },
    {
      text: 'Request List',
      link: 'request-list',
    },
  ];

  return (
    <ContextGlobal.Consumer>
      {(context) => {
        const sideBarStyle = 'sidebar ' + document.body.classList.value;
        const sideBarOpen = context.sideBar ? 'sidebar-open' : '';
        return (
          <Backdrop>
            <div className={sideBarStyle + ' ' + sideBarOpen}>
              <nav>
                <ul>
                  {links.map((link, id) => {
                    return (
                      <SideBarLinks
                        key={id}
                        link={link.link}
                        text={link.text}
                        onClick={() => {
                          context.sideBarToggle();
                        }}
                      />
                    );
                  })}
                </ul>
              </nav>
            </div>
          </Backdrop>
        );
      }}
    </ContextGlobal.Consumer>
  );
};

export default SideBar;
