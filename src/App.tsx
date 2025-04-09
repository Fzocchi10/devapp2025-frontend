import react from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from "./components/Home/Home";
import ListaPersonas from "./components/Personas/ListaPersonas";
import ListaAutos from "./components/Autos/ListaAutos";
import { EliminarPersona } from "./components/Personas/EliminarPersona";
import AgregarPersona from "./components/Personas/AgregarPersona";

const App: react.FC = () => {
  return(
    <>
     <Router>
        <div className="app">
          <Routes>
           <Route path="/" element={<Home />} />

           //Rutas de personas
           <Route path="/agregar/persona" element={<AgregarPersona />} />
           <Route path="/personas" element={<ListaPersonas />} />
           <Route path="/eliminar/persona/:id" element={<EliminarPersona />} />

           //Rutas de autos
           <Route path="/autos" element={<ListaAutos />} />
          </Routes>
        </div>
     </Router>

    </>
  );
};

export default App;