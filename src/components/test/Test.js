import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import Html5QrcodePlugin from './Html5QrcodePlugin'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Test extends React.Component {
  constructor(props) {
    super(props)

    // This binding is necessary to make `this` work in the callback.
    this.onNewScanResult = this.onNewScanResult.bind(this)
  }

  render() {
    return (
      <div>
        <header>
          <div className='container'>
            <div className='row'>
              <div className='col-2'>
                <NavLink to='/'>
                  <FontAwesomeIcon
                    icon='fa-solid fa-arrow-left-long'
                    size='xl'
                  />
                </NavLink>
              </div>
              <div
                className='col-8 text-center fw-bold'
                style={{ fontSize: '22px' }}
              >
                Add Product
              </div>
              <div className='col-2'>{/*  */}</div>
            </div>
          </div>
        </header>
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={this.onNewScanResult}
        />
      </div>
    )
  }

  onNewScanResult(decodedText, decodedResult) {
    // Handle the result here.
    console.log(decodedText)
    console.log(decodedResult)
  }
}

export default Test
