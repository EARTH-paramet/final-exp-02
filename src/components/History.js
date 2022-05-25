import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './css/History.module.css'

import ListHistory from './ListHistory'

const History = (props) => {
  // const [dataProfile, setDataProfile] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    props.dispatch({
      type: 'SCANNER_ON',
    })
    // setDataProfile(props.data)
    setLoading(true)
  }, [])
  const closeScanner = () => {
    props.dispatch({
      type: 'SCANNER_ON',
    })
  }

  return (
    <>
      {loading ? (
        <div>
          <header className={styles.navbar}>
            <div className='row mt-2'>
              <div className='col-2 py-1'>
                <NavLink to='/profile' onClick={closeScanner}>
                  <FontAwesomeIcon
                    icon='fa-solid fa-arrow-left-long'
                    size='xl'
                    style={{ color: '#000' }}
                  />
                </NavLink>
              </div>
              <div
                className='col-8 text-center fw-bold'
                style={{ fontSize: '22px' }}
              >
                History
              </div>
              <div className='col-2'>
                <h2 className='text-end'></h2>
              </div>
            </div>
          </header>
          <section className={styles.SectionList}>
            <ListHistory />
          </section>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    data: state.dataUser,
  }
}
export default connect(mapStateToProps)(History)
