import React, { useEffect, useState } from 'react';
import firebase from "../../services/firebase";
import { connect } from 'react-redux';
import Auth from './Auth';
const LiffAuth = (props) => {
  const userFire = firebase.firestore().collection("users");
    
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((userData) => {
            // setUser(userData);
            console.log("userData", userData);
            if (!userData) {
                
            } else {
              userFire
                .where("uid", "==", userData.uid)
                .onSnapshot((querySnapshot) => {
                  console.log(querySnapshot.data);
                  querySnapshot.forEach((doc) => {
                    console.log("data", doc.data());
                    props.dispatch({
                      type: "SIGN_IN",
                      payload: doc.data(),
                    });
                  });
                });
            }
          });
    },[])
 
  return (
    <div>
      
    </div>
  );
};

export default connect()(LiffAuth);