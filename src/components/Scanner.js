import React, { useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import AddProduct from "./AddProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import styles from './css/AddEditProduct.module.css'
import styles from "./css/Scanner.module.css";
import useStateRef from "react-usestateref";

const Scanner = (props) => {
  const [checked, setChecked] = useState("Not_Found");
  const [data, setData, dataRef] = useStateRef(false);
  const [masterProduct, setMasterProduct, masterProductRef] = useStateRef();
  useEffect(() => {
    props.dispatch({
      type: "SCANNER_ON",
    });
    props.master.masterProduct.map((val) => {
      console.log("master",val)
    })
  }, []);

  const closeScanner = () => {
    props.dispatch({
      type: "SCANNER_OFF",
    });
  };
  if (checked == "Not_Found") {
    return (
      <div style={{ backgroundColor: "#000", height: "100vh", color: "#fff" }}>
        {/* <div> */}
        <header className={styles.navbar}>
          <div className="container">
            <div className="row pt-3">
              <div className="col-2 py-1">
                <NavLink to="/" onClick={closeScanner}>
                  <FontAwesomeIcon
                    icon="fa-solid fa-arrow-left-long"
                    size="xl"
                    style={{ color: "#fff" }}
                  />
                </NavLink>
              </div>
              <div
                className="col-8 text-center fw-bold"
                style={{ fontSize: "22px" }}
              >
                Add Product
              </div>
              <div className="col-2">{/*  */}</div>
            </div>
          </div>
        </header>
        <section className={styles.SectionForm}>
          <div className="container">
           
            <div className="row">
              <div className={styles.ocrloader}>
                {/* <p>Scanning</p> */}
                <em>
                  <BarcodeScannerComponent
                    // width={'100%'}
                    // height={'100%'}
                    onUpdate={(err, result) => {
                      var newData = true
                      if (result) {
                        // setData(result.text);
                          props.master.masterProduct.map((val) => {
                            if(val.value.barcode == result.text){
                              console.log("Have")
                              setData(String(result.text))
                              setMasterProduct(val.value)
                              newData = false
                              setChecked("Master_Data")
                            }else{ 
                            }
                          });
                      if(newData){
                        setData(String(result.text))
                        setChecked("New_Data")
                      }else;
                        
                      } else setData("Not Found");
                    }}
                  />
                </em>
                <span></span>
              </div>
            </div>

            <div className="row">
              <div
                className={`col text-center text-white ${styles.description}`}
                onClick={()=>setChecked("Manual_barcode")}
              >
                <FontAwesomeIcon icon="fa-solid fa-camera" /> manual barcode click me
                
              </div>
             
            </div>
          </div>

         
        </section>
      </div>
    );
  } else if (checked == "Master_Data") {
    return (
      <div>
        {/* <h1>มีข้อมูลเก่า map หา master</h1> */}
        <AddProduct barcode={dataRef.current} masterProduct={masterProductRef.current} mn={false}/>
      </div>
    );
  } else if (checked == "New_Data") {
    return (
      <div>
        {/* <h1>ไม่มีข้อมูลเก่า สร้างใหม่เลย</h1> */}
        <AddProduct barcode={dataRef.current}  masterProduct={false} mn={false}/>
      </div>
    );
  } else if (checked == "Manual_barcode") {
    return (
      <div>
        {/* <h1>ไม่มีข้อมูลเก่า สร้างใหม่เลย</h1> */}
        <AddProduct barcode={dataRef.current}  masterProduct={false} mn={true}/>
      </div>
    );
  } else {
    return (
      <div>
        <h1>fail</h1>
      </div>
    );
  }
  // return()
};
const mapStateToProps = (state) => {
  return {
    master: state.dataProduct,
  };
};
export default connect(mapStateToProps)(Scanner);
