import React from 'react';
import { CivicProvider, useCivic } from './context/CivicContext';
import LoginScreen from './components/auth/LoginScreen';
import UserAppContainer from './components/user/UserAppContainer';
import WorkerAppContainer from './components/worker/WorkerAppContainer';
import AdminDashboardContainer from './components/admin/AdminDashboardContainer';

function MainApp() {
  const { currentUser, error } = useCivic();

  const errorBanner = error && (
    <div role="alert" style={{ background: '#FEE2E2', color: '#B91C1C', padding: '8px 16px', fontSize: '13px', textAlign: 'center' }}>
      {error}
    </div>
  );

  // Always land on the login page if not authenticated
  if (!currentUser) {
    return (
      <>
        {errorBanner}
        <LoginScreen />
      </>
    );
  }

  return (
    <div className="civicsync-portal-root">
      {errorBanner}
      {currentUser.role === 'citizen' && <UserAppContainer />}
      {currentUser.role === 'worker' && <WorkerAppContainer />}
      {currentUser.role === 'admin' && <AdminDashboardContainer />}
    </div>
  );
}

function App() {
  return (
    <CivicProvider>
      <MainApp />
    </CivicProvider>
  );
}

export default App;
