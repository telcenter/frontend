import './App.css'
import { lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'

const Home = lazy(() => import('./pages/home'));

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
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
  );
}

export default App
