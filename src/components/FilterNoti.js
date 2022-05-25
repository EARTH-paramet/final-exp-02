import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalBody } from 'reactstrap'
import { connect } from 'react-redux'
import useStateRef from 'react-usestateref'
import styled from 'styled-components'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import { Calendar } from 'react-modern-calendar-datepicker'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './css/FilterNoti.module.css'
import { MyCalendar } from './styled/MyCalendar'
const FilterNoti = (props) => {
  // calendar
  const defaultValue = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  }
  const [selectedDay, setSelectedDay] = useState(defaultValue)
  console.log(selectedDay)
  // calendar
  const [modalOpen, setModalOpen] = useState(false)
  //   const [modalData, setModalData] = useState({})
  const toggle = () => setModalOpen(!modalOpen)
  const [fridgeSelect, setFridgeSelect] = useState('group1')

  const [classF1, setClassF1] = useState(
    `${styles.btnFilter} w-100 py-2 fw-bold`
  )
  const [classF2, setClassF2] = useState(
    `${styles.btnFilter} w-100 py-2 fw-bold`
  )
  const [classF3, setClassF3] = useState(
    `${styles.btnFilter} w-100 py-2 fw-bold`
  )

  const classDefault = `${styles.btnFilter} w-100 py-2 fw-bold`
  const classActive = `${styles.btnFilter} w-100 py-2 fw-bold ${styles.active}`

  useEffect(() => {
    const filter = props.dataFilter.fridgeNotification
    if (filter == 'group1') {
      setClassF1(classActive)
      setClassF2(classDefault)
      setClassF3(classDefault)
    } else if (filter == 'group2') {
      setClassF1(classDefault)
      setClassF2(classActive)
      setClassF3(classDefault)
    } else if (filter == 'group3') {
      setClassF1(classDefault)
      setClassF2(classDefault)
      setClassF3(classActive)
    } else {
      setClassF1(classDefault)
      setClassF2(classDefault)
      setClassF3(classDefault)
    }
  }, [props.dataFilter.fridgeNotification])
  // console.log(sortSelect)
  const handleClick_apply = () => {
    props.dispatch({
      type: 'SET_FILTER_FRIDGE',
      payload: fridgeSelect,
    })
    toggle()
  }
  return (
    <>
      <FontAwesomeIcon
        icon='fa-solid fa-filter'
        onClick={() => {
          //   setModalData(item)
          toggle()
        }}
      />
      <div>
        <Modal size='sm' isOpen={modalOpen} toggle={() => toggle()}>
          <ModalBody>
            <div className='container'>
              <div className='row my-4'>
                <h6 className='col-8 fw-bold pt-2'>Filter</h6>
                <h6 className='col-4'>
                  <Button
                    className={`${styles.btnReset} w-100 fw-bold`}
                    onClick={() => setFridgeSelect('group1')}
                  >
                    Reset
                  </Button>
                </h6>
              </div>
              <div className='row my-4 g-2'>
                <h6 className='col'>
                  <Button
                    id='test'
                    className={classF1}
                    color='ligth text-black'
                    onClick={() => setFridgeSelect('group1')}
                  >
                    Fridge 1
                  </Button>
                </h6>
                <h6 className='col'>
                  <Button
                    className={classF2}
                    color='ligth text-black'
                    onClick={() => setFridgeSelect('group2')}
                  >
                    Fridge 2
                  </Button>
                </h6>
                <h6 className='col'>
                  <Button
                    className={classF3}
                    color='ligth text-black'
                    onClick={() => setFridgeSelect('group3')}
                  >
                    Fridge 3
                  </Button>
                </h6>
              </div>
            </div>
            <div className='row'>
              <MyCalendar className='d-flex justify-content-center text-center'>
                <Calendar
                  value={selectedDay}
                  onChange={(e)=>{console.log(new Date(e.year,e.month,e.day))}}
                  colorPrimary='#ffc107'
                  calendarClassName='responsive-calendar' // added this
                  //   shouldHighlightWeekends
                />
              </MyCalendar>
            </div>
            <div className='container'>
              <div className='row py-2'>
                <Button
                  className='w-100 py-3 fw-bold'
                  color='warning text-white'
                  style={{ borderRadius: '16px' }}
                  onClick={handleClick_apply}
                >
                  Apply
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    dataFilter: state.dataFilter,
  }
}

export default connect(mapStateToProps)(FilterNoti)
