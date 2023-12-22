import {Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import ForgotPasswordComponent from './components/RegistrationVerification'

import {Login} from './components/Login'
import {AuthLayout} from './AuthLayout'

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='verification' element={<ForgotPasswordComponent />} />

      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
