import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Col } from 'react-bootstrap';
import logo from 'assets/images/Main/AMC-logo-main.png'
import background from 'assets/images/Main/AMC-background.png'

function AuthLayout({ children }) {
  return (
    <div className='auth-main'>
      <div className='auth-logo'>
        <img src={logo} height={70} width={80} alt="AMC-logo" />
        <span>
          Ahmedabad Survey
        </span>
      </div>
      <div>
        <img src={background} height={250} width={300} alt="banner" />
      </div>
      <div className='child-box-second'>
        <Col className='login-form-container'>
          <Suspense
            fallback={
              <div>
                <FormattedMessage id='loading' />
                ...
              </div>
            }>
            {children}
          </Suspense>
        </Col>
      </div>

      {/* <div className='side-background'>
        <img src={background} alt="background" />
      </div> */}


    </div>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default AuthLayout
