import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Modal, ModalBody } from "reactstrap";
import firebase from "../services/firebase";
import defaultImg from "./assets/default-img-product.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import defaultImg from './assets/default-img-category.jpg'
import styles from "./css/History.module.css";
// import './css/MyBootstrap.css'
import SvgFridge from "./navigation/SvgFridge";
import useStateRef from "react-usestateref";

const ListHistory = (props) => {
  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }
  const ref = firebase.firestore().collection("product");
  const [dataProduct, setDataProduct, dataProductRef] = useStateRef([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    
      ref
      .doc(props.dataUser.uid)
      .collection("history").orderBy('dateCreate','desc')
      .onSnapshot((querySnapshot) => {
        const items = []
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          if (doc.data().barcode == '') {
          } else {
            items.push(doc.data())
        
          }
        });
        setDataProduct(items)
        setLoading(true)
      });
   
  }, []);
  return (
    <div className="container">
      {loading? (
        <>
        {dataProductRef.current.map((item, index) => (
        <div className={`row my-3 ${styles.boxProduct}`} key={index}>
          {console.log("item.value.date.seconds", item)}
          <a
            href="#"
            className={`list-group-item d-flex gap-3 ${styles.item}`}
            aria-current="true"
          >
            <img
              src={item.image ? item.image : defaultImg}
              alt="twbs"
              width="40"
              height="40"
              className="rounded-circle flex-shrink-0"
            />
            <div
              className={`d-flex w-100 justify-content-between ${styles.itemText}`}
            >
              <div>
                <p className="mb-0">{item.name}</p>
              </div>
              <small className="opacity-50 text-nowrap">
                {item.date.toDate().toLocaleString("en-AU", options)}
              </small>
              {/* <DateFunc date={item.value.date.seconds} item={item.value} /> */}
            </div>
          </a>
        </div>
      ))}
        </>
      ):(<></>)}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    dataUser: state.dataUser,
    product: state.dataProduct,
  };
};

export default connect(mapStateToProps)(ListHistory);
