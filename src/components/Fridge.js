import { useEffect } from 'react'
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './css/Fridge.module.css'

import ListFridge from './ListFridge'

const Fridge = (props) => {
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
              {/* <FontAwesomeIcon icon='fa-solid fa-filter' /> */}
            </h2>
          </div>
        </div>
      </header>
      <section className={styles.itembox}>
        <ListFridge />
      </section>
    </>
  )
}

export default connect()(Fridge)
