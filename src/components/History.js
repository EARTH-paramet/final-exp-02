import { useEffect } from 'react'
import { connect } from 'react-redux'

import styles from './css/History.module.css'

import ListHistory from './ListHistory'

const History = (props) => {
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
            <h2 className='text-end'></h2>
          </div>
        </div>
      </header>
      <section className={styles.SectionList}>
        <ListHistory />
      </section>
    </>
  )
}
export default connect()(History)
