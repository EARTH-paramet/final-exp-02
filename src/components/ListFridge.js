import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Modal, ModalBody } from 'reactstrap'
import firebase from '../services/firebase'
import { Firestore } from 'firebase/firestore'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './css/Fridge.module.css'
import './css/MyBootstrap.css'

import SvgFridge from './navigation/SvgFridge'

const ListFridge = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})
  const toggle = () => setModalOpen(!modalOpen)

  const ref = firebase.firestore().collection('product')

  const [loading, setLoading] = useState(true)
  const [dataFridge, setDataFridge] = useState([
    {
      group: '1',
      default: false,
    },
    {
      group: '2',
      default: false,
    },
    {
      group: '3',
      default: false,
    },
  ])
  useEffect(() => {
    ref
      .where('uid', '==', data.uid)
      .get()
      .then((querySnapshot) => {
        let group = 'null'
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          group = doc.data().defaultGroup
        })
        setDataFridge(
          dataFridge.map((val) => {
            return val.group == group
              ? {
                  group: val.group,
                  default: true,
                }
              : val
          })
        )
        setLoading(false)
        console.log(dataFridge)
      })
  }, [])
  //   console.log("Output",ref)
  if (dataFridge.length !== 0) {
    console.log('Output_dataUser', dataFridge)
  } else {
    console.log('null')
  }
  return (
    <div className='container'>
      {loading ? (
        <div></div>
      ) : (
        <div>
          {dataFridge.map((item, index) => (
            <div
              style={{ borderRadius: '18px' }}
              className='row py-2'
              key={index}
            >
              <a
                href='#'
                className={`list-group-item d-flex gap-2 ${styles.itemFridge}`}
                aria-current='true'
                onClick={() => {
                  setModalData(item)
                  toggle()
                }}
              >
                <SvgFridge size='4x' />
                <div
                  className={`d-flex w-100 justify-content-between ${styles.itemText}`}
                >
                  <div>
                    <p className='mb-1'>Fridge {index + 1}</p>
                    <Button
                      className={styles.btnDefault}
                      style={item.default ? {} : { backgroundColor: '#c6c6c6' }}
                    >
                      <div className='text-start'>
                        <FontAwesomeIcon
                          icon='fa-solid fa-circle-check'
                          size='lg'
                          style={item.default ? { color: '#fccf50' } : {}}
                        />{' '}
                        Default
                      </div>
                    </Button>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
      <div>
        <Modal size='sm' isOpen={modalOpen} toggle={() => toggle()}>
          <ModalBody>
            <div className='container'>
              <div className='row my-4'>
                <h6 className='col-8 fw-bold'>Name :</h6>
                <h6 className='col-4 text-end text-warning'>
                  {modalData.name}
                </h6>
              </div>
              <div className='row my-4'>
                <h6 className='col-8 fw-bold'>Total Food :</h6>
                <h6 className='col-4 text-end text-warning'>
                  {modalData.totalfood} 14 {/*test */}
                </h6>
              </div>
              <div className='row my-4'>
                <h6 className='col-8 fw-bold'>Notification :</h6>
                <h6 className='col-4 text-end text-warning'>
                  {/* {modalData.noti} */}
                  <div className={styles.switch}>
                    <input
                      type='checkbox'
                      id='switch'
                      className={styles.switchInput}
                    />
                    <label className={styles.switchLabel} for='switch' />
                  </div>
                </h6>
              </div>

              <div className='row py-2'>
                <Button
                  className='w-100 py-3 fw-bold'
                  color='warning text-white'
                  style={{ borderRadius: '16px' }}
                >
                  Share&nbsp;&nbsp;
                  <FontAwesomeIcon
                    icon='fa-solid fa-share-nodes'
                    size='xl'
                    style={{ color: 'black' }}
                  />
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    data: state.dataUser,
  }
}

export default connect(mapStateToProps)(ListFridge)
