import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { login, markAttendance } from 'query/auth/auth.query'
import { route } from 'shared/constants/AllRoutes'
import { validationErrors } from 'shared/constants/ValidationErrors'
import { useMutation } from 'react-query'
import { toaster } from 'helper/helper'
import { EMAIL } from 'shared/constants'
import { KeyIcon, MailIcon } from 'assets/images/SVGs/Svg'
import CustomModal from 'shared/components/Modal'

function Login() {
  const navigate = useNavigate()
  const {
    register: fields,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: 'onSubmit' })
  const [showPassword, setShowPassword] = useState(true)
  const [mobileToggle, setMobileToggle] = useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    navigate('/login')
    setShow(false)
  }

  const { mutate: attendanceMutate, isLoading: attendanceIsLoad } = useMutation(markAttendance, {
    onSuccess: (response) => {
      navigate(route.dashboard)
      toaster(response?.data?.message, 'success')
    }
  })

  const handleConfirm = () => {
    attendanceMutate()
    setShow(false)
  }

  function handlePasswordToggle() {
    setShowPassword(!showPassword)
  }

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (response) => {
      localStorage.setItem('token', response?.data?.token)
      localStorage.setItem('userData', JSON.stringify(response?.data?.user))
      toaster(response?.data?.message, 'success')
      if (response?.data?.is_attendace === 0) {
        setShow(true)
      } else if (response?.data?.is_attendace === 1) {
        navigate(route.taskManagement)
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('userData')
        navigate('/login')
        setShow(false)
      }
    }
  })

  function onSubmit(data) {
    mutate({ sEmail: data.sEmail, sPassword: data.sPassword })
  }
  const toggleLogin = () => {
    setMobileToggle(!mobileToggle)
    reset()
    toggleLogin()
  }

  useEffect(() => {
    document.title = 'Login'
  }, [])

  return (
    <>
      <Form noValidate onSubmit={handleSubmit(onSubmit)} className='login-form'>
        <div className='title-b'>
          <div className='d-flex align-items-center justify-content-center'>
            <h2>
              Login to your account
            </h2>
          </div>
        </div>
        {mobileToggle ?
          <>
            <Form.Group className='form-group'>
              <Form.Label>
                <FormattedMessage id='Phone No' />
              </Form.Label>
              <Form.Control
                type='text'
                required
                name='sPhone'
                placeholder='Enter your phone number'
                autoFocus
                className={errors.sPhone && 'error'}
                {...fields('sPhone', {
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Only numbers are allowed'
                  },
                  required: {
                    value: true,
                    message: 'Phone number is required'
                  },
                  minLength: {
                    value: 10,
                    message: 'Please enter a valid phone number.'
                  },
                  maxLength: {
                    value: 10,
                    message: 'Please enter a valid phone number.'
                  }
                })}
                onChange={(e) => {
                  e.target.value =
                    e.target.value?.trim() &&
                    e.target.value.replace(/^[a-zA-z]+$/g, '')
                }}
              />
              {errors.sPhone && <Form.Control.Feedback type='invalid'>{errors.sPhone.message}</Form.Control.Feedback>}
            </Form.Group>
          </> :
          <>

            <Form.Group className='form-group'>
              <Form.Label>
                <FormattedMessage id='emailAddress' />
              </Form.Label>
              <InputGroup>
                <InputGroup.Text id="basic-addon1"><MailIcon fill='#b3e232' height='20' width='20' />
                  <Form.Control
                    type='text'
                    required
                    name='sEmail'
                    placeholder='Enter your email address'
                    autoFocus
                    className={errors.sEmail && 'error'}
                    {...fields('sEmail', {
                      required: { value: true, message: validationErrors.emailRequired },
                      pattern: { value: EMAIL, message: validationErrors.email }
                    })}
                  />
                </InputGroup.Text>
              </InputGroup>
              {errors.sEmail && <Form.Control.Feedback type='invalid'>{errors.sEmail.message}</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group className='form-group'>
              <Form.Label>
                <FormattedMessage id='password' />
              </Form.Label>
              <InputGroup>
                <InputGroup.Text id="basic-addon2"><KeyIcon fill='#b3e232' height='20' width='20' />
                  <Form.Control
                    type={showPassword ? 'password' : 'text'}
                    required
                    name='sPassword'
                    placeholder='Enter your password'
                    className={errors.sPassword && 'error'}
                    {...fields('sPassword', {
                      required: { value: true, message: validationErrors.passwordRequired },
                      onChange: (e) => {
                        e.target.value = e?.target?.value?.trim()
                      }
                    })}
                  />
                </InputGroup.Text>
                <span onClick={handlePasswordToggle} className='icon-right'>
                  <i className={showPassword ? 'icon-visibility' : 'icon-visibility-off'}></i>
                </span>
              </InputGroup>
              {errors.sPassword && <Form.Control.Feedback type='invalid'>{errors.sPassword.message}</Form.Control.Feedback>}
            </Form.Group>
          </>}

        <div className='mb-2'>
          <Button variant='primary' type='submit' disabled={isLoading} className='login-btn'>
            <FormattedMessage id='Login' /> {isLoading && <Spinner animation='border' size='sm' />}
          </Button>
        </div>

        <Link to={'/forgot-password'} className='b-link'>
          Forgot password
        </Link>

        <div className='phone-login'>
          <span onClick={toggleLogin}>
            {mobileToggle ? 'Log-in with Email' : 'Log-in with Phone'}
          </span>
        </div>
      </Form>

      <CustomModal
        open={show}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        disableHeader
        bodyTitle="Please click to Confirm for the login and today's attendance."
        isLoading={attendanceIsLoad}
      />
    </>
  )
}

export default Login
