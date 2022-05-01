import React from 'react'
import { signInWithGoogle, auth } from '../../services/firebase'
import EditProduct from '../EditProduct'
import Home from '../Home'
import Scanner from '../Scanner'
import { Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import Profile from '../Profile'
import Auth from './Auth'
import Category from '../Category'
import NavBottomBar from '../navigation/NavBottomBar'
import Fridge from '../Fridge'
import LiffAuth from './LiffAuth'

const MailAuth = (props) => {

  return (
    <div className=''>
      <Routes>
        {/* <Route exact path="/" element={<Auth/>} /> */}
        <Route
          exact
          path='/'
          element={
            props.data.status ? (
              <Home />
            ) : (
              <div>
                <Auth />
              </div>
            )
          }
        />
        {/* <Route exact path="/:id" element={<Home/>} /> */}
        <Route exact path='/fridge' element={<Fridge />} />
        <Route exact path='/category' element={<Category />} />
        <Route exact path='/edit/:id' element={<EditProduct />} />
        <Route path='/scan' element={<Scanner />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      {props.data.status ? (
        <footer>
        <NavBottomBar />
      </footer>
      ) : (
        <div></div>
      )}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    data: state.dataUser,
  }
}
export default connect(mapStateToProps)(MailAuth)
