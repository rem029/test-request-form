import ContextGlobal from '../context/ContextGlobal';
import '../styles/buttonToggle.css';

const ThemeToggle = (props) => {
  return (
    <ContextGlobal.Consumer>
      {(context) => {
        return (
          <div
            className={context.theme ? 'container__btn-toggle' : 'container__btn-toggle container__btn-toggle-selected'}
          >
            <button
              className={context.theme ? 'btn-toggle-selected' : ''}
              onClick={(e) => {
                context.themeToggle(e);
              }}
            ></button>
          </div>
        );
      }}
    </ContextGlobal.Consumer>
  );
};

export default ThemeToggle;
