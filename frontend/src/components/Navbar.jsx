import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
    <div className="nav-links">

     <div className="editor drop-shadow-md">
      <Link to="/editor">
      <span className="material-symbols-outlined">draw</span> Editor
      </Link>
     </div>
     <div className="object-remover drop-shadow-md">
     <Link to="/object-remover">
     <span className="material-symbols-outlined">auto_fix</span> Object Remover
      </Link>
     </div>

    </div>
    
    <div className="floating-home">
      <Link to="/">
      <span className="material-symbols-outlined">home</span>
      </Link>
    </div>

    </>
  )
}

export default Navbar