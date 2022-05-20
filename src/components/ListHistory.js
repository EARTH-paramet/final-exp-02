import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Modal, ModalBody } from 'reactstrap'
import firebase from '../services/firebase'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import defaultImg from './assets/default-img-category.jpg'
import styles from './css/History.module.css'
// import './css/MyBootstrap.css'
import SvgFridge from './navigation/SvgFridge'

const ListHistory = ({ data }) => {
  return (
    <div className='container'>
      <div>
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
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    data: state.dataUser,
  }
}

export default connect(mapStateToProps)(ListHistory)
