import ListProduct from './ListProduct'
import Search from './Search'
import Profile from './Profile'
import NavBottomBar from './navigation/NavBottomBar'
import Filter from './Filter'
import Test from './test/Test'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './css/Page.module.css'

function Home() {
  return (
    <>
      {/* <Test /> */}
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
      <section className={`${styles.itembox} 'container'`}>
        <ListProduct />
      </section>
    </>
  )
}

export default Home
