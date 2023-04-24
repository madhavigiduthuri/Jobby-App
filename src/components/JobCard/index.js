import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobsData} = props
  const {
    companyLogoUrl,
    title,
    rating,
    packagePerAnnum,
    jobDescription,
    location,
    employmentType,
  } = jobsData
  return (
    <li className="job-card-container">
      <div className="job-card-wrapping">
        <img src={companyLogoUrl} alt="company logo" className="job-image" />
        <div className="job-card-wrap">
          <h1 className="head">{title}</h1>
          <div className="star-wrap">
            <AiFillStar color="#fbbf24" size={20} />
            <p className="number">{rating}</p>
          </div>
        </div>
      </div>
      <div className="job-card-middle-wrap">
        <div className="job-left">
          <div className="place-wrap">
            <MdLocationOn color="#ffffff" size={20} />
            <p className="place">{location}</p>
          </div>
          <div className="place-wrap">
            <BsFillBriefcaseFill color="#ffffff" size={20} />
            <p className="place">{employmentType}</p>
          </div>
        </div>
        <div className="job-right">
          <h1 className="salary">{packagePerAnnum} </h1>
        </div>
      </div>
      <h1 className="description">Description</h1>
      <p className="paragraph">{jobDescription}</p>
    </li>
  )
}

export default JobCard
