import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './css/AddEditProduct.module.css'

import ImageUpload from './input/ImageUpload'

// import Inputs from './input/Inputs'
const mapStateToProps = (state) => {
  return {
    data: state.dataProduct,
  }
}

function EditProduct({ data }) {
  const [editData, setEditData] = useState(data.productData[useParams().id])
console.log("editData",editData)
console.log("editData",editData.date.toDate().toLocaleString('en-CA').split(',')[0])
  const [dataform, setDataform] = useState({
    barcode: editData.barcode,
    category: editData.category,
    date: editData.date.toDate().toLocaleString('en-CA').split(',')[0],
    image: editData.image,
    name: editData.name,
    note: editData.note
  })

  const handle = (e) => {
    const newdata = { ...dataform }
    newdata[e.target.id] = e.target.value
    setDataform(newdata)
    console.log(newdata)
  }

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
            <ImageUpload image={dataform.image}/>

            <h2 className='mt-3'>Food Details</h2>
          </div>
          <div className='mx-3 mb-3'>
            <form>
              <div className='mb-3'>
                <label className='form-label fw-bold'>Name</label>
                <input
                  onChange={(e) => handle(e)}
                  id='Name'
                  type='text'
                  defaultValue={dataform.name}
                  className='form-control'
                  style={{
                    borderRadius: '20px',
                    border: '1px solid rgb(255 195 0)',
                  }}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label fw-bold'>Category</label>
                <input
                  onChange={(e) => handle(e)}
                  id='Category'
                  type='text'
                  defaultValue={dataform.category}
                  className='form-control'
                  style={{
                    borderRadius: '20px',
                    border: '1px solid rgb(255 195 0)',
                  }}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label fw-bold'>Description</label>
                <input
                  onChange={(e) => handle(e)}
                  id='Description'
                  type='text'
                  defaultValue={dataform.note}
                  className='form-control'
                  style={{
                    borderRadius: '20px',
                    border: '1px solid rgb(255 195 0)',
                  }}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label fw-bold'>Date</label>
                <input
                  onChange={(e) => handle(e)}
                  id='Date'
                  type='date'
                  defaultValue={dataform.date}
                  className='form-control'
                  style={{
                    borderRadius: '20px',
                    border: '1px solid rgb(255 195 0)',
                  }}
                />
              </div>
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
