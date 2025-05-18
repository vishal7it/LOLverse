import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Create from './pages/Create';
import Dashboard from './pages/Dashboard';
import MemeDetails from './pages/MemeDetails';
import AuthModal from './components/auth/AuthModal';
import { AuthProvider } from './context/AuthContext';
import { MemeProvider } from './context/MemeContext';
import { UIProvider } from './context/UIContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MemeProvider>
          <UIProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/meme/:id" element={<MemeDetails />} />
              </Routes>
              <AuthModal />
            </Layout>
          </UIProvider>
        </MemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;