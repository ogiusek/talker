import React, { useState } from 'react';
import './App.scss';
import { sendSocket, addSocketEvent, AuthContext } from './utils';

function App() {
  const [socketAddress, setAddress] = useState('');
  const [userId, setUserId] = useState<Number>();

  addSocketEvent('address', data => {
    setAddress(data.address);
  });

  addSocketEvent('login', data => {
    setUserId(data.id);
  });

  sendSocket('login', {
    "login": 'user',
    "hash": 'x'
  });

  return (
    <AuthContext.Provider value={{
      socketAddress,
      userId
    }}>
      <div>
        {socketAddress}
        <br></br>
        {userId?.toString()}
      </div>
    </AuthContext.Provider>
  );
}
export default App;
