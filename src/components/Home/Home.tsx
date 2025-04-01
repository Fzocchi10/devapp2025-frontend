import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Link to="/personas">
                <button type="button" className="btn btn-dark">Personas</button>
            </Link>
            <Link to="/autos">
                <button type="button" className="btn btn-dark">Autos</button>
            </Link>

        </>
    )
}

export default Home;