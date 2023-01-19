import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import React from 'react';

import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Datos from './Containers/datosContainer';
import Form from './Containers/formularioContainer';


function App() {
  return (
      <Container fluid className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Datos />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </BrowserRouter>
      </Container>
  );
}

export default App;
