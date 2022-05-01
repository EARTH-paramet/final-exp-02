import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Modal, ModalBody } from 'reactstrap'
import firebase from '../services/firebase'
import {Timestamp} from 'firebase/firestore'

import styles from './css/Page.module.css'
import './css/MyBootstrap.css'

const ListProduct = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})
  const toggle = () => setModalOpen(!modalOpen)
  const ref = firebase
    .firestore()
    .collection('product')
  const [dataProduct, setDataProduct] = useState([])
  useEffect(() => {
    ref.where("uid","==",data.uid).get().then(querySnapshot => {
      let group = "null"
      querySnapshot.forEach(doc => {
        console.log(doc.data());
       group = doc.data().defaultGroup
      });
      ref.doc(data.uid).collection(`group${group}`).onSnapshot((querySnapshot) => {
        const items = []
        querySnapshot.forEach((doc) => {
          if(doc.data().barcode==""){
  
          }else{
            items.push(doc.data())
            console.log("items",doc.data())
          }
         
        })
        
          setDataProduct(items)
        // console.log('Output_dataUser', dataUser)
      })
    })
   
  }, [])
  //   console.log("Output",ref)
  if (dataProduct.length !== 0) {
    console.log('Output_dataProduct', dataProduct)
  } else {
    console.log('null')
  }
const TesterFunc = ({date})=>{
  const dateNow = firebase.firestore.Timestamp.fromDate(new Date()).seconds
  console.log(dateNow + (60 * 60 * 24))
 return (
   <div>
     {/* <p>{date}</p> */}
     {/* <p>{firebase.firestore.Timestamp.fromDate(new Date())}</p> */}
   </div>
 )
}
  
  return (
    <div className='container'>
      {dataProduct.map((item, index) => (
        <div style={{ borderRadius: '18px' }} className='row py-2' key={index}>
          {console.log(item.date.seconds)}
          {<TesterFunc date={item.date.seconds}/>}
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
              src={item.image}
              alt='twbs'
              width='40'
              height='40'
              className='rounded-circle flex-shrink-0'
            />
            <div
              className={`d-flex w-100 justify-content-between ${styles.itemText}`}
            >
              <div>
                <p className='mb-0'>{item.name}</p>
              </div>
              <small className='opacity-50 text-nowrap'>{item.date.toDate().toLocaleString().split(',')[0]}</small>
            </div>
          </a>
        </div>
      ))}
      <div>
        <Modal
          className='right'
          size='sm'
          isOpen={modalOpen}
          toggle={() => toggle()}
        >
          <ModalBody>
            <div className='container'>
              <h6 className='fw-bold my-4'>Name : {modalData.name}</h6>
              <h6 className='fw-bold my-4'>EXP : {modalData.exp}</h6>
              <h6 className='fw-bold my-4'>Category : {modalData.cat}</h6>
              <h6 className='fw-bold my-4'>รายละเอียด</h6>
              <p>{modalData.des}</p>
              <div className='row py-2'>
                <NavLink to={`/edit/1`}>
                  <Button
                    className='w-100 py-3 fw-bold'
                    color='light text-dark'
                  >
                    Edit
                  </Button>
                </NavLink>
              </div>
              <div className='row py-2'>
                <Button
                  className='w-100 py-3'
                  color='warning text-white fw-bold'
                  style={{ borderRadius: '16px' }}
                >
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

export default connect(mapStateToProps)(ListProduct)
