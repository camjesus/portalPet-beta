import React from 'react';

const UserContext = React.createContext({
  id: '',
  name: '',
  apellido: '',
  email: '',
  telefono: '',
});

export default UserContext;
