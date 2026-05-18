import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function MainLayout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="content-area">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
}
