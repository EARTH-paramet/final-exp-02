// import './App.scss'
// import ListProduct from "./components/ListProduct";
// import Search from "./components/Search";
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Scanner from './components/Scanner'
import EditProduct from './components/EditProduct'
import Home from './components/Home'
import Auth from './components/auth/Auth'
import MailAuth from './components/auth/MailAuth'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)
const App = () => {
  return (
    <div className=''>
      <MailAuth />
      {/* <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/edit/:id" element={<EditProduct />} />
        <Route path="/scan" element={<Scanner />} />
      </Routes> */}
    </div>
  )
}

export default connect()(App)

{
  /* <div className="row">
        <div className="col-6">
          <h3>APP NAME</h3>
        </div>
        <div className="col-6">
          <h3 className="float-end">#</h3>
        </div>
      </div>
      <div className="row  option-menu">
        <div className="col-2 text-center">
          <p>Home</p>
        </div>
        <div className="col-2 text-start">
        <p>Fridge</p>
        </div>
        <div className="col-4 text-start">
        <p>center</p>
        </div>
        
        <div className="col-2 text-end">
        <p>CATEGORY</p>
        </div>
        <div className="col-2 text-center">
        <p>Profile</p>
        </div>
      </div> */
}
