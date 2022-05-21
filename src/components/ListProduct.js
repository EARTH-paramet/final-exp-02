import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Modal, ModalBody } from 'reactstrap'
import firebase from '../services/firebase'
import { Timestamp } from 'firebase/firestore'

import defaultImg from './assets/default-img-product.jpg'
import styles from './css/Home.module.css'
import useStateRef from 'react-usestateref'
// import "./css/MyBootstrap.css";

const ListProduct = ({ data, product }) => {
  const [group, setGroup] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})
  const [modalIndex, setModalIndex] = useState()
  const toggle = () => setModalOpen(!modalOpen)
  const ref = firebase.firestore().collection('product')
  const ref2 = firebase.firestore().collection('test')
  const [dataProduct, setDataProduct, dataProductRef] = useStateRef([])

  // date format
  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }
  useEffect(() => {
    ref
      .where('uid', '==', data.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          setGroup(doc.data().defaultGroup)
        })
        ref
          .doc(data.uid)
          .collection(`group${group}`)
          .onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
              if (doc.data().barcode == '') {
                items.push('null')
              
              } else {
                items.push(doc.data())
            
              }
            })
            setDataProduct(items)
            
          })
      })
  }, [product.productData])

  const DateFunc = ({ date, item }) => {
    const timeStampNow = firebase.firestore.Timestamp.fromDate(
      new Date()
    ).seconds
    const dateToday = parseInt(timeStampNow / 86400) * 86400 - 60 * 60 * 7
    console.log('date=>', dateToday)
    if (date < dateToday) {
      return (
        <small className='opacity-50 text-nowrap' style={{ color: 'red' }}>
          {item.date.toDate().toLocaleString('en-AU', options)}
        </small>
      )
    } else if (date < dateToday + 86400) {
      console.log(dateToday + 86400)
      return <small className='opacity-50 text-nowrap'>Today</small>
    } else if (date >= dateToday + 86400) {
      return (
        <small className='opacity-50 text-nowrap'>
          {item.date.toDate().toLocaleString('en-AU', options)}
        </small>
      )
    } else {
      return <></>
    }
  }

  const moveToHistory = ()=>{
    const productMove = product.productData[modalIndex]

    console.log("value",productMove)
    console.log("value")
    console.log(data.uid)
    console.log(group)
    console.log(product.productData[modalIndex].id)
    ref.doc(data.uid).collection(`group${group}`).doc(productMove.id).delete().then(()=>{
      console.log("successfully deleted! ")
      ref.doc(data.uid).collection('history').doc(String(Timestamp.fromDate(new Date()).seconds)).set({
        barcode: productMove.value.barcode,
        category: productMove.value.category,
        date: productMove.value.date,
        dateCreate: Timestamp.fromDate(new Date()),
        image: productMove.value.image,
        name: productMove.value.name,
        note: productMove.value.note,
        name:"Test"
      }).then(()=>setModalOpen(false))
    }).catch((error)=>{ console.log("Error removing document:", error)
    })
  }

  const TextAddData = () => {
    if (dataProductRef.current == "null") {
      return (
        <div className={styles.textCenter}>
          <h1>เพิ่มรายการอาหาร</h1>
        </div>
      )
    } else {
      return <></>
    }
  }
  return (
    <div className='container'>
        <TextAddData />
  
      {product.productData.map((item, index) => (
        <div className={`row my-3 ${styles.boxProduct}`} key={index}>
          { console.log("item.value.date.seconds",item.value)}
          <a
            href='#'
            className={`list-group-item d-flex gap-3 ${styles.item}`}
            aria-current='true'
            onClick={() => {
              setModalData(item.value)
              setModalIndex(index)
              toggle()
            }}
          >
            <img
              src={item.value.image ? item.value.image : defaultImg}
              alt='twbs'
              width='40'
              height='40'
              className='rounded-circle flex-shrink-0'
            />
            <div
              className={`d-flex w-100 justify-content-between ${styles.itemText}`}
            >
              <div>
                <p className='mb-0'>{item.value.name}</p>
              </div>
              <DateFunc date={item.value.date.seconds} item={item.value} />
            </div>
          </a>
        </div>
      ))}
      <div>
        <Modal size='xl' isOpen={modalOpen} toggle={() => toggle()}>
          <ModalBody>
            <div className='container'>
              <div className='row my-4'>
                <h6 className='fw-bold col-4'>Name :</h6>
                <h6 className={`col-8 text-end ${styles.textStyle}`}>
                  {modalData.name}
                </h6>
              </div>
              <div className='row my-4'>
                <h6 className='fw-bold col-4'>EXP :</h6>
                <h6 className={`col-8 text-end ${styles.textStyle}`}>
                  {modalData.date
                    ? modalData.date.toDate().toLocaleString('en-AU', options)
                    : ''}
                </h6>
              </div>
              <div className='row my-4'>
                <h6 className='fw-bold col-5'>Category :</h6>
                <h6 className={`col-7 text-end ${styles.textStyle}`}>
                  {modalData.category}
                </h6>
              </div>
              <div className='row my-4'>
                <h6 className='fw-bold col-12'>รายละเอียด :</h6>
                <div
                  className='col-12 text-end'
                  style={{ wordWrap: 'break-word' }}
                >
                  <h6 className={`text-start ${styles.textStyle}`}>
                    {modalData.note}
                  </h6>
                </div>
              </div>

              <div className='row py-2'>
                <NavLink to={`/edit/${modalIndex}`}>
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
                  onClick={moveToHistory}
                  // ()=>console.log(product.productData[modalIndex])
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
    product: state.dataProduct,
  }
}

export default connect(mapStateToProps)(ListProduct)
