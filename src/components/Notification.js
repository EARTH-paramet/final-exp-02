import { useEffect } from 'react'
import { connect } from 'react-redux'

import styles from './css/Notification.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ListNotification from './ListNotification'
import FilterNoti from './FilterNoti'

const Notification = (props) => {
  useEffect(() => {
    props.dispatch({
      type: 'SCANNER_OFF',
    })
  }, [])
  return (
    <>
      <header className={styles.navbar}>
        <div className='row mt-2'>
          <div className='col-6'>
            <h2>APP NAME</h2>
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
    </>
  )
}
export default connect()(Notification)
