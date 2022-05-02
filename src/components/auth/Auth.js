import React, { useEffect, useState } from "react";
import useStateRef from "react-usestateref";
import { connect } from "react-redux";
import firebase from "../../services/firebase";
import { signInWithGoogle, auth } from "../../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Auth = (props) => {
  const [line_config, setLine_config, line_configRef] = useStateRef({
    // response_type: "code",
    // client_id: "1657064324",
    // redirect_uri: "http%3A%2F%2Flocalhost%3A3000",
    // state: "12345abcde",
    // scope: "profile%20openid%20email",
    // client_secret: "10b64197e0054249ea4497198acc6ace",
  });
  var path_line = "";
  const userFire = firebase.firestore().collection("users");
  const productFire = firebase.firestore().collection("product");
  const lineFire = firebase.firestore().collection("lineConfig");
  
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  useEffect(() => {
    getLineConfig();
    lineFire.onSnapshot((querySnapshot) => {
      var url = "";
      console.log(querySnapshot.data);
      querySnapshot.forEach((doc) => {
        console.log("data config", doc.data().redirectUri);
        url = doc.data().redirectUri;
      });
      setLine_config({
        response_type: "code",
        client_id: "1657064324",
        redirect_uri: `${url}`,
        state: "12345abcde",
        scope: "profile%20openid%20email",
        client_secret: "10b64197e0054249ea4497198acc6ace",
      });
      if (params.code) {

        // window.open(`https://api.line.me/oauth2/v2.1/token?grant_type=authorization_code&code=${params.code}&redirect_uri=${line_configRef.current.redirect_uri}&client_id=${line_configRef.current.client_id}&client_secret=${line_configRef.current.client_secret}`);
        // window.open("https://api.line.me/oauth2/v2.1/token",`grant_type=authorization_code&code=${params.code}&redirect_uri=${line_configRef.current.redirect_uri}&client_id=${line_configRef.current.client_id}&client_secret=${line_configRef.current.client_secret}`,function(d){
        //   setUser(d)
        //   console.log(d)
        //   console.log(user)
        // })
       
          axios
          .post(
            "https://api.line.me/oauth2/v2.1/token",
            `grant_type=authorization_code&code=${params.code}&redirect_uri=${line_configRef.current.redirect_uri}&client_id=${line_configRef.current.client_id}&client_secret=${line_configRef.current.client_secret}`
          )
          .then(function (res) {
            var decoded = jwt_decode(res.data.id_token);
            console.log("res_Token=>", res);
            console.log("decoded=>", decoded);
            if (!decoded) {
            } else {
              console.log(decoded.email);
              setUser(decoded);
              // props.dispatch({
              //   type: "SIGN_IN",
              //   payload: decoded,
              // });
              signIn(decoded);
            }
          });
      } else {
        firebase.auth().onAuthStateChanged((userData) => {
          // setUser(userData);
          console.log("userData", userData);
          if (!userData) {
            setLoading(false)
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
      
    }
    });

  
  }, []);

  const handleClick_lineLogin = () => {
    path_line = `https://access.line.me/oauth2/v2.1/authorize?response_type=${line_configRef.current.response_type}&client_id=${line_configRef.current.client_id}&redirect_uri=${line_configRef.current.redirect_uri}&state=${line_configRef.current.state}&scope=${line_configRef.current.scope}`;
    window.open(path_line);
  };
  const createUser = async (decoded) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        decoded.email,
        decoded.sub
      )
      
          const userID = "userID"
          var date = new Date().getTime()
          const addGroup = {
            barcode: "",
            name: "",
            category: "",
            date: "",
            note: "",
          }
          const categoryMeat ={
            name: "Meat",
            qty: 0
          }
          const categoryFruit ={
            name: "Fruit",
            qty: 0
          }
          const categoryVeget ={
            name: "Veget",
            qty: 0
          }
          const groupFire = productFire.doc(`${user.user.uid}`)
          const categoryFire = productFire.doc(`${user.user.uid}`).collection("category")
          groupFire.set({defaultGroup:"1",uid:user.user.uid})
          groupFire.collection("group1").doc(`${date}`).set(addGroup)
          groupFire.collection("group2").doc(`${date}`).set(addGroup)
          groupFire.collection("group3").doc(`${date}`).set(addGroup)
          categoryFire.doc(`${date}`).set(categoryMeat)
          categoryFire.doc(`${date+1}`).set(categoryFruit)
          categoryFire.doc(`${date+2}`).set(categoryVeget)
          
      
      console.log("CREATE", user.user.uid);
      var data = {
        email: decoded.email,
        image: decoded.picture,
        name: decoded.name,
        uid: user.user.uid,
        sub: decoded.sub
      };
      userFire.doc(user.user.uid).set(data);
      props.dispatch({
        type: "SIGN_IN",
        payload: data,
      });
     

     
      // window.location.replace("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const signIn = async (decoded) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        decoded.email,
        decoded.sub
      );
      console.log("SIGN_IN", user.user.uid);

      userFire.where("uid", "==", user.user.uid).onSnapshot((querySnapshot) => {
        console.log(querySnapshot.data);
        var data = {};
        querySnapshot.forEach((doc) => {
          console.log("data", doc.data());
          props.dispatch({
            type: "SIGN_IN",
            payload: doc.data(),
          });
        });
      });
      // window.location.replace("/");
    } catch (error) {
      createUser(decoded);
      console.log(error.message);
    }
  };

  const getLineConfig = () =>{
    lineFire.onSnapshot((querySnapshot) => {
      var url = "";
      console.log(querySnapshot.data);
      querySnapshot.forEach((doc) => {
        console.log("data config", doc.data().redirectUri);
        url = doc.data().redirectUri;
      });
      setLine_config({
        response_type: "code",
        client_id: "1657064324",
        redirect_uri: `${url}`,
        state: "12345abcde",
        scope: "profile%20openid%20email",
        client_secret: "10b64197e0054249ea4497198acc6ace",
      });
    });
  }

  console.log("code=>", params.code);
  console.log("state=>", params.state);
  console.log("LINE=>", line_configRef.current);
  return (
   <div>
     {loading ? (
<div></div>
     ):(<div>
        <div className="wrapper">
      <div className="page">
        <div className="container ">
          <div className="row position-absolute top-50 start-50 translate-middle m-0">
            <div className="col">
              {/* <img src="logo.png" className="rounded mx-auto d-block" alt="..." /> */}

              <h2 className="text-center">Welcome to</h2>
              <h2 className="text-center ">APP NAME</h2>
              <div className="text-center mt-3">
                <br />
                <button
                  className="btn mt-2" style={{backgroundColor:"#07E30A",color:"white"}}
                  onClick={handleClick_lineLogin}
                >
                  LINE Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     </div>)}
   </div>
  );
};
const mapStateToProps = (state) => {
  return {
    data: state.dataUser,
  };
};
export default connect(mapStateToProps)(Auth);
