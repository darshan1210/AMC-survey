import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { login } from 'query/auth/auth.query'
import { route } from 'shared/constants/AllRoutes'
import { validationErrors } from 'shared/constants/ValidationErrors'
import { useMutation } from 'react-query'
import { toaster } from 'helper/helper'
import { EMAIL } from 'shared/constants'
import { MailIcon } from 'assets/images/SVGs/Svg'

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

  function handlePasswordToggle() {
    setShowPassword(!showPassword)
  }

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (response) => {
      localStorage.setItem('token', response?.data?.token)
      toaster(response?.data?.message, 'success')
      localStorage.setItem('userData', JSON.stringify(response?.data?.user))
      navigate(route.dashboard)
    }
  })

  function onSubmit(data) {
    mutate({ sEmail: data.sEmail, sPassword: data.sPassword })
  }
  const toggleLogin = () => {
    setMobileToggle(!mobileToggle)
    reset()
  }

  useEffect(() => {
    document.title = 'Login'
  }, [])

  return (
    <>
      <Form noValidate onSubmit={handleSubmit(onSubmit)} className='login-form'>
        <div className='title-b'>
          <div className='d-flex align-items-center justify-content-center'>
            <h2 className='title me-2 m-0'>
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
                <InputGroup.Text id="basic-addon1"><MailIcon fill='#FEC50A' height='20' width='20' />
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
                <InputGroup.Text id="basic-addon2"><MailIcon fill='#FEC50A' height='20' width='20' />
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
                <Button onClick={handlePasswordToggle} variant='link' className='icon-right'>
                  <i className={showPassword ? 'icon-visibility' : 'icon-visibility-off'}></i>
                </Button>
              </InputGroup>
              {errors.sPassword && <Form.Control.Feedback type='invalid'>{errors.sPassword.message}</Form.Control.Feedback>}
            </Form.Group>
          </>}

        <div className='mb-2'>
          <Button variant='primary' type='submit' disabled={isLoading} className='login-btn'>
            <FormattedMessage id='Login' /> {isLoading && <Spinner animation='border' size='sm' />}
          </Button>
        </div>

        <div className='phone-login'>
          <span onClick={toggleLogin}>
            {mobileToggle ? 'Log-in with Email' : 'Log-in with Phone'}
          </span>
        </div>
      </Form>
    </>
  )
}

export default Login
