import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Modal, ModalBody } from 'reactstrap'
import firebase from '../services/firebase'
import { Firestore } from 'firebase/firestore'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './css/Page.module.css'
import './css/MyBootstrap.css'

const ListFridge = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})
  const toggle = () => setModalOpen(!modalOpen)

  const ref = firebase
    .firestore()
    .collection('product')
    
  const [loading, setLoading] = useState(true)
  const [dataFridge, setDataFridge] = useState([
    {
      group: "1",
      default: false
    },
    {
      group: "2",
      default: false
    },
    {
      group: "3",
      default: false
    }
  ])
  useEffect(() => {
ref.where("uid","==",data.uid).get().then(querySnapshot => {
  let group = "null"
  querySnapshot.forEach(doc => {
    console.log(doc.data());
   group = doc.data().defaultGroup
  });
  setDataFridge(
    dataFridge.map((val) => {
      return val.group == group
        ? {
          group: val.group,
          default: true
          }
        : val;
    })
  );
  setLoading(false)
  console.log(dataFridge)
});
    
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
      ):(
        <div>
          {dataFridge.map((item, index) => (
        <div style={{ borderRadius: '18px' }} className='row py-2' key={index}>
        <a
          href='#'
          className={`list-group-item d-flex gap-3 ${styles.itemFridge}`}
          aria-current='true'
          onClick={() => {
            setModalData(item)
            toggle()
          }}
        >
          <img
            src="data:image/png;base64,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"
            alt='twbs'
            width='64'
            height='64'
            className='img-rounded flex-shrink-0'
          />
          {/* <FontAwesomeIcon icon='fa-solid fa-snowflake' size='4x' /> */}
          <div
            className={`d-flex w-100 justify-content-between ${styles.itemText}`}
          >
            <div>
              <p className='mb-0'>Fridge 1</p>
              <Button
                className='w-100'
                color={item.default ? 'warning' : 'danger'}
                style={{ borderRadius: '10px' }}
              >
                Default
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
                  {modalData.noti}
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
