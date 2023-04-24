import {Link, withRouter} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

const NavBar = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="navbar-container">
      <ul className="navbar-titles-container">
        <Link to="/" className="nav-link">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="navbar-image"
            />
          </li>
        </Link>

        <Link to="/" className="nav-link home-link">
          <li className="navbar-heading">Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li className="navbar-heading">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="logout-btn" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(NavBar)
