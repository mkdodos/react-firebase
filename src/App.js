import React from 'react';
import { Container, Table } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Maya from './pages/Maya';
import Stock from './pages/Stock';

export default function App() {
  return (
    <Container>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/maya" element={<Maya />} />
          <Route path="/stock" element={<Stock />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}
