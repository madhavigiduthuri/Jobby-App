/* eslint-disable import/order */
import {withRouter, Link} from 'react-router-dom'
import NavBar from '../NavBar'
import './index.css'

const Home = () => (
  <div className="home-container">
    <NavBar />
    <div className="container">
      <h1 className="heading">
        Find The Job That <br /> Fits Your Life
      </h1>
      <p className="desc">
        Millions of people are searching for jobs, salary <br />
        information, company reviews. Find the job that fits your <br />
        abilities and potential.
      </p>
      <Link to="/jobs" className="nav-link">
        <button type="button" className="job-btn">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default withRouter(Home)
