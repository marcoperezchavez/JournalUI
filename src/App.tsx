import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/Login';
import JournalComponent from './components/journal';

const App: React.FC = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LoginComponent />} />
              <Route path="/journal" element={<JournalComponent />} />
          </Routes>
      </Router>
  );
};

export default App
