import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody } from "reactstrap";
import firebase from "../services/firebase";
import { Firestore } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./css/Fridge.module.css";

import SvgFridge from "./navigation/SvgFridge";
import useStateRef from "react-usestateref";

const ListFridge = (props) => {
  let navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const toggle = () => setModalOpen(!modalOpen);

  const ref = firebase.firestore().collection("product");

  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [dataDefault, setDataDefault] = useStateRef([
    {
      group: "1",
    },
    {
      group: "2",
    },
    {
      group: "3",
    },
  ]);
  const [dataFridge, setDataFridge] = useState([]);
  useEffect(() => {
    ref
      .where("uid", "==", props.data.uid)
      .get()
      .then((querySnapshot) => {
        let group = "null";
        querySnapshot.forEach((doc) => {
          setDataFridge([]);
          console.log(doc.data());
          group = doc.data().defaultGroup;
        });
        dataDefault.map((val) => {
          ref
            .doc(props.data.uid)
            .collection(`group${val.group}`)
            .get()
            .then((querySnapshot) => {
              let qty = 0;
              querySnapshot.forEach((doc) => {
                if (doc.data().barcode == "") {
                } else {
                  qty++;
                }
              });
              if (val.group == group) {
               
                  setDataFridge((oldData) => [
                    ...oldData,
                    {
                      group: val.group,
                      qtyProduct: qty,
                      default: true,
                    },
                  ]);
                console.log("count if");
              } else {
               
                  setDataFridge((oldData) => [
                    ...oldData,
                    {
                      group: val.group,
                      qtyProduct: qty,
                      default: false,
                    },
                  ]);
                  console.log("count else");
              }
            });
        });
        // }
        setLoading(false);

       
      });
  }, [edit]);

  if (dataFridge.length !== 0) {
    console.log("Output_dataUser", dataFridge);
  } else {
    console.log("null");
  }

  const [test, setTest] = useState(true);
  const handleNoti = (e) => {
    setTest(!test);
  };
  return (
    <div className="container">
      {loading ? (
        <div></div>
      ) : (
        <div>
          {dataFridge.map((item, index) => (
            <div
              style={{ borderRadius: "18px" }}
              className="row py-2"
              key={index}
            >
              <a
                href="#"
                className={`list-group-item d-flex gap-2 ${styles.itemFridge}`}
                style={item.default ? {} : { border: "3px solid #c6c6c6" }}
                aria-current="true"
                onClick={() => {
                  setModalData(item);
                  toggle();
                }}
              >
                <SvgFridge size="4x" />
                <div
                  className={`d-flex w-100 justify-content-between ${styles.itemText}`}
                >
                  <div>
                    <p className="mb-1">Fridge {index + 1}</p>
                    <Button
                      className={styles.btnDefault}
                      style={item.default ? {} : { backgroundColor: "#c6c6c6" }}
                    >
                      <div className="text-start">
                        <FontAwesomeIcon
                          icon="fa-solid fa-circle-check"
                          size="lg"
                          style={item.default ? { color: "#fccf50" } : {}}
                        />{" "}
                        Default
                      </div>
                    </Button>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
      <div>
        <Modal size="xl" isOpen={modalOpen} toggle={() => toggle()}>
          <ModalBody>
            <div className="container">
              <div className="row my-4">
                <h6 className="col-8 fw-bold">Name :</h6>
                <h6 className="col-4 text-end text-warning">
                  Fridge {modalData.group}
                </h6>
              </div>
              <div className="row my-4">
                <h6 className="col-8 fw-bold">Total Food :</h6>
                <h6 className="col-4 text-end text-warning">
                  {modalData.qtyProduct}
                </h6>
              </div>
              {/* <div className="row my-4">
                <h6 className="col-8 fw-bold">Notification :</h6>
                <h6 className="col-4 text-end text-warning">
                  {modalData.noti}
                  <div className={styles.switch}>
                    <input
                      type="checkbox"
                      id="switch"
                      className={styles.switchInput}
                      onClick={(e) => handleNoti()}
                      checked={test ? true : false}
                    />
                    <label for="switch" className={styles.switchLabel} />
                  </div>
                </h6>
              </div> */}

              <div className="row py-2">
                <Button
                  className="w-100 py-3 fw-bold"
                  color="warning text-white"
                  style={{ borderRadius: "16px" }}
                  onClick={() => {
                    ref.doc(props.data.uid).set({
                      defaultGroup: `${modalData.group}`,
                      uid: props.data.uid,
                    });
                    props.dispatch({
                      type: "ADD_PRODUCT",
                      payload: [],
                    });
                    setEdit(!edit);
                    toggle();
                    navigate("/");
                  }}
                >
                  Default
                </Button>
                {/* <Button
                  className='w-100 py-3 fw-bold'
                  color='warning text-white'
                  style={{ borderRadius: '16px' }}
                >
                  Share&nbsp;&nbsp;
                  <FontAwesomeIcon
                    icon='fa-solid fa-share-nodes'
                    size='xl'
                    style={{ color: 'black' }}
                  />
                </Button> */}
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    data: state.dataUser,
  };
};

export default connect(mapStateToProps)(ListFridge);
