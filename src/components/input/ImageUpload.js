import React, { useEffect, useState } from 'react'
import { storage } from '../../services/firebase'
import firebase from '../../services/firebase'
import styles from '../css/AddEditProduct.module.css'
import useStateRef from 'react-usestateref'
import { connect } from 'react-redux'

const ImageUpload = (props) => {
  const dateName = Date.now()
  const [image, setImage] = useState(null)
  const [imageDefault, setImageDefault] = useState('https://via.placeholder.com/140')
  const [group, setGroup, groupRef] = useStateRef("null")
  const ref = firebase.firestore().collection("product");
  useEffect(()=>{
  console.log(imageDefault)
  if(props.image){
    setImageDefault(props.image)
  }else{
    console.log("image not found")
  }

  ref
      .where("uid", "==", props.data.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          setGroup(doc.data().defaultGroup)
        });

        
      });


     
    console.log("id",props.id)
  },[])
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  const handleClick = () => {
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
            updateUrlImage(url)
          })
      }
    )
  }
  const updateUrlImage = (url) =>{
      ref
          .doc(props.data.uid)
          .collection(`group${groupRef.current}`)
          .doc(props.id)
          .set({
            barcode: props.value.barcode,
            category: props.value.category,
            date: props.date,
            image: url,
            name: props.value.name,
            note: props.value.note,
          })
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
const mapStateToProps = (state) => {
  return {
    data: state.dataUser,
  };
};
export default connect(mapStateToProps)(ImageUpload)
