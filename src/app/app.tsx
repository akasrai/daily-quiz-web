import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import AppRoutes from './app.routes';
import { useAuth } from 'auth/auth.hooks';
import { AuthContextProvider } from 'auth/auth.context';

const GettingThingsReady = () => {
  return (
    <div className="container-loader w-100">
      <h5 className="mt-5 pt-5 text-blink text-center text-muted">
        Getting things Ready!
      </h5>
    </div>
  );
};

const App = () => {
  const currentAuth = useAuth();

  return (
    <Suspense fallback={<GettingThingsReady />}>
      <AuthContextProvider value={currentAuth}>
        <ToastContainer autoClose={5000} />
        <AppRoutes />
      </AuthContextProvider>
    </Suspense>
  );
};

export default App;
