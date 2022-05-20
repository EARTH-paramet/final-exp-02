import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { signInWithGoogle, auth } from '../services/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './css/Profile.module.css'
import firebase from '../services/firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import NavBottomBar from './navigation/NavBottomBar'

const Profile = (props) => {
  const [dataProfile, setDataProfile] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    props.dispatch({
      type: 'SCANNER_OFF',
    })

    setDataProfile(props.data)
    setLoading(true)
  }, [])
  console.log(dataProfile)
  return (
    <>
      <header className={styles.top}>
        <div className='container'>
          <div className='row'>
            <div className='col-6 mt-2'>
              {/* <NavLink to='/'>
                <FontAwesomeIcon icon='fa-solid fa-arrow-left-long' size='xl' />
              </NavLink> */}
            </div>
            <div className='col-6 mt-3'>
              <h2 className='text-end'>
                <NavLink to='/notification'>
                  <FontAwesomeIcon icon='fa-solid fa-bell' size='lg' />
                </NavLink>
              </h2>
            </div>
          </div>
        </div>
      </header>
      <section className={styles.cardInfoUser}>
        {loading ? (
          <div className='container'>
            <div className='row'>
              <div className={styles.avatar}>
                <img alt='' src={props.data.image} />
              </div>
              <div className={`mt-2 ${styles.info}`}>
                <div className={styles.title}>{props.data.name}</div>
                {/* <p className='col'>{props.data.uid}</p> */}
                <div className={`px-4 mt-5 ${styles.desc}`}>
                  <div className='row mb-3'>
                    <div className='col-4 text-start'>Email</div>
                    <div className='col-8 text-end'>{props.data.email}</div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col-4 text-start'>Phone Number</div>
                    <div className='col-8 text-end'>{props.data.phone}</div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col-4 text-start'>Feedback</div>
                    <div className='col-8 text-end'></div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col-4 text-start'>
                      <NavLink to='/history'>History</NavLink>
                    </div>
                    <div className='col-8 text-end'></div>
                  </div>
                  {/* <div className='row'> */}
                  {/* <button className='btn btn-primary'>history</button> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <NavLink
          to='/'
          onClick={() => {
            auth.signOut()
            props.dispatch({
              type: 'SIGN_OUT',
            })
          }}
        >
          <button className='btn btn-outline-danger m-3'>sign out</button>
        </NavLink>
        <button
          className='btn btn-outline-warning m-3'
          onClick={() => {
            const ref = firebase.firestore().collection('product')
            var group
            ref
              .where('uid', '==', props.data.uid)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  // console.log('group data=> ', doc.data())
                  group = doc.data().defaultGroup
                })
                ref
                  .doc(props.data.uid)
                  .collection(`group${group}`)
                  .onSnapshot((querySnapshot) => {
                    const items = []
                    querySnapshot.forEach((doc) => {
                      items.push(doc.data())

                      if (doc.data().barcode == '') {
                      } else {
                        ref
                          .doc(props.data.uid)
                          .collection(`group${group}`)
                          .doc(doc.id)
                          .delete()
                        console.log(doc.data())
                      }
                    })
                    // setDataProduct(items)
                    // console.log('Output_dataUser', dataUser)
                  })
              })
          }}
        >
          delete product
        </button>
      </section>
      {/* <footer>
        <NavBottomBar />
      </footer> */}
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    data: state.dataUser,
  }
}
export default connect(mapStateToProps)(Profile)
