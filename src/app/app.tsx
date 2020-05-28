import React from 'react';

import { useAuth } from 'auth/auth.hooks';
import { AuthContextProvider } from 'auth/auth.context';
import AppRoutes from './app.routes';

const App = () => {
  const currentAuth = useAuth();

  return (
    <AuthContextProvider value={currentAuth}>
      <AppRoutes />
    </AuthContextProvider>
  );
};

export default App;
