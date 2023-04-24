/* eslint-disable no-nested-ternary */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Filters from '../Filters'
import JobCard from '../JobCard'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import NavBar from '../NavBar'

import './index.css'

const apiStates = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    searchingElement: '',
    profileState: apiStates.initial,
    jobsState: apiStates.initial,
    profileData: null,
    allJobsData: [],
    employmentType: [],
    salary: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({
      jobsState: apiStates.inprogress,
    })
    const {employmentType, salary, searchingElement} = this.state
    const emp = employmentType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    // const apiUrl = 'https://apis.ccbp.in/jobs'
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${emp}&minimum_package=${salary}&search=${searchingElement}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      // console.log('data', data)
      const formattedData = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        title: each.title,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
      }))
      // console.log('formattedData', formattedData)
      this.setState({
        jobsState: apiStates.success,
        allJobsData: formattedData,
      })
    } else {
      this.setState({
        jobsState: apiStates.failure,
      })
    }
  }

  getProfileData = async () => {
    this.setState({
      profileState: apiStates.inprogress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileState: apiStates.success,
        profileData: formattedData,
      })
    } else {
      this.setState({
        profileState: apiStates.failure,
      })
    }
  }

  onClickSearchBtn = () => {
    this.getJobsData()
  }

  userInput = event => {
    this.setState({searchingElement: event.target.value})
    // console.log(event.target.value)
  }

  onChangeSalary = event => {
    // console.log(event.target.value)
    this.setState({salary: event.target.value}, this.getJobsData)
  }

  onChangeEmployement = event => {
    // console.log(event.target.value)
    const type = event.target.value
    const {employmentType} = this.state
    const newEmpType = employmentType.includes(type)
      ? employmentType.filter(each => each !== type)
      : [...employmentType, type]
    this.setState({employmentType: newEmpType}, this.getJobsData)
  }

  renderInitialStage = x => {
    if (x === 'profile') {
      return <div className="profile-wrap1" />
    }
    return <div className="jobs-data" />
  }

  renderInProgressStage = x => {
    if (x === 'profile') {
      return (
        <div className="profile-wrap1">
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        </div>
      )
    }
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderSuccessStage = x => {
    const {profileData, allJobsData} = this.state
    if (x === 'profile') {
      return (
        <div className="profile-wrap">
          <img
            src={profileData.profileImageUrl}
            alt="profile"
            className="profile-image"
          />
          <h1 className="header">{profileData.name}</h1>
          <p className="para">{profileData.shortBio}</p>
        </div>
      )
    }
    return (
      <>
        {allJobsData.length > 0 ? (
          <ul className="jobs-list">
            {allJobsData.map(each => (
              <Link to={`/jobs/${each.id}`} className="job-link" key={each.id}>
                <JobCard jobsData={each} />
              </Link>
            ))}
          </ul>
        ) : (
          <div className="no-job-wrap">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-job-image"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters.</p>
          </div>
        )}
      </>
    )
  }

  renderFailureStage = x => {
    if (x === 'profile') {
      return (
        <div className="profile-wrap1">
          <button
            type="button"
            className="retry-btn"
            onClick={this.getProfileData}
          >
            RETRY
          </button>
        </div>
      )
    }
    return (
      <div className="oops-wrap1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button" className="retry-btn" onClick={this.getJobsData}>
          RETRY
        </button>
      </div>
    )
  }

  renderItems = x => {
    const {profileState, jobsState} = this.state

    if (x === 'profile') {
      if (profileState === apiStates.initial) {
        return this.renderInitialStage(x)
      }
      if (profileState === apiStates.inprogress) {
        return this.renderInProgressStage(x)
      }
      if (profileState === apiStates.success) {
        return this.renderSuccessStage(x)
      }
      return this.renderFailureStage(x)
    }
    if (jobsState === apiStates.initial) {
      return this.renderInitialStage(x)
    }
    if (jobsState === apiStates.inprogress) {
      return this.renderInProgressStage(x)
    }
    if (jobsState === apiStates.success) {
      return this.renderSuccessStage(x)
    }
    return this.renderFailureStage(x)
  }

  render() {
    const {searchingElement, salary, employmentType} = this.state

    return (
      <div className="job-container">
        <NavBar />
        <div className="job-wrap">
          <div className="left-wrap">
            {this.renderItems('profile')}

            <hr className="hr" />
            <Filters
              salary={salary}
              onChangeSalary={this.onChangeSalary}
              employmentType={employmentType}
              onChangeEmployement={this.onChangeEmployement}
            />
          </div>
          <div className="right-wrap">
            <div className="search-box">
              <input
                type="search"
                placeholder="Search"
                onChange={this.userInput}
                value={searchingElement}
                className="search-input"
              />
              <button
                type="button"
                className="search-button"
                onClick={this.onClickSearchBtn}
                data-testid="searchButton"
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
            {this.renderItems('jobs')}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
