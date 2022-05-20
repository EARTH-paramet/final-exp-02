import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Modal, ModalBody } from 'reactstrap'
import firebase from '../services/firebase'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './css/Notification.module.css'

const ListNotification = ({ data }) => {
  return (
    <div className='container'>
      {/* {dataFridge.map((item, index) => ( */}
      <div className={`row my-3 ${styles.boxHistory}`}>
        <div className={`list-group-item d-flex gap-3 ${styles.item}`}>
          <div
            className={`d-flex w-100 justify-content-between ${styles.itemText}`}
          >
            <div>Meat</div>
            <div>
              <p className='mb-0'>product-name{/* {item.value.name} */}</p>
            </div>
            <div>dd/mm/yyyy</div>

            {/* <DateFunc date={item.value.date.seconds} item={item.value} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    data: state.dataUser,
  }
}

export default connect(mapStateToProps)(ListNotification)
