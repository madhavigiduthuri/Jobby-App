import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import './index.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Link} from 'react-router-dom'
import NavBar from '../NavBar'
import JobItemDetailsCard from '../JobItemDetailsCard'

const apiStates = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {skills: []},
    similarJobs: [],
    jobDetailsState: apiStates.initial,
  }

  componentDidMount() {
    this.getJobsDetailsData()
  }

  getJobsDetailsData = async () => {
    this.setState({
      jobDetailsState: apiStates.inprogress,
    })
    const {match} = this.props
    const {id} = match.params
    // console.log(this.props)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    // console.log(apiUrl)
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
      const formattedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        lifeAtCompanyDesc: data.job_details.life_at_company.description,
        lifeAtCompanyImageUrl: data.job_details.life_at_company.image_url,
        skills: data.job_details.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
      }
      // console.log('formattedJobDetails', formattedJobDetails)

      const formattedSimilarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      // console.log('formattedSimilarJobs', formattedSimilarJobs)
      this.setState({
        jobDetailsState: apiStates.success,
        jobDetails: formattedJobDetails,
        similarJobs: formattedSimilarJobs,
      })
    } else {
      this.setState({
        jobDetailsState: apiStates.failure,
      })
    }
  }

  renderInitialStage = () => <div className="jobs-data" />

  renderInProgressStage = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessStage = () => {
    const {jobDetails, similarJobs} = this.state

    return (
      <>
        <div className="job-card-container">
          <div className="job-card-wrapping">
            <img
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
              className="job-image"
            />
            <div className="job-card-wrap">
              <h1 className="head">{jobDetails.title}</h1>
              <div className="star-wrap">
                <AiFillStar color="#fbbf24" size={20} />
                <p className="number">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="job-card-middle-wrap">
            <div className="job-left">
              <div className="place-wrap">
                <MdLocationOn color="#ffffff" size={20} />
                <p className="place">{jobDetails.location}</p>
              </div>
              <div className="place-wrap">
                <BsFillBriefcaseFill color="#ffffff" size={20} />
                <p className="place">{jobDetails.employmentType}</p>
              </div>
            </div>
            <div className="job-right">
              <p className="salary">{jobDetails.packagePerAnnum} </p>
            </div>
          </div>
          <div className="desc-link-wrap">
            <h1 className="description">Description</h1>
            <a
              href={jobDetails.companyWebsiteUrl}
              target="_blank"
              className="a-link visit-link"
              rel="noreferrer"
            >
              <h1 className="visit">Visit</h1>
              <BiLinkExternal size={22} color="#4f46e5" />
            </a>
          </div>
          <p className="paragraph">{jobDetails.jobDescription}</p>
          <h1 className="skills-header">Skills</h1>
          <JobItemDetailsCard skills={jobDetails.skills} />
          <h1 className="life-at-company-title">Life at Company</h1>
          <div className="life-at-company-wrap">
            <p className="left-para-wrap">{jobDetails.lifeAtCompanyDesc}</p>
            <img
              src={jobDetails.lifeAtCompanyImageUrl}
              alt="life at company"
              className="img-wrap"
            />
          </div>
        </div>
        <div className="similar-jobs-wrap">
          <h1 className="similar-jobs-title">Similar Jobs</h1>
          <ul className="similar-jobs-container">
            {similarJobs.map(eachJob => (
              <Link
                to={`/jobs/${eachJob.id}`}
                key={eachJob.id}
                className="link-style"
              >
                <li className="jobs-card-container">
                  <div className="jobs-card-wrapping">
                    <img
                      src={eachJob.companyLogoUrl}
                      alt="similar job company logo"
                      className="job-image"
                    />
                    <div className="job-card-wrap">
                      <h1 className="head">{eachJob.title}</h1>
                      <div className="star-wrap">
                        <AiFillStar color="#fbbf24" size={20} />
                        <p className="number">{eachJob.rating}</p>
                      </div>
                    </div>
                  </div>
                  <h1 className="description">Description</h1>
                  <p className="paragraph">{eachJob.jobDescription}</p>
                  <div className="jobs-card-middle-wrap">
                    <div className="job-left">
                      <div className="place-wrap">
                        <MdLocationOn color="#ffffff" size={20} />
                        <p className="place">{eachJob.location}</p>
                      </div>
                      <div className="place-wrap">
                        <BsFillBriefcaseFill color="#ffffff" size={20} />
                        <p className="places">{eachJob.employmentType}</p>
                      </div>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailureStage = () => (
    <div className="oops-wrap1">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.getJobsDetailsData}
      >
        RETRY
      </button>
    </div>
  )

  renderItems = x => {
    const {jobDetailsState} = this.state
    console.log(jobDetailsState)
    if (jobDetailsState === apiStates.initial) {
      return this.renderInitialStage(x)
    }
    if (jobDetailsState === apiStates.inprogress) {
      return this.renderInProgressStage(x)
    }
    if (jobDetailsState === apiStates.success) {
      return this.renderSuccessStage(x)
    }
    return this.renderFailureStage(x)
  }

  render() {
    // console.log(jobDetails)
    return (
      <div className="job-container">
        <NavBar />
        {this.renderItems('jobDetails')}
      </div>
    )
  }
}

export default JobItemDetails
