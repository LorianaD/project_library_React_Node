import { NavLink } from "react-router"

function Header() {

  return (
    <>
      <header>
        <nav>
          <NavLink to="/" end>Accueil</NavLink>
        </nav>
      </header>

    </>
  )
}

export default Header