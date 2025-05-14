import './App.css'
import { lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import { AuthProvider } from './contexts/AuthProvider';

const Home = lazy(() => import('./pages/home'));
const AdminLogin = lazy(() => import('./pages/admin/login'));
const AdminRegister = lazy(() => import('./pages/admin/register'));
const AdminPage = lazy(() => import('./pages/admin'));
const FaqManager = lazy(() => import('./pages/admin/faq-manager'));
const PackageManager = lazy(() => import('./pages/admin/package-manager'));
const PackageMetadataInterpretationManager = lazy(() => import('./pages/admin/package-metadata-interpretation-manager'));
const AccountManager = lazy(() => import('./pages/admin/account-manager'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='*' element={<div>404 Not Found</div>} />
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />

          <Route path='/admin' element={<AdminPage />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/register' element={<AdminRegister />} />
          <Route path='/admin/faq-manager' element={<FaqManager />} />
          <Route path='/admin/package-metadata-interpretation-manager' element={<PackageMetadataInterpretationManager />} />
          <Route path='/admin/package-manager' element={<PackageManager />} />
          <Route path='/admin/account-manager' element={<AccountManager />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
