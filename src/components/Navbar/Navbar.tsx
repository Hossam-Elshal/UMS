import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Navbar() {
  let {UserData} = useContext(AuthContext)
  return (
      <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">  <b style={{ borderLeft: "6px solid #ffa200ac", paddingLeft: "8px" }}>UMS</b></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Hello, <b style={{color:'#ffa200ac'}}>{UserData.username}</b></a>
        </li>
      </ul>
    </div>
  </div>
</nav>
      </>
  )
}
