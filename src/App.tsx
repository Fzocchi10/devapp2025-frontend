import react from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from "./components/Home/Home";
import ListaPersonas from "./components/Personas/ListaPersonas";

const App: react.FC = () => {
  return(
    <>
     <Router>
        <div className="app">
          <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/personas" element={<ListaPersonas />} />
          </Routes>
        </div>
     </Router>

    </>
  );
};

export default App;