import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faSpinner } from '@fortawesome/free-solid-svg-icons';

import Container from './UI/Container';
import ContextGlobal from '../context/ContextGlobal';

import '../styles/login.css';
import '../styles/button.css';

const Login = (props) => {
  const contextGlobal = useContext(ContextGlobal);
  const [showPassword, toggleShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    contextGlobal.setActiveLink('login');
  });

  const onToggleShowPassword = (e) => {
    toggleShowPassword((prevState) => !showPassword);
  };

  const inputHandler = (e) => {
    setLoginError('');
    setLoginInfo((prevState) => {
      const info = { ...prevState, [e.target.name]: e.target.value };
      console.log('userinfo', info);
      return info;
    });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    if (loginInfo.username.length > 0 && loginInfo.password.length > 0 && !loading) {
      contextGlobal.setLoginInfo(loginInfo);

      axios
        .post('https://test-bin-yousef-default-rtdb.firebaseio.com/login.json', { ...loginInfo })
        .then((res) => {
          console.log('LOGIN RESPONSE', res);
          setLoading(false);
        })
        .catch((error) => {
          console.log('LOGIN ERROR', error);
          setLoading(false);
        });
    } else {
      setLoginError('Error: username and password are required.');
      setLoading(false);
    }
  };

  return (
    <Container>
      <form
        action="submit"
        onSubmit={(e) => {
          loginHandler(e);
        }}
      >
        <h1>Login</h1>
        <p>Please enter your credentials</p>

        <div className="form__control">
          <div className={loginError.length > 0 ? 'form__control__input error' : 'form__control__input'}>
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={(e) => {
                inputHandler(e);
              }}
            />
          </div>
        </div>

        <div className="form__control">
          <div className={loginError.length > 0 ? 'form__control__input error' : 'form__control__input'}>
            <FontAwesomeIcon icon={faLock} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              onChange={(e) => {
                inputHandler(e);
              }}
            />
          </div>
        </div>

        <div className="form__control__checkbox">
          <label>SHOW PASSWORD</label>
          <input
            type="checkbox"
            value={showPassword}
            onClick={(e) => {
              onToggleShowPassword(e);
            }}
          />
        </div>
        {loginError.length > 0 && <p className="error-message">{loginError}</p>}
        <div className="form__control">
          <button
            className={'btn-main ' + document.body.classList.value}
            onClick={(e) => {
              loginHandler(e);
            }}
          >
            {loading ? (
              <div className="loading">
                <FontAwesomeIcon icon={faSpinner} />
              </div>
            ) : (
              'Login'
            )}
          </button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
