import './index.css'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Filters = props => {
  const {salary, onChangeSalary, employmentType, onChangeEmployement} = props
  return (
    <div className="type-of-emp-wrap">
      <h1 className="title">Type of Employment</h1>
      <ul>
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId} className="list">
            <input
              className="input"
              type="checkbox"
              id={each.employmentTypeId}
              value={each.employmentTypeId}
              onChange={e => onChangeEmployement(e)}
              checked={employmentType.includes(each.employmentTypeId)}
            />
            <label className="label" htmlFor={each.employmentTypeId}>
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="hr" />
      <h1 className="title">Salary Range</h1>
      <ul>
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId} className="list">
            <input
              className="radio"
              type="radio"
              name="salary"
              id={each.salaryRangeId}
              value={each.salaryRangeId}
              onChange={e => onChangeSalary(e)}
              checked={salary === each.salaryRangeId}
            />
            <label className="label" htmlFor={each.salaryRangeId}>
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Filters
