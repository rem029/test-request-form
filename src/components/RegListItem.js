import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Container from './UI/Container';

import '../styles/reglistitem.css';

const RegListItem = (props) => {
  const register = props.register;
  const registerID = props.id;

  const onDelete = () => {
    axios
      .delete(`https://test-bin-yousef-default-rtdb.firebaseio.com/registers/${registerID}.json`)
      .then((res) => console.log('SUCCESS', res))
      .catch((error) => {
        console.log('ERROR', error);
      });
    setTimeout(() => {
      props.refreshData();
    }, 1000);
  };

  return (
    <Container>
      <div className="register-list-item">
        <button
          onClick={() => {
            onDelete();
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>{register.firstname + ' ' + register.lastname}</h2>
        <p>{register.email}</p>
        <h3>{register.tel}</h3>
        <h3>{register.country}</h3>
        <p>{register.description}</p>
      </div>
    </Container>
  );
};

export default RegListItem;
