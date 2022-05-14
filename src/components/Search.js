import React, { useEffect, useState } from "react";
import styles from "./css/Searchbar.module.css";
import { connect } from "react-redux";
import firebase from "../services/firebase";
import useStateRef from "react-usestateref";

const Search = (props) => {
  const ref = firebase.firestore().collection("product");
  const [sortSelect, setSortSelect, sortSelectRef] = useStateRef({
    field: "date",
    sort: "asc",
  });
  const [group, setGroup, groupRef] = useStateRef("null")
  useEffect(() => {
    if (props.dataFilter.sort == "ascName") {
      setSortSelect({ field: "name", sort: "asc" });
    } else if (props.dataFilter.sort == "descName") {
      setSortSelect({ field: "name", sort: "desc" });
    } else if (props.dataFilter.sort == "ascAdd") {
      setSortSelect({ field: "date", sort: "asc" });
    } else if (props.dataFilter.sort == "descAdd") {
      setSortSelect({ field: "date", sort: "desc" });
    }else if(props.dataFilter.sort == "ascDate"){
      setSortSelect({ field: "date", sort: "asc" });
    }
    ref
      .where("uid", "==", props.data.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("search group=> ",doc.data());
          setGroup(doc.data().defaultGroup)
        });

        ref
          .doc(props.data.uid)
          .collection(`group${groupRef.current}`)
          .orderBy(sortSelectRef.current.field, sortSelectRef.current.sort)
          .onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
              console.log("search item=> ",doc.data());
              if (doc.data().barcode == "") {
              }
              else if(doc.data().date == null){
              }
               else {
                items.push({id: doc.id, value: doc.data()});
                console.log("search add items", doc.data());
              }
            });
// console.log("items",items)
console.log("TOTAL=> ",items)
            props.dispatch({
              type: "ADD_PRODUCT",
              payload: items,
            });
          });
      });
  }, [props.dataFilter.sort]);

  const handleChange = (e) => {
    console.log(e.target.value);
    // ref
    //   .where("uid", "==", props.data.uid)
    //   .get()
    //   .then((querySnapshot) => {
    //     // let group = "null"
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.data());
    //       group = doc.data().defaultGroup;
    //     });
    //   });
    if (e.target.value == "") {
      ref
        .doc(props.data.uid)
        .collection(`group${groupRef.current}`)
        .orderBy("date")
        .onSnapshot((querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            if (doc.data().barcode == "") {
            } else {
              items.push({id: doc.id, value: doc.data()});
            }
            console.log("itemsSEARC", doc.data());
          });
          props.dispatch({
            type: "ADD_PRODUCT",
            payload: items,
          });
        });
    } else {
      ref
        .doc(props.data.uid)
        .collection(`group${groupRef.current}`)
        .orderBy("name")
        .startAt(e.target.value)
        .endAt(e.target.value + "\uf8ff")
        .onSnapshot((querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            if (doc.data().barcode == "") {
            } else {
              items.push({id: doc.id, value: doc.data()});
            }
            console.log("itemsSEARC", doc.data());
          });
          props.dispatch({
            type: "ADD_PRODUCT",
            payload: items,
          });
        });
    }
  };
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
    dataFilter: state.dataFilter,
  };
};

export default connect(mapStateToProps)(Search);
