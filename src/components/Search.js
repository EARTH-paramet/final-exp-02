import React, { useEffect } from "react";
import styles from "./css/Searchbar.module.css";
import { connect } from "react-redux";
import firebase from "../services/firebase";

const Search = (props) => {
  const ref = firebase.firestore().collection("product");
  let group = "null";
  useEffect(() => {
    ref
      .where("uid", "==", props.data.uid)
      .get()
      .then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          group = doc.data().defaultGroup;
        });
        ref
          .doc(props.data.uid)
          .collection(`group${group}`)
          .orderBy("date")
          .onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
              console.log(doc.data());
              if (doc.data().barcode == "") {
              } else {
                items.push(doc.data());
                console.log("items", doc.data());
              }
            });

            props.dispatch({
              type: "ADD_PRODUCT",
              payload: items,
            });
            // setDataProduct(items)
            // console.log('Output_dataUser', dataUser)
          });
      });
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    ref.where("uid","==",props.data.uid).get().then(querySnapshot => {
      // let group = "null"
      querySnapshot.forEach(doc => {
        console.log(doc.data());
       group = doc.data().defaultGroup
      });
    })
    if(e.target.value==""){
      ref
      .doc(props.data.uid)
      .collection(`group${group}`)
      .orderBy("date")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().barcode == "") {
          } else {
            items.push(doc.data());
          }
          console.log("itemsSEARC", doc.data());
        });
        props.dispatch({
          type: "ADD_PRODUCT",
          payload: items,
        });
      });
    }else{
      ref
      .doc(props.data.uid)
      .collection(`group${group}`)
      .orderBy("name")
      .startAt(e.target.value)
      .endAt(e.target.value + "\uf8ff")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().barcode == "") {
          } else {
            items.push(doc.data());
          }
          console.log("itemsSEARC", doc.data());
        });
        props.dispatch({
          type: "ADD_PRODUCT",
          payload: items,
        });
      });
    }
  }
  return (
    <div className="mt-1 mb-3">
      <input
        //className='form-control mr-sm-2'
        className={styles.input}
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleChange}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    data: state.dataUser,
  };
};

export default connect(mapStateToProps)(Search);
