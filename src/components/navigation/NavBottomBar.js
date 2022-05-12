import { NavLink } from './NavLink'

import styles from '../css/NavBottomBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SvgFridge from './SvgFridge'

export default function NavBottomBar() {
  return (
    <div
      className={styles.bottomAppbar}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className={styles.tabs}>
        <div className={`${styles.tab} ${styles.tabLeft}`}>
          <div className='row'>
            <div className={`col-6 ${styles.menuNav}`}>
              <NavLink to='/'>
                <div className={styles.iconsBar}>
                  <FontAwesomeIcon
                    className='icon'
                    icon='fa-solid fa-house'
                    size='xl'
                  />
                </div>
                <span>Home</span>
              </NavLink>
            </div>
            <div className={`col-6 ${styles.menuNav}`}>
              <NavLink to='/fridge'>
                <div className={styles.iconsBar}>
                  {/* <FontAwesomeIcon icon='fa-solid fa-snowflake' size='xl' /> */}
                  <SvgFridge size='xl' />
                </div>
                <span>Fridge</span>
              </NavLink>
            </div>
          </div>
        </div>
        <div className={`${styles.tab} ${styles.tabFab}`}>
          <div className={styles.top}>
            <NavLink to='/scan' className={styles.additem}>
              <div className={styles.fab}>
                <FontAwesomeIcon icon='fa-solid fa-plus' />
              </div>
            </NavLink>
          </div>
        </div>
        <div className={`${styles.tab} ${styles.tabRight}`}>
          <div className='row'>
            <div className={`col-6 ${styles.menuNav}`}>
              <NavLink to='/category'>
                <div
                  className={styles.iconsBar}
                  style={{ transform: 'translateX(15%)' }}
                >
                  <FontAwesomeIcon icon='fa-solid fa-layer-group' size='xl' />
                </div>
                <span>CATEGORY</span>
              </NavLink>
            </div>
            <div className={`col-6 ${styles.menuNav}`}>
              <NavLink to='/profile'>
                <div className={styles.iconsBar}>
                  <FontAwesomeIcon icon='fa-solid fa-user' size='xl' />
                </div>
                <span>Profile</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
