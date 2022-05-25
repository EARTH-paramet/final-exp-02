import { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import styles from './css/Notification.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ListNotification from './ListNotification'
import FilterNoti from './FilterNoti'

const Notification = (props) => {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    props.dispatch({
      type: 'SCANNER_ON',
    })
    setLoading(true)
  }, [])
  return (
    <>
    {loading ? (<>
      <header className={styles.navbar}>
        <div className='row mt-2'>
          <div className='col-6'>
          <NavLink to="/profile" >
                  <FontAwesomeIcon
                    icon="fa-solid fa-arrow-left-long"
                    size="xl"
                    style={{ color: "#000" }}
                  />
                </NavLink>
          </div>
          <div className='col-6 '>
            <h2 className='text-end'>
              {/* <FontAwesomeIcon icon='fa-solid fa-calendar-days' /> */}
              <FilterNoti />
            </h2>
          </div>
        </div>
      </header>
      <section className={styles.SectionList}>
        <ListNotification />
      </section>
    </>):(<></>)}
      
    </>
  )
}
export default connect()(Notification)
