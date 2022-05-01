import React from 'react'
import styles from './css/Searchbar.module.css'
export default function Search() {
  return (
    <div className='mt-1 mb-3'>
      <input
        //className='form-control mr-sm-2'
        className={styles.input}
        type='search'
        placeholder='Search'
        aria-label='Search'
      />
    </div>
  )
}
