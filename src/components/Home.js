import { useEffect } from 'react'
import { connect } from 'react-redux'

import styles from './css/Home.module.css'

import ListProduct from './ListProduct'
import Search from './Search'
import Filter from './Filter'

import image_logo from './assets/RD_Logo-1.png'
const Home = (props) => {
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
          <div className='col-6 pt-1'>
            <h2 className='text-end'>
              <Filter />
            </h2>
          </div>
        </div>
        <Search />
      </header>
      <section className={styles.SectionList}>
        <ListProduct />
      </section>
    </>
  )
}

export default connect()(Home)
