import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import QRPage from './components/QRPage';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/qr" element={<QRPage />} />
      </Routes>
    </div>
  );
};

export default App;
