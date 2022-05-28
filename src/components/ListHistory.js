import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Modal, ModalBody } from 'reactstrap'
import firebase from '../services/firebase'
import defaultImg from './assets/default-img-product.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import defaultImg from './assets/default-img-category.jpg'
import styles from './css/History.module.css'
// import './css/MyBootstrap.css'
import SvgFridge from './navigation/SvgFridge'
import useStateRef from 'react-usestateref'

const ListHistory = (props) => {
  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }
  const ref = firebase.firestore().collection('product')
  const [dataProduct, setDataProduct, dataProductRef] = useStateRef([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    ref
      .doc(props.dataUser.uid)
      .collection('history')
      .orderBy('dateCreate', 'desc')
      .onSnapshot((querySnapshot) => {
        const items = []
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          if (doc.data().barcode == '') {
          } else {
            items.push(doc.data())
          }
        })
        setDataProduct(items)
        setLoading(true)
      })
  }, [])
  return (
    <div className='container'>
      {loading ? (
        <>
          <div className={`row ${styles.boxHistory}`}>
            {dataProductRef.current.map((item, index) => (
              // <div className={`row my-3 ${styles.boxHistory}`}>
              // {console.log('item.value.date.seconds', item)}
              // <a
              //   href='#'
              //   className={`mb-3 list-group-item d-flex gap-3 ${styles.item}`}
              //   aria-current='true'
              //   key={index}
              // >
              <div
                className={`mb-3 list-group-item d-flex gap-3 ${styles.item}`}
                key={index}
              >
                <img
                  src={item.image ? item.image : defaultImg}
                  alt='twbs'
                  width='40'
                  height='40'
                  className='rounded-circle flex-shrink-0'
                />
                <div
                  className={`d-flex w-100 justify-content-between ${styles.itemText}`}
                >
                  <div>
                    <p className='mb-0'>{item.name} 123456789 123456789</p>

                    <p className='row g-3 mb-0' style={{ color: '#7F8E7F' }}>
                      <div className='col-1'>
                        <SvgFridge size='xs' />
                      </div>
                      <div className='col-9'>Fridge {item.fridge}</div>
                    </p>
                  </div>
                  {/* <div className='opacity-50 text-nowrap py-3'>
                    <FontAwesomeIcon
                      icon='fa-solid fa-ellipsis-vertical'
                      size='xl'
                    />
                  </div> */}
                  {/* <div className='d-flex flex-column'>
                    <div>
                      <p className='mb-0'>{item.name} 12345689</p>
                    </div>
                    <div>
                      <p className='mb-0'>fridge {item.fridge}</p>
                    </div>
                  </div> */}
                  <small className='opacity-50 text-nowrap my-auto'>
                    {item.date.toDate().toLocaleString('en-AU', options)}
                  </small>

                  {/* <DateFunc date={item.value.date.seconds} item={item.value} /> */}
                </div>
              </div>
              // </a>
              // </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    dataUser: state.dataUser,
    product: state.dataProduct,
  }
}

export default connect(mapStateToProps)(ListHistory)
