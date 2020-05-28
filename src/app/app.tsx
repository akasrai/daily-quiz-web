import React from 'react';

import AppRoutes from './app.routes';
import { useAuth } from 'auth/auth.hooks';
import { AuthContextProvider } from 'auth/auth.context';

const App = () => {
  const currentAuth = useAuth();

  return (
    <AuthContextProvider value={currentAuth}>
      <AppRoutes />
    </AuthContextProvider>
  );
};

export default App;
