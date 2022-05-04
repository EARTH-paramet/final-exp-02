import { connect } from 'react-redux'

import './components/css/MyBootstrap.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import MailAuth from './components/auth/MailAuth'
import NavBottomBar from './components/navigation/NavBottomBar'

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
      <NavBottomBar/>
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
