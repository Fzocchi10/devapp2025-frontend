export const Navbar = () => {
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="/">Home <span className="sr-only"></span></a>
                    <a className="nav-item nav-link" href="/personas">Personas</a>
                    <a className="nav-item nav-link" href="/autos">Autos</a>
                    </div>
                </div>
                </nav>
        </>
    )
}