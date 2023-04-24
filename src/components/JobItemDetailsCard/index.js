import './index.css'

const JobItemDetailsCard = props => {
  const {skills} = props
  console.log(skills)
  return (
    <ul className="all-skills-wrap">
      {skills.map(each => (
        <li className="skills-wrap" key={each.name}>
          <img src={each.imageUrl} alt={each.name} className="skills-img" />
          <h1 className="skills-title">{each.name}</h1>
        </li>
      ))}
    </ul>
  )
}

export default JobItemDetailsCard
