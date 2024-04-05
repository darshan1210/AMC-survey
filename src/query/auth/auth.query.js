import axios from '../../axios'

export async function login({ sEmail, sPassword }) {
  return await axios.post('/login', {
    email: sEmail,
    password: sPassword
  })
}

export async function forgotPassword({ sEmail }) {
  return await axios.post('/forgotpassword', {
    email: sEmail
  })
}
export async function markAttendance() {
  return await axios.post('/survey-attendance')
}


export async function resetPassWord({ sNewPassword, sConfirmPassword, sAuthCode, token }) {
  return await axios.post(`/auth/password/reset`, { sNewPassword, sConfirmPassword, sAuthCode }, { headers: { authorization: token } })
}

export async function logout() {
  return await axios.get(`/logout`)
}

export async function changePassWord({ sOldPassword, sNewPassword, sConfirmPassword }) {
  return await axios.post(`/auth/changePassword`, { sOldPassword, sNewPassword, sConfirmPassword })
}
