import { Link } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

const Home = () => {
    return (
        <>
        <Navbar />

        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card text-center shadow p-5">
                        <h1 className="mb-4">TP de Desarrollo de Aplicaciones</h1>
                        <p className="lead mb-4">
                            Desde aquí podés gestionar personas, vehículos, y acceder a las distintas funcionalidades del sistema.
                        </p>

                        <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-3">
                            <Link to="/personas" className="btn btn-secondary btn-lg">
                                Gestionar Personas
                            </Link>
                            <Link to="/autos" className="btn btn-secondary btn-lg">
                                Gestionar Autos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Home;