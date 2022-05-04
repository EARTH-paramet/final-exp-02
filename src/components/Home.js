import { useEffect } from 'react'
import { connect } from 'react-redux'

import styles from './css/Home.module.css'

import ListProduct from './ListProduct'
import Search from './Search'
import Filter from './Filter'

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
            <h2>APP NAME</h2>
          </div>
          <div className='col-6 '>
            <h2 className='text-end'>
              <Filter />
            </h2>
          </div>
        </div>
        <Search />
      </header>
      <section className={styles.SectionList}>
        <ListProduct />
        <ListProduct />
        <ListProduct />
        <ListProduct />
        <ListProduct />
        <ListProduct />
      </section>
    </>
  )
}

export default connect()(Home)
