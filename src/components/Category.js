import { useEffect } from 'react'
import { connect } from 'react-redux'

import styles from './css/Category.module.css'

import ListCategory from './ListCategory'
import image_logo from './assets/RD_Logo-1.png'
const Category = (props) => {
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
            {/* <h2>APP NAME</h2> */}
            <img src={image_logo} alt='logo' width={50} />
          </div>
          <div className='col-6 '>
            <h2 className='text-end'></h2>
          </div>
        </div>
      </header>
      <section className={styles.SectionList}>
        <ListCategory />
      </section>
    </>
  )
}

export default connect()(Category)
