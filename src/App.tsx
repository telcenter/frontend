import './App.css'
import { lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import { AuthProvider } from './contexts/AuthProvider';

const Home = lazy(() => import('./pages/home'));

const AdminLogin = lazy(() => import('./pages/admin/login'));
const AdminRegister = lazy(() => import('./pages/admin/register'));
const AdminPage = lazy(() => import('./pages/admin'));
const PackageManager = lazy(() => import('./pages/admin/package-manager'));
const FaqManager = lazy(() => import('./pages/admin/faq-manager'));

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
          <Route path='/admin/package-manager' element={<PackageManager />} />
          <Route path='/admin/faq-manager' element={<FaqManager />} />

          {/* <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="package-manager" element={<PackageManager />} />
            <Route path="faq-manager" element={<FaqManager />} />
          {/* <Route path="about" element={<About />} />

  <Route element={<AuthLayout />}>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>

  <Route path="concerts">
    <Route index element={<ConcertsHome />} />
    <Route path=":city" element={<City />} />
    <Route path="trending" element={<Trending />} />
  </Route> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
