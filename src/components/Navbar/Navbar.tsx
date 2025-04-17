export const Navbar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
        <div className="container">
          <span className="navbar-brand text-white fw-bold">TP Inicial</span>
  
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href="/">Home</a>
              <a className="nav-link" href="/personas">Personas</a>
              <a className="nav-link" href="/autos">Autos</a>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  