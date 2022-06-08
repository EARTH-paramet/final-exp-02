import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Modal, ModalBody } from "reactstrap";
import firebase from "../services/firebase";
import useStateRef from "react-usestateref";
import defaultImg from "./assets/default-img-product.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./css/Notification.module.css";

const ListNotification = (props) => {
  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  };
  const ref = firebase.firestore().collection("product");
  const [dataProduct, setDataProduct, dataProductRef] = useStateRef([]);
  const [group, setGroup, groupRef] = useStateRef();
  const [date, setDate, dateRef] = useStateRef(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.dataFilter.dateNotification == "") {
    } else {
      setDate(props.dataFilter.dateNotification);
      console.log(
        "date Timestamp :",
        firebase.firestore.Timestamp.fromDate(dateRef.current).seconds
      );
    }

    if (props.dataFilter.fridgeNotification == "group1") {
      setGroup("Fridge 1");
    } else if (props.dataFilter.fridgeNotification == "group2") {
      setGroup("Fridge 2");
    } else if (props.dataFilter.fridgeNotification == "group3") {
      setGroup("Fridge 3");
    } else {
      setGroup("Fridge");
    }
    ref
      .doc(props.dataUser.uid)
      .collection(props.dataFilter.fridgeNotification)
      // .where('notification','==','1')
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          if (doc.data().barcode == "") {
          } else {
            if (
              doc.data().date.seconds <=
              firebase.firestore.Timestamp.fromDate(dateRef.current).seconds
            ) {
              items.push(doc.data());
            } else;
          }
        });
        setDataProduct(items);
        console.log(
          "data",
          firebase.firestore.Timestamp.fromDate(dateRef.current).seconds
        );
        setLoading(true);
      });
  }, [props.dataFilter]);

  const DateFunc = ({ date, item }) => {
    const timeStampNow = firebase.firestore.Timestamp.fromDate(
      dateRef.current
    ).seconds;
    const dateToday =
      parseInt(timeStampNow / 86400) * 86400 - 60 * 60 * 7;
    console.log("date=>", dateToday);
    if (date < dateToday) {
      return (
        <>
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
            </div>
          </a>
        </>
      );
    } else {
      return <></>;
    }
  };
  
  return (
    <div className="container">
      {loading ? (
        <>
          <div className="row">
            <div className="col-6">
              <p>{groupRef.current}</p>
            </div>
            <div className="col-6">
              <p>
                {firebase.firestore.Timestamp.fromDate(dateRef.current)
                  .toDate()
                  .toLocaleString("en-AU", options)}
              </p>
            </div>
          </div>
          {dataProductRef.current.map((item, index) => (
            <>
              <div className={`row my-3 ${styles.boxProduct}`} key={index}>
                {console.log("item.value.date.seconds", item)}
                <DateFunc date={item.date.seconds} item={item} index={index} />
              </div>
            </>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    dataUser: state.dataUser,
    dataFilter: state.dataFilter,
  };
};

export default connect(mapStateToProps)(ListNotification);
