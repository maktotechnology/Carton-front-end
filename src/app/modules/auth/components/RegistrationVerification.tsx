import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'





const ForgotPasswordComponent = () => {
    return (
      <div className='text-center mb-10'>
        {/* begin::Title */}
        <h1 className='text-dark fw-bolder mb-3'>Welcome To Carton</h1>
        {/* end::Title */}
  
        {/* begin::Link */}
        <div className='text-gray-500 fw-semibold fs-6'>
        The user registration has been send to the DB. Now the user should do the verification on the register Email.
        </div>
        {/* end::Link */}
      </div>
    );
  };
  
  export default ForgotPasswordComponent;
