import React, { useEffect } from 'react'
import BarcodeScannerComponent from 'react-qr-barcode-scanner'
import { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import AddProduct from './AddProduct'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Scanner = (props) => {
  const [checked, setChecked] = useState('Not_Found')
  const [data, setData] = useState('Not Found')

  useEffect(() => {
    props.dispatch({
      type: 'SCANNER_ON',
    })
  }, [])

  const closeScanner = () => {
    props.dispatch({
      type: 'SCANNER_OFF',
    })
  }
  if (checked == 'Not_Found') {
    return (
      <div style={{ backgroundColor: '#fff', height: '100vh' }}>
        <header>
          <div className='container'>
            <div className='row pt-3'>
              <div className='col-2 py-1'>
                <NavLink to='/' onClick={closeScanner}>
                  <FontAwesomeIcon
                    icon='fa-solid fa-arrow-left-long'
                    size='xl'
                  />
                </NavLink>
              </div>
              <div
                className='col-8 text-center fw-bold'
                style={{ fontSize: '22px' }}
              >
                Add Product
              </div>
              <div className='col-2'>{/*  */}</div>
            </div>
          </div>
        </header>
        <section>
          <div className='container'>
            <div className='row bg-white m-2 mt-5 p-3'>
              <div className='px-0'>
                <BarcodeScannerComponent
                  width={'100%'}
                  height={'100%'}
                  onUpdate={(err, result) => {
                    if (result) {
                      props.master.masterProduct.map((val) => {
                        if (val.barcode == result.text) {
                          setChecked('Master_Data')
                          setData(result.text)
                        } else {
                          setChecked('New_Data')
                          setData(result.text)
                        }
                      })
                    } else setData('Not Found')
                  }}
                />
              </div>

              {/* <p>{data}</p> */}
            </div>

            {/* <div className='bg-success row'>
              <div className='col'>GGGG</div>
              <div className='col'>GGGG</div>
            </div> */}
          </div>

          {/* <div className='bg-success row'>
              <div className='col'>GGGG</div>
              <div className='col'>GGGG</div>
            </div> */}
        </section>
      </div>
    )
  } else if (checked == 'Master_Data') {
    return (
      <div>
        <h1>มีข้อมูลเก่า map หา master</h1>
        <AddProduct />
      </div>
    )
  } else if (checked == 'New_Data') {
    return (
      <div>
        <h1>ไม่มีข้อมูลเก่า สร้างใหม่เลย</h1>
        <AddProduct />
      </div>
    )
  } else {
    return (
      <div>
        <h1>fail</h1>
      </div>
    )
  }
  // return()
}
const mapStateToProps = (state) => {
  return {
    master: state.dataProduct,
  }
}
export default connect(mapStateToProps)(Scanner)
