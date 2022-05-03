import ListProduct from './ListProduct'
import Search from './Search'
import Profile from './Profile'
import NavBottomBar from './navigation/NavBottomBar'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './css/Page.module.css'
import ListCategory from './ListCategory'
import { useEffect } from 'react'

const Category = (props)=>{
  useEffect(()=>{
    props.dispatch({
      type: 'SCANNER_OFF',
    })
  },[])

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
        {/* <Search /> */}
      </header>
      <section className={`${styles.itembox} 'container'`}>
        <ListCategory />
      </section>
      {/* <footer>
        <NavBottomBar />
      </footer> */}
    </>
  )
}

export default connect()(Category)
