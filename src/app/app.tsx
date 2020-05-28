import React from 'react';

import { useAuth } from 'auth/auth.hooks';
import { AuthContextProvider } from 'auth/auth.context';

const App = () => {
  const currentAuth = useAuth();

  return (
    <AuthContextProvider value={currentAuth}>
      <div>Fuck You {process.env.REACT_APP_API_BASE_URL}</div>
    </AuthContextProvider>
  );
};

export default App;
