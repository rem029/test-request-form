import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import RegListItem from './RegListItem.js';
import ContextGlobal from '../context/ContextGlobal';

import '../styles/reglist.css';
import '../styles/spinner.css';

const RegList = (props) => {
  const contextGlobal = useContext(ContextGlobal);
  const [registers, setRegisters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshData, setRefreshData] = useState(true);

  useEffect(() => {
    contextGlobal.setActiveLink('register-list');
    if (refreshData) {
      refreshRegister();
    }
  });

  const refreshRegister = () => {
    setLoading(true);
    axios
      .get('https://test-bin-yousef-default-rtdb.firebaseio.com/registers.json')
      .then((res) => {
        const responseData = Object.entries(res.data);
        setRegisters(responseData);
        setLoading(false);
      })
      .catch((error) => {
        console.log('ERROR', error);
        setRegisters([]);
        setLoading(false);
      });
    setRefreshData(false);
  };

  const onRefreshData = () => {
    setRefreshData(true);
  };

  return (
    <div className="register-list">
      <h1>Requests List</h1>
      {loading ? (
        <p className="spinner-bg">
          <FontAwesomeIcon icon={faSpinner} />
        </p>
      ) : (
        <React.Fragment>
          {registers.map((register) => {
            return (
              <RegListItem key={register[0]} id={register[0]} register={register[1]} refreshData={refreshRegister} />
            );
          })}
        </React.Fragment>
      )}
    </div>
  );
};

export default RegList;
