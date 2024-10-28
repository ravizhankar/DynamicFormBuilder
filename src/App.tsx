import React from 'react';
import FormBuilder from './components/FormBuilder/FormBuilder';
import FormViewer from './components/FormViewer/FormViewer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NotFound from './NotFound';

const App = () => {
 // return <FormBuilder />
 return(
  <Router>
      <Routes>
        <Route path="/" element={<FormBuilder />} />
        <Route path="/FormViewer" element={<FormViewer />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  )
};

export default App;






