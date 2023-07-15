import React, { useEffect, useState } from 'react';
import { Auth as AuthComponent, App as AppComponent } from "./components/intex";

import { sendSocket, addSocketEvent, AuthContext, url } from './utils';
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
    sendSocket('login', {
      "login": 'user',
      "hash": 'x'
    });

    const params = new URLSearchParams();
    params.append('username', 'user');
    fetch(`http://${url}/isUsed/username?${params.toString()}`).then(respones => respones.json()).then(res => console.log("response:", res));
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
