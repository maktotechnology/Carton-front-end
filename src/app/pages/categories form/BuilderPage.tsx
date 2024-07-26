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
          <h3 className='card-title'>New Category</h3>
        </div>
        {/* begin::Form */}
        <form className='form'>
          {/* begin::Body */}
          <div className='card-body'>
            <div className='row mb-10'>
              <div className='col-lg-6'>
                <label className='col-form-label'>Category name</label>
                <input
                  type='text'
                  className='form-control form-control-solid input-solid'
                  placeholder='Enter Category name'
                />
              </div>
              <div className='col-lg-6'>
  <div className='form-check'>
    <input
      type='checkbox'
      className='form-check-input'
      id='isParentCheckbox'
    />
    <label className='form-check-label' htmlFor='isParentCheckbox'>
      Is Parent?
    </label>
  </div>
</div>

            </div>
            <div className='row mb-10'>
              <div className='col-lg-6'>
                <label className='col-form-label'>Choose Parent Category</label>
                <select className='form-select form-select-solid input-solid'>
                  <option value=''>Parent Category</option>
                  {/* Add your city options here */}
                  <option value='city1'>Test 1</option>
                  <option value='city2'>Test 2</option>
                </select>
              </div>

            </div>            
          </div>
          {/* end::Body */}

          {/* begin::Footer */}
          <div className='card-footer py-6'>
  <div className='row justify-content-center'>
    <div className='col-lg-6 text-center'>
      <button type='button' onClick={handleSubmit} className='btn btn-primary'>
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
