import React, { useEffect, useState } from 'react';
import {
  Auth as AuthComponent,
  App as AppComponent
} from "./components/intex";

import { addSocketEvent, AuthContext, restUrl } from './utils';
import './App.scss';

function App() {
  const [socketAddress, setAddress] = useState('');
  const [userId, setUserId] = useState<Number>();

  addSocketEvent('address', data => {
    setAddress(data.address);
  });

  addSocketEvent('login', data => {
    setUserId(data.id);
  });

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('username', 'user');
    fetch(`${restUrl}/isUsed/username?${params.toString()}`).then(respones => respones.json()).then(res => console.log("response:", res));
  }, []);


  return (
    <AuthContext.Provider value={{
      socketAddress,
      userId
    }}>
      {userId !== undefined ?
        (<AppComponent />) :
        (<AuthComponent />)}
    </AuthContext.Provider>
  );
}
export default App;
