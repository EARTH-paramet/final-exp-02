import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import firebase from '../services/firebase'
import { storage } from '../services/firebase'
import { useNavigate } from 'react-router-dom'
import useStateRef from 'react-usestateref'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './css/AddEditProduct.module.css'
import defaultImg from './assets/default-img-product.jpg'
import { FieldValue, serverTimestamp, Timestamp } from 'firebase/firestore'
// import ImageUpload from "./input/ImageUpload";

function EditProduct(props) {
  let navigate = useNavigate()
  const [editData, setEditData] = useState(
    props.data.productData[useParams().id]
  )
  // console.log('editData', editData.value)
  // console.log('editData', editData.id)
  // console.log(
  //   'editData',
  //   editData.value.date.toDate().toLocaleString('en-CA').split(',')[0]
  // )
  const [urlUpload, setUrlUpload, urlUploadRef] = useStateRef(
    editData.value.image
  )
  const [dataform, setDataform, dataformRef] = useStateRef({
    id: editData.id,
    barcode: editData.value.barcode,
    category: editData.value.category,
    date: editData.value.date,
    image: editData.value.image,
    name: editData.value.name,
    note: editData.value.note,
  })
  const dateName = Date.now()
  const [image, setImage] = useState(null)
  const [imageDefault, setImageDefault] = useState(defaultImg)
  const [group, setGroup, groupRef] = useStateRef('null')
  const ref = firebase.firestore().collection('product')

  useEffect(() => {
    console.log(imageDefault)
    if (dataform.image) {
      setImageDefault(dataform.image)
    } else {
      console.log('image not found')
    }

    ref
      .where('uid', '==', props.dataUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          setGroup(doc.data().defaultGroup)
        })
      })

    console.log('id', dataform.id)
  }, [])

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  const updateFirebase = () => {
    ref
      .doc(props.dataUser.uid)
      .collection(`group${groupRef.current}`)
      .doc(dataform.id)
      .update({
        barcode: dataformRef.current.barcode,
        category: dataformRef.current.category,
        date: dataformRef.current.date,
        image: urlUploadRef.current,
        name: dataformRef.current.name,
        note: dataformRef.current.note,
      })
      .then(navigate('/'))
  }
  const handleClick = () => {
    if (image) {
      const uploadTask = storage
        .ref(`product/images/${dateName + image.name}`)
        .put(image)
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          console.log(error)
        },
        () => {
          storage
            .ref('product/images')
            .child(`${dateName + image.name}`)
            .getDownloadURL()
            .then((url) => {
              console.log('url', url)
              setUrlUpload(url)
              updateFirebase()
            })
        }
      )
    } else {
      updateFirebase()
    }
  }
  if (image) {
    console.log('image', URL.createObjectURL(image))
  }

  const handle = (e) => {
    const newdata = { ...dataform }
    if (e.target.id == 'date') {
      newdata[e.target.id] = Timestamp.fromDate(new Date(e.target.value))
      // console.log(Timestamp.fromDate(new Date(e.target.value)))
    } else {
      newdata[e.target.id] = e.target.value
    }

    setDataform(newdata)
    console.log('newdata=> ', newdata)
  }

  return (
    <>
      <header className={styles.navbar}>
        <div className='container'>
          <div className='row mt-2'>
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
      <section className={styles.SectionForm}>
        <div className='container'>
          <div className='text-center mt-5'>
            {/* image Upload */}
            <div class={styles.wrapper}>
              <div class={`rounded-circle ${styles.btnimg}`}>
                <img
                  src={image ? URL.createObjectURL(image) : imageDefault}
                  alt='upload'
                  width='140'
                  height='140'
                  className='rounded-circle'
                />
              </div>
              <input type='file' accept='image/*' onChange={handleChange} />
            </div>

            {/* <ImageUpload image={dataform.image} id={dataform.id} date={editData.value.date} value={dataform}/> */}

            <h2 className='mt-3'>Food Details</h2>
          </div>
          <div className='mx-3 mb-3'>
            <form>
              <div className='mb-3'>
                <label className='form-label fw-bold'>Name</label>
                <input
                  onChange={(e) => handle(e)}
                  id='name'
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
                <select
                  onChange={(e) => handle(e)}
                  id='category'
                  class='form-select'
                  style={{
                    borderRadius: '20px',
                    border: '1px solid rgb(255 195 0)',
                  }}
                  defaultValue={dataform.category}
                >
                  <option selected hidden>
                    Open this select menu
                  </option>
                  <option defaultValue='Meat'>Meat</option>
                  <option defaultValue='Fruit'>Fruit</option>
                  <option defaultValue='Vegetable'>Vegetable</option>
                </select>
                {/* <input
                  onChange={(e) => handle(e)}
                  id='category'
                  type='text'
                  defaultValue={dataform.category}
                  className='form-control'
                  style={{
                    borderRadius: '20px',
                    border: '1px solid rgb(255 195 0)',
                  }}
                /> */}
              </div>
              <div className='mb-3'>
                <label className='form-label fw-bold'>Description</label>
                <input
                  onChange={(e) => handle(e)}
                  id='note'
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
                  id='date'
                  type='date'
                  defaultValue={
                    dataform.date.toDate().toLocaleString('en-CA').split(',')[0]
                  }
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
                onClick={handleClick}
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
const mapStateToProps = (state) => {
  return {
    data: state.dataProduct,
    dataUser: state.dataUser,
  }
}
export default connect(mapStateToProps)(EditProduct)
