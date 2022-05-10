import React, { useEffect, useState } from 'react'
import { storage } from '../../services/firebase'
import styles from '../css/AddEditProduct.module.css'

const ImageUpload = (props) => {
  const [image, setImage] = useState(null)
  const [imageDefault, setImageDefault] = useState('https://via.placeholder.com/140')
  useEffect(()=>{
  console.log(imageDefault)
  if(props.image){
    setImageDefault(props.image)
  }else{

  }
    
  },[])
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  const handleClick = () => {
    const uploadTask = storage
      .ref(`product/images/${Date.now() + '_' + image.name}`)
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
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log('url', url)
          })
      }
    )
  }
  if (image) {
    console.log('image', URL.createObjectURL(image))
  }

  return (
    <>
      <div class={styles.wrapper}>
        <div class={`rounded-circle ${styles.btnimg}`}>
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : imageDefault
            }
            alt='upload'
            width='140'
            height='140'
            className='rounded-circle'
          />
        </div>
        <input type='file' accept='image/*' onChange={handleChange} />
      </div>
      {/* <input type='file' accept='image/*' onChange={handleChange} /> */}
      <button onClick={handleClick}>Upload</button>
    </>
  )
}
export default ImageUpload
