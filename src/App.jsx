import React from 'react';
import './app.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <>
    <AuthProvider>
    <Navbar />
      <main className='min-h-screen max-w-screen-2xl mx-auto font-primary'>
      <Outlet /> { /*Outlet is where the children will be displayed */}
      </main>
      <Footer />
    </AuthProvider>
    </>
  )
}

export default App