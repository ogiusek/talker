import React, { useEffect, useState } from 'react';
import {
  Auth as AuthComponent,
  App as AppComponent
} from "./components/intex";

import { addSocketEvent, AuthContext } from './utils';
import './App.scss';
import { SetRefresher } from 'stupid-react-router';

function App() {
  const [refresher, setRefresher] = useState(false);

  const [socketAddress, setAddress] = useState('');
  const [userId, setUserId] = useState<Number>(-1);

  useEffect(() => {
    addSocketEvent('address', data => {
      setAddress(data.address);
    });

    addSocketEvent('login', data => {
      if (data === false) {
        localStorage.removeItem('login');
        localStorage.removeItem('password');
        // @ts-ignore
        setUserId(-(Math.abs(userId) + 1));
      } else {
        setUserId(data.id);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{
      socketAddress,
      userId,
      setUserId,
      refresh: () => { setRefresher(!refresher) }
    }}>
      <SetRefresher state={refresher} setState={setRefresher} />
      {/* @ts-ignore */}
      {((userId !== undefined || userId !== null) && (userId >= 0)) ?
        (<AppComponent />) :
        (!localStorage.getItem('login') && <AuthComponent />)}
    </AuthContext.Provider>
  );
}

export default App;
