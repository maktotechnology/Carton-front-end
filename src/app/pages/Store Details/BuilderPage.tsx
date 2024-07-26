import clsx from 'clsx';
import React, { useState } from 'react';
import { KTIcon } from '../../../_metronic/helpers';
import { getLayout, ILayout, LayoutSetup, useLayout } from '../../../_metronic/layout/core';

const BuilderPage: React.FC = () => {
  const { setLayout } = useLayout();
  const [config, setConfig] = useState<ILayout>(getLayout());
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const updateData = (fieldsToUpdate: Partial<ILayout>) => {
    const updatedData = { ...config, ...fieldsToUpdate };
    setConfig(updatedData);
  };

  const handleSubmit = () => {
    // Simulate form submission
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000); // Hide the popup after 2 seconds
  };



  return (
    <>
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>Store Details</h3>
        </div>
        {/* begin::Form */}
        <form className='form'>
          {/* begin::Body */}
          <div className='card-body'>
            <h3>Store Details</h3>
            <div className='row mb-10'>
              <label className='col-lg-3 col-form-label text-lg-end'>Store Name:</label>
              <div className='col-lg-9 col-xl-4'>
                <input
                  type='text'
                  className='form-control form-control-solid input-solid'
                  placeholder='Enter store name'
                />
              </div>
            </div>
            <div className='row mb-10'>
              <label className='col-lg-3 col-form-label text-lg-end'>Store Manager First Name (Mandatory):</label>
              <div className='col-lg-9 col-xl-4'>
                <input
                  type='text'
                  className='form-control form-control-solid input-solid'
                  placeholder='Enter first name'
                  required
                />
              </div>
            </div>
            <div className='row mb-10'>
              <label className='col-lg-3 col-form-label text-lg-end'>Store Manager Last Name:</label>
              <div className='col-lg-9 col-xl-4'>
                <input
                  type='text'
                  className='form-control form-control-solid input-solid'
                  placeholder='Enter last name'
                />
              </div>
            </div>
            <div className='row mb-10'>
              <label className='col-lg-3 col-form-label text-lg-end'>Address 1:</label>
              <div className='col-lg-9 col-xl-4'>
                <input
                  type='text'
                  className='form-control form-control-solid input-solid'
                  placeholder='Enter address 1'
                />
              </div>
            </div>
            <div className='row mb-10'>
              <label className='col-lg-3 col-form-label text-lg-end'>Address 2:</label>
              <div className='col-lg-9 col-xl-4'>
                <input
                  type='text'
                  className='form-control form-control-solid input-solid'
                  placeholder='Enter address 2'
                />
              </div>
            </div>
            <div className='row mb-10'>
              <label className='col-lg-3 col-form-label text-lg-end'>City:</label>
              <div className='col-lg-9 col-xl-4'>
                <select className='form-select form-select-solid input-solid'>
                  <option value=''>Select city</option>
                  {/* Add your city options here */}
                  <option value='city1'>City 1</option>
                  <option value='city2'>City 2</option>
                </select>
              </div>
            </div>
            <div className='row mb-10'>
              <label className='col-lg-3 col-form-label text-lg-end'>Phone Number (Mandatory):</label>
              <div className='col-lg-9 col-xl-4'>
                <input
                  type='tel'
                  className='form-control form-control-solid input-solid'
                  placeholder='Enter phone number'
                  required
                />
              </div>
            </div>
            <div className='row mb-10'>
              <label className='col-lg-3 col-form-label text-lg-end'>Email:</label>
              <div className='col-lg-9 col-xl-4'>
                <input
                  type='email'
                  className='form-control form-control-solid input-solid'
                  placeholder='Enter email'
                />
              </div>
            </div>
          </div>
          {/* end::Body */}

          {/* begin::Footer */}
          <div className='card-footer py-6'>
            <div className='row'>
              <div className='col-lg-3'></div>
              <div className='col-lg-9'>
                <button type='button' onClick={handleSubmit} className='btn btn-primary me-2'>
                  <span className='indicator-label'>Submit</span>
                </button>
              </div>
            </div>
          </div>
          {/* end::Footer */}
        </form>
        {/* end::Form */}

                {/* Success Popup */}
                {showPopup && (
          <div className='modal fade show' style={{ display: 'block' }} id='successModal' tabIndex={-1}>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>Submission Successful</h5>
                  <button type='button' className='btn-close' onClick={() => setShowPopup(false)}></button>
                </div>
                <div className='modal-body text-center'>
                  <div className='mb-3'>
                    <i className='fa fa-check-circle fa-3x text-success'></i>
                  </div>
                  <p>Your data has been submitted successfully!</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export { BuilderPage };
