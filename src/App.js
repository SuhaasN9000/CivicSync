import React from 'react';
import { CivicProvider, useCivic } from './context/CivicContext';
import LoginScreen from './components/auth/LoginScreen';
import UserAppContainer from './components/user/UserAppContainer';
import WorkerAppContainer from './components/worker/WorkerAppContainer';
import AdminDashboardContainer from './components/admin/AdminDashboardContainer';

function MainApp() {
  const { currentUser } = useCivic();

  // Always land on the login page if not authenticated
  if (!currentUser) {
    return <LoginScreen />;
  }

  return (
    <div className="civicsync-portal-root">
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
