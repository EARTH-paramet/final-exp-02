import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalBody } from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './css/Filter.module.css'
const Filter = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false)
  //   const [modalData, setModalData] = useState({})
  const toggle = () => setModalOpen(!modalOpen)
  return (
    <>
      <FontAwesomeIcon
        icon='fa-solid fa-filter'
        onClick={() => {
          //   setModalData(item)
          toggle()
        }}
      />
      <div>
        <Modal size='sm' isOpen={modalOpen} toggle={() => toggle()}>
          <ModalBody>
            <div className='container'>
              <div className='row my-4'>
                <h6 className='col-8 fw-bold pt-2'>Filter</h6>
                <h6 className='col-4'>
                  <Button className={`${styles.btnReset} w-100 fw-bold`}>
                    Reset
                  </Button>
                </h6>
              </div>
              <div className='row my-4'>
                <h6 className='col-8 fw-bold'>Sort By</h6>
                <h6 className='col-4 text-end text-warning'>{/* test */}</h6>
              </div>
              <div className='row mb-1'>
                <h6 className='col-6'>
                  <Button
                    className={`${styles.btnFilter} w-100 py-2 fw-bold`}
                    color='ligth text-black'
                  >
                    A-Z
                  </Button>
                </h6>
                <h6 className='col-6'>
                  <Button
                    className={`${styles.btnFilter} w-100 py-2 fw-bold`}
                    color='ligth text-black'
                  >
                    Z-A
                  </Button>
                </h6>
              </div>
              <div className='row mb-1'>
                <h6 className='col-6'>
                  <Button
                    className={`${styles.btnFilter} w-100 py-2 fw-bold`}
                    color='ligth text-black'
                  >
                    Newest
                  </Button>
                </h6>
                <h6 className='col-6'>
                  <Button
                    className={`${styles.btnFilter} w-100 py-2 fw-bold`}
                    color='ligth text-black'
                  >
                    Oldest
                  </Button>
                </h6>
              </div>

              <div className='row py-2'>
                <Button
                  className='w-100 py-3 fw-bold'
                  color='warning text-white'
                  style={{ borderRadius: '16px' }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  )
}

export default Filter
