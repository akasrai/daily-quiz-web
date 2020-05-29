import React from 'react';
import AuthenticatedLayout from 'ui/layout/authenticated.layout';

const DashboardView = () => {
  return (
    <AuthenticatedLayout>
      <div className="login-layout">Fuck Dashboard</div>
    </AuthenticatedLayout>
  );
};

export default DashboardView;
