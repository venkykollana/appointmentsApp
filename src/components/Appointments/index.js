import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], activeStarred: false}

  onSubmitAppointment = event => {
    event.preventDefault()
    const {title, date, appointmentsList} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    this.setState({
      appointmentsList: [...appointmentsList, newAppointment],
      title: '',
      date: '',
    })
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onToggleStarIcon = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarredButton = () => {
    this.setState(prevState => ({
      activeStarred: !prevState.activeStarred,
    }))
  }

  renderAppointmentsList = appointmentsList =>
    appointmentsList.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        appointmentDetails={eachAppointment}
        onToggleStarIcon={this.onToggleStarIcon}
      />
    ))

  getFilteredAppointments = () => {
    const {appointmentsList, activeStarred} = this.state
    if (activeStarred) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {title, date, activeStarred} = this.state
    const activeClassName = activeStarred
      ? 'starred-button active-starred-button'
      : 'starred-button'
    const filteredAppointmentList = this.getFilteredAppointments()
    return (
      <div className="appointments-background-container">
        <div className="appointments-container">
          <div className="appointments-top-section">
            <div className="appointments-text-section">
              <h1 className="heading">Add Appointment</h1>
              <form
                className="form-container"
                onSubmit={this.onSubmitAppointment}
              >
                <div className="input-container">
                  <label className="label" htmlFor="input-title">
                    TITLE
                  </label>
                  <input
                    id="input-title"
                    type="text"
                    value={title}
                    placeholder="Title"
                    className="input"
                    onChange={this.onChangeTitle}
                  />
                </div>
                <div className="input-container">
                  <label className="label" htmlFor="input-date">
                    DATE
                  </label>
                  <input
                    id="input-date"
                    type="date"
                    value={date}
                    placeholder="dd/mm/yyyy"
                    className="input"
                    onChange={this.onChangeDate}
                  />
                </div>
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </div>
          <hr className="separator" />
          <div className="middle-section">
            <h1 className="heading">Appointments</h1>
            <button
              type="button"
              className={activeClassName}
              onClick={this.onClickStarredButton}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-bottom-section">
            {this.renderAppointmentsList(filteredAppointmentList)}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
