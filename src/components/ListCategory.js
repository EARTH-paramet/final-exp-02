import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Modal, ModalBody } from 'reactstrap'
import firebase from '../services/firebase'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './css/Category.module.css'
import './css/MyBootstrap.css'

const ListCategory = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})
  const toggle = () => setModalOpen(!modalOpen)

  const ref = firebase
    .firestore()
    .collection('product')
    .doc('userID')
    .collection('category')
  const [dataUser, setDataUser] = useState([{}])
  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
        // console.log("items",doc.data())
      })
      setDataUser(items)
      // console.log('Output_dataUser', dataUser)
    })
  }, [])
  //   console.log("Output",ref)
  if (dataUser.length !== 0) {
    console.log('Output_dataUser', dataUser)
  } else {
    console.log('null')
  }
  return (
    <div className='container'>
      {dataUser.map((item, index) => (
        <div className={`row mb-3 ${styles.boxItem}`} key={index}>
          <a
            href='#'
            className={`list-group-item d-flex gap-3 ${styles.item}`}
            aria-current='true'
            onClick={() => {
              setModalData(item)
              toggle()
            }}
          >
            <img
              src={
                item.image
                  ? item.image
                  : 'https://www.suzukijember.com/gallery/gambar_product/default.jpg'
              }
              alt='twbs'
              width='64'
              height='64'
              className='img-rounded flex-shrink-0'
            />
            <div
              className={`d-flex w-100 justify-content-between ${styles.itemText}`}
            >
              <div>
                <p className='mb-0'>{item.name}</p>
                <p className='mb-0' style={{ color: '#7F8E7F' }}>
                  Total {item.qty} Product
                </p>
              </div>
              <div className='opacity-50 text-nowrap py-3'>
                <FontAwesomeIcon
                  icon='fa-solid fa-ellipsis-vertical'
                  size='xl'
                />
              </div>
            </div>
          </a>
        </div>
      ))}
      {/* <div>
        <Modal size='sm' isOpen={modalOpen} toggle={() => toggle()}>
          <ModalBody>
            <div className='container'>
              <h6 className='font-weight-bold'>Name: {modalData.name}</h6>
              <h6 className='font-weight-bold'>Exp: {modalData.exp}</h6>
              <h6 className='font-weight-bold'>Category: {modalData.cat}</h6>
              <h6 className='font-weight-bold'>รายละเอียด</h6>
              <p>{modalData.des}</p>
              <div className='row py-2'>
                <NavLink to={`/edit/1`}>
                  <Button className='w-100' color='light text-dark'>
                    Edit
                  </Button>
                </NavLink>
              </div>
              <div className='row py-2'>
                <Button className='w-100' color='warning text-white'>
                  Remove
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div> */}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    data: state.dataCategory,
  }
}

export default connect(mapStateToProps)(ListCategory)
