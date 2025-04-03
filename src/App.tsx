import react from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from "./components/Home/Home";
import ListaPersonas from "./components/Personas/ListaPersonas";
import ListaAutos from "./components/Autos/ListaAutos";
import { EliminarPersona } from "./components/Personas/EliminarPersona";

const App: react.FC = () => {
  return(
    <>
     <Router>
        <div className="app">
          <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/personas" element={<ListaPersonas />} />
           <Route path="/autos" element={<ListaAutos />} />
           <Route path="/personas/:id" element={<EliminarPersona />} />
          </Routes>
        </div>
     </Router>

    </>
  );
};

export default App;