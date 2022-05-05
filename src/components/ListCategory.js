import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Modal, ModalBody } from 'reactstrap'
import firebase from '../services/firebase'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './css/Category.module.css'
// import './css/MyBootstrap.css'

const ListCategory = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})
  const toggle = () => setModalOpen(!modalOpen)
  let group = 1

  const ref = firebase.firestore().collection('product')
  const [dataCategory, setDataCategory] = useState([])
  useEffect(() => {
    ref
      .where('uid', '==', data.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          group = doc.data().defaultGroup
        })
      })
    ref
      .doc(data.uid)
      .collection('category')
      .where('group', '==', group)
      .onSnapshot((querySnapshot) => {
        const items = []
        querySnapshot.forEach((doc) => {
          items.push(doc.data())
          // console.log("items",doc.data())
        })
        setDataCategory(items)
      })
  }, [])
  //   console.log("Output",ref)
  if (dataCategory.length !== 0) {
    console.log('Output_dataUser', dataCategory)
  } else {
    console.log('null')
  }
  return (
    <div className='container'>
      {dataCategory.map((item, index) => (
        <div style={{ borderRadius: '18px' }} className='row py-2' key={index}>
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
              src='https://www.iconbunny.com/icons/media/catalog/product/3/7/3737.4-loaf-of-bread-icon-iconbunny.jpg'
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
      <div>
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
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    data: state.dataUser,
  }
}

export default connect(mapStateToProps)(ListCategory)
