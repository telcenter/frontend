import './App.css'
import { lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import { AuthProvider } from './contexts/AuthProvider';
import { UserProvider } from './contexts/UserProvider';


const Home = lazy(() => import('./pages/home'));

const AdminLogin = lazy(() => import('./pages/admin/login'));
const AdminRegister = lazy(() => import('./pages/admin/register'));
const AdminPage = lazy(() => import('./pages/admin'));
const FaqManager = lazy(() => import('./pages/admin/faq-manager'));
const PackageManager = lazy(() => import('./pages/admin/package-manager'));
const PackageMetadataInterpretationManager = lazy(() => import('./pages/admin/package-metadata-interpretation-manager'));
const AccountManager = lazy(() => import('./pages/admin/account-manager'));
const CustomerServiceChatsViewer = lazy(() => import('./pages/admin/customer-service-chats-viewer'));

const UserPage = lazy(() => import('./pages/user'));
const UserChat = lazy(() => import('./pages/user/chat'));
const UserChatInbox = lazy(() => import('./pages/user/chat/[id]'));

function App() {
  return (
    <AuthProvider>
      <UserProvider>
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
            <Route path='/admin/customer-service-chats-viewer' element={<CustomerServiceChatsViewer />} />

            <Route path='/user' element={<UserPage />} />
            <Route path='/user/chat' element={<UserChat />} />
            <Route path='/user/chat/:id' element={<UserChatInbox />} />
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App
