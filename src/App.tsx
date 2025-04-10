import react from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from "./components/Home/Home";
import ListaPersonas from "./components/Personas/ListaPersonas";
import ListaAutos from "./components/Autos/ListaAutos";
import { EliminarPersona } from "./components/Personas/EliminarPersona";
import AgregarPersona from "./components/Personas/AgregarPersona";
import InfoPersona from "./components/Personas/InfoPersona";
import { EliminarAuto } from "./components/Autos/EliminarAuto";
import { ModificarPersona } from "./components/Personas/ModificarPersona";

const App: react.FC = () => {
  return(
    <>
     <Router>
        <div className="app">
          <Routes>
           <Route path="/" element={<Home />} />

           //Rutas de personas
           <Route path="/personas/agregar" element={<AgregarPersona />} />
           <Route path="/personas" element={<ListaPersonas />} />
           <Route path="/personas/eliminar/:id" element={<EliminarPersona />} />
           <Route path="/personas/info/:id" element={<InfoPersona/>} />
           <Route path="/personas/editar/:id" element={<ModificarPersona/>} />

           //Rutas de autos
           <Route path="/autos" element={<ListaAutos />} />
           <Route path="/autos/eliminar/:id" element={<EliminarAuto/>} />
          </Routes>
        </div>
     </Router>

    </>
  );
};

export default App;