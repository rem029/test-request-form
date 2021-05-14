import { createPortal } from 'react-dom';
import ContextGlobal from '../../context/ContextGlobal';

import '../../styles/backdrop.css';

const Backdrop = (props) => {
  return createPortal(
    <ContextGlobal.Consumer>
      {(context) => {
        const backDropStyle = context.sideBar ? 'backdrop-open' : '';
        return (
          <div
            className={'backdrop ' + backDropStyle}
            onClick={() => {
              context.sideBarToggle();
            }}
          >
            {props.children}
          </div>
        );
      }}
    </ContextGlobal.Consumer>,
    document.getElementById('root-backdrop')
  );
};

export default Backdrop;
