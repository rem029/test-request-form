import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faSpinner,
  faChevronRight,
  faEnvelope,
  faPhone,
  faMapPin,
  faInfo,
} from '@fortawesome/free-solid-svg-icons';
import ReactFlagsSelect from 'react-flags-select';
import axios from 'axios';

import Container from './UI/Container';
import ContextGlobal from '../context/ContextGlobal';

import '../styles/regform.css';

const RegForm = (props) => {
  const contextGlobal = useContext(ContextGlobal);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [registrationInfo, setRegistrationInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    tel: '',
    country: '',
    description: '',
  });

  useEffect(() => {
    contextGlobal.setActiveLink('register');
  });

  const submitHandler = (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');
    setLoading(true);

    if (
      registrationInfo.firstname.length > 0 &&
      registrationInfo.lastname.length > 0 &&
      registrationInfo.email.length > 0 &&
      registrationInfo.tel.length > 0 &&
      registrationInfo.country.length > 0 &&
      registrationInfo.description.length > 0 &&
      !loading
    ) {
      axios
        .post('https://test-bin-yousef-default-rtdb.firebaseio.com/registers.json', { ...registrationInfo })
        .then((res) => {
          console.log('REGISTER RESPONSE', res);
          setRegisterSuccess('Successfully Registered');
          setLoading(false);
        })
        .catch((error) => {
          console.log('REGISTER ERROR', error);
          setLoading(false);
        });
    } else {
      setRegisterError('Error: All fields are required.');
      setLoading(false);
    }
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    contextGlobal.cancelHandler();
  };

  const inputHandler = (e) => {
    setRegisterError('');
    setRegistrationInfo((prevState) => {
      const info = { ...prevState, [e.target.name]: e.target.value };
      return info;
    });
  };

  const countryHandler = (country) => {
    setRegistrationInfo((prevState) => {
      const info = { ...prevState, country: country };
      return info;
    });
  };

  const descriptionHandler = (text) => {
    setRegistrationInfo((prevState) => {
      const info = { ...prevState, description: text };
      return info;
    });
  };

  return (
    <Container>
      <form
        action="submit"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <h1>Request Form</h1>
        <p>Please fill up the form.</p>

        <div className="form_registration__control">
          <div
            className={
              registerError.length > 0 ? 'form_registration__control__input error' : 'form_registration__control__input'
            }
          >
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              onChange={(e) => {
                inputHandler(e);
              }}
            />
          </div>

          <div
            className={
              registerError.length > 0 ? 'form_registration__control__input error' : 'form_registration__control__input'
            }
          >
            <FontAwesomeIcon icon={faChevronRight} />
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              onChange={(e) => {
                inputHandler(e);
              }}
            />
          </div>
        </div>

        <div className="form_registration__control">
          <div
            className={
              registerError.length > 0 ? 'form_registration__control__input error' : 'form_registration__control__input'
            }
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={(e) => {
                inputHandler(e);
              }}
            />
          </div>
        </div>

        <div className="form_registration__control">
          <div
            className={
              registerError.length > 0 ? 'form_registration__control__input error' : 'form_registration__control__input'
            }
          >
            <FontAwesomeIcon icon={faPhone} />
            <input
              type="tel"
              name="tel"
              placeholder="Mobile number"
              onChange={(e) => {
                inputHandler(e);
              }}
            />
          </div>
        </div>

        <div className="form_registration__control">
          <div
            className={
              registerError.length > 0 ? 'form_registration__control__input error' : 'form_registration__control__input'
            }
          >
            <FontAwesomeIcon icon={faMapPin} />
            <ReactFlagsSelect
              className="form_registration__control__dropdown"
              placeholder="Country"
              name="country"
              searchable
              selected={registrationInfo.country}
              onSelect={(country) => countryHandler(country)}
            />
          </div>
        </div>

        <div className="form_registration__control">
          <div
            className={
              registerError.length > 0 ? 'form_registration__control__input error' : 'form_registration__control__input'
            }
          >
            <FontAwesomeIcon icon={faInfo} />
            <textarea
              name="description"
              placeholder="Let us know what is your request."
              value={registrationInfo.description}
              onChange={(e) => {
                descriptionHandler(e.target.value);
              }}
            />
          </div>
        </div>

        {registerError.length > 0 && <p className="error-message">{registerError}</p>}
        {registerSuccess.length > 0 && <p>{registerSuccess}</p>}

        <div className="form_registration__control_button">
          <button
            className={'btn-main ' + document.body.classList.value}
            onClick={(e) => {
              submitHandler(e);
            }}
          >
            {loading ? (
              <div className="loading">
                <FontAwesomeIcon icon={faSpinner} />
              </div>
            ) : (
              'Sign Up'
            )}
          </button>

          <button
            className={'btn-secondary ' + document.body.classList.value}
            onClick={(e) => {
              cancelHandler(e);
            }}
          >
            Cancel
          </button>
        </div>
        <p>All fields are required.</p>
      </form>
    </Container>
  );
};

export default RegForm;
