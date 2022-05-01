// import "./Home.scss";
import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './css/Page.module.css'

import Inputs from './input/Inputs'
const mapStateToProps = (state) => {
  return {
    data: state.dataProduct,
  }
}

function EditProduct({ data }) {
  const [editData, setEditData] = useState(data.productData[useParams().id])
  return (
    <>
      <header>
        <div className='container'>
          <div className='row mt-3'>
            <div className='col-2 py-1'>
              <NavLink to='/'>
                <FontAwesomeIcon icon='fa-solid fa-arrow-left-long' size='xl' />
              </NavLink>
            </div>
            <div
              className='col-8 text-center fw-bold'
              style={{ fontSize: '22px' }}
            >
              Edit Product
            </div>
            <div className='col-2'>{/*  */}</div>
          </div>
        </div>
      </header>
      <section style={{ marginBottom: '100px' }}>
        <div className='container'>
          <div className='text-center mt-5'>
            {/* <div className={styles.avatar}>
              <img alt='' src={props.data.image} />
            </div> */}
            <svg
              className='bd-placeholder-img rounded-circle'
              width='140'
              height='140'
              xmlns='http://www.w3.org/2000/svg'
              role='img'
              aria-label='Placeholder: 140x140'
              preserveAspectRatio='xMidYMid slice'
              focusable='false'
            >
              <title>Placeholder</title>
              <rect width='100%' height='100%' fill='#777' />
              <text x='50%' y='50%' fill='#777' dy='.3em'>
                140x140
              </text>
            </svg>

            <h2 className='mt-3'>Food Details</h2>
          </div>
          <div className='mx-3 mb-3'>
            <form action='/' method='POST'>
              <Inputs type='text' topic='Name' value={editData.name} />
              <Inputs type='text' topic='Category' value={editData.cat} />
              <Inputs type='text' topic='Description' value={editData.des} />
              <Inputs type='date' topic='Date' value={editData.exp} />
              {/* <Inputs type='time' topic='Time' value={editData.time} /> */}
              <Button
                className='w-100 py-3'
                color='warning text-white'
                style={{ borderRadius: '16px' }}
              >
                Update
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default connect(mapStateToProps)(EditProduct)
