import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./css/Filter.module.css";
import { connect } from "react-redux";
import useStateRef from "react-usestateref";
const Filter = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  //   const [modalData, setModalData] = useState({})
  const toggle = () => setModalOpen(!modalOpen);
  const [sortSelect, setSortSelect] = useState("ascName");

  const [classAz, setClassAz] = useState(
    `${styles.btnFilter} w-100 py-2 fw-bold`
  );
  const [clasZa, setClassZa] = useState(
    `${styles.btnFilter} w-100 py-2 fw-bold`
  );
  const [classNew, setClassNew] = useState(
    `${styles.btnFilter} w-100 py-2 fw-bold`
  );
  const [classOld, setClassOld] = useState(
    `${styles.btnFilter} w-100 py-2 fw-bold`
  );

  const classDefault = `${styles.btnFilter} w-100 py-2 fw-bold`;
  const classActive = `${styles.btnFilter} w-100 py-2 fw-bold ${styles.active}`;

  useEffect(() => {
    const filter = props.dataFilter.sort;
    if (filter == "ascName") {
      setClassAz(classActive);
      setClassZa(classDefault);
      setClassNew(classDefault);
      setClassOld(classDefault);
    } else if (filter == "descName") {
      setClassAz(classDefault);
      setClassZa(classActive);
      setClassNew(classDefault);
      setClassOld(classDefault);
    } else if (filter == "ascAdd") {
      setClassAz(classDefault);
      setClassZa(classDefault);
      setClassNew(classActive);
      setClassOld(classDefault);
    } else if (filter == "descAdd") {
      setClassAz(classDefault);
      setClassZa(classDefault);
      setClassNew(classDefault);
      setClassOld(classActive);
    } else{
      setClassAz(classDefault);
      setClassZa(classDefault);
      setClassNew(classDefault);
      setClassOld(classDefault);
    };
  }, [props.dataFilter.sort]);
  // console.log(sortSelect)
  const handleClick_apply = () => {
    props.dispatch({
      type: "SET_FILTER",
      payload: sortSelect,
    });
    toggle();
    
  };
  return (
    <>
      <FontAwesomeIcon
        icon="fa-solid fa-filter"
        onClick={() => {
          //   setModalData(item)
          toggle();
        }}
      />
      <div>
        <Modal size="sm" isOpen={modalOpen} toggle={() => toggle()}>
          <ModalBody>
            <div className="container">
              <div className="row my-4">
                <h6 className="col-8 fw-bold pt-2">Filter</h6>
                <h6 className="col-4">
                  <Button className={`${styles.btnReset} w-100 fw-bold`}
                  onClick={() => setSortSelect("ascDate")}
                  >
                    Reset
                  </Button>
                </h6>
              </div>
              <div className="row my-4">
                <h6 className="col-8 fw-bold">Sort By</h6>
                <h6 className="col-4 text-end text-warning">{/* test */}</h6>
              </div>
              <div className="row mb-1">
                <h6 className="col-6">
                  <Button
                    id="test"
                    className={classAz}
                    color="ligth text-black"
                    onClick={() => setSortSelect("ascName")}
                  >
                    A-Z
                  </Button>
                </h6>
                <h6 className="col-6">
                  <Button
                    className={clasZa}
                    color="ligth text-black"
                    onClick={() => setSortSelect("descName")}
                  >
                    Z-A
                  </Button>
                </h6>
              </div>
              <div className="row mb-1">
                <h6 className="col-6">
                  <Button
                    className={classNew}
                    color="ligth text-black"
                    onClick={() => setSortSelect("ascAdd")}
                  >
                    Newest
                  </Button>
                </h6>
                <h6 className="col-6">
                  <Button
                    className={classOld}
                    color="ligth text-black"
                    onClick={() => setSortSelect("descAdd")}
                  >
                    Oldest
                  </Button>
                </h6>
              </div>

              <div className="row py-2">
                <Button
                  className="w-100 py-3 fw-bold"
                  color="warning text-white"
                  style={{ borderRadius: "16px" }}
                  onClick={handleClick_apply}
                  
                >
                  Apply
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    dataFilter: state.dataFilter,
  };
};

export default connect(mapStateToProps)(Filter);
