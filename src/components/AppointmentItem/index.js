import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onToggleStarIcon} = props
  const {id, title, date, isStarred} = appointmentDetails
  const starIconUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const onClickStarIcon = () => {
    onToggleStarIcon(id)
  }

  return (
    <li className="appointment-list-item-container">
      <div className="title-container">
        <p className="title">{title}</p>
        <button
          type="button"
          testid="star"
          className="star-button"
          onClick={onClickStarIcon}
        >
          <img src={starIconUrl} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date">Date: {formattedDate}</p>
    </li>
  )
}

export default AppointmentItem
