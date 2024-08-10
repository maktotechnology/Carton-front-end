import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the path to your firebase config
import { KTIcon } from '../../../_metronic/helpers';
import { getLayout, ILayout, LayoutSetup, useLayout } from '../../../_metronic/layout/core';

const BuilderPage: React.FC = () => {
  const { setLayout } = useLayout();
  const [config, setConfig] = useState<ILayout>(getLayout());
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const uid = "X1urUW7ZUZgJ1Uo4cuG6rghzCCF2"; // Default UID

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'Number', uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSubmit = async () => {
    setShowPopup(true);
    // Ask for confirmation before updating
    const confirmUpdate = window.confirm("Are you sure you want to update this user's details?");
    if (confirmUpdate && userData) {
      try {
        await updateDoc(doc(db, 'Number', uid), userData);
        alert('User details updated successfully!');
      } catch (error) {
        console.error('Error updating user details:', error);
      }
    }
    setShowPopup(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>User Details</h3>
          <button
              type='button'
              className='btn btn-primary'
              onClick={() => setEditMode(!editMode)}
              style={{
                width: '100px', // Set the desired width
                height: '50px', // Set the desired height
                fontSize: '16px', // Optional: Adjust the font size for better readability
                marginTop: '10px'     // Add margin to the top to move the button down
              }}
          >
            {editMode ? 'Cancel Edit' : 'Edit'}
          </button>

        </div>
        {/* begin::Form */}
        <form className='form'>
          {/* begin::Body */}
          <div className='card-body'>

            {/* Photo Display */}
            <div className='fv-row mb-7'>
              {/* begin::Label */}
              <label className='d-block fw-bold fs-6 mb-5'>Photo</label>
              {/* end::Label */}

              {/* begin::Image input */}
              <div
                className='image-input image-input-outline'
                data-kt-image-input='true'
                style={{ backgroundImage: `url('${"blankImg"}')` }}
              >
                {/* begin::Preview existing avatar */}
                <div
                  className='image-input-wrapper w-125px h-125px'
                  style={{ backgroundImage: `url('${userData.photo_url || "userAvatarImg"}')` }}
                ></div>
              </div>
              {/* end::Image input */}
            </div>
            {/* End Photo Display */}

            {/* User Information Form Fields */}
            <div className='row mb-10'>
              <div className='col-lg-6'>
                <label className='col-form-label'>First Name:</label>
                <input
                  type='text'
                  className='form-control form-control-solid input-solid'
                  name='firstname'
                  value={userData.firstname}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div className='col-lg-6'>
                <label className='col-form-label'>Last Name:</label>
                <input
                  type='text'
                  className='form-control form-control-solid input-solid'
                  name='lastname'
                  value={userData.lastname}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>
            <div className='row mb-10'>
              <div className='col-lg-6'>
                <label className='col-form-label'>Phone Number:</label>
                <input
                  type='text'
                  className='form-control form-control-solid input-solid'
                  name='phone_number'
                  value={userData.phone_number}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div className='col-lg-6'>
                <label className='col-form-label'>Address 1:</label>
                <input
                  type='text'
                  className='form-control form-control-solid input-solid'
                  name='address1'
                  value={userData.address1}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>
            <div className='row mb-10'>
              <div className='col-lg-6'>
                <label className='col-form-label'>Address 2:</label>
                <input
                  type='text'
                  className='form-control form-control-solid input-solid'
                  name='address2'
                  value={userData.address2}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div className='col-lg-6'>
                <label className='col-form-label'>Address Type:</label>
                <input
                  type='text'
                  className='form-control form-control-solid input-solid'
                  name='addresstype'
                  value={userData.addresstype}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>
            <div className='row mb-10'>
              <div className='col-lg-6'>
                <label className='col-form-label'>City:</label>
                <input
                  type='text'
                  className='form-control form-control-solid input-solid'
                  name='city'
                  value={userData.city}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div className='col-lg-6'>
                <label className='col-form-label'>Country:</label>
                <input
                  type='text'
                  className='form-control form-control-solid input-solid'
                  name='country'
                  value={userData.country}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>
          {/* end::Body */}

          {/* begin::Footer */}
          <div className='card-footer py-6'>
            <div className='row justify-content-center'>
              <div className='col-lg-6 text-center'>
                <button
                  type='button'
                  onClick={handleSubmit}
                  className='btn btn-primary'
                  disabled={!editMode}
                >
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
                  <h5 className='modal-title'>Updating User Details</h5>
                  <button type='button' className='btn-close' onClick={() => setShowPopup(false)}></button>
                </div>
                <div className='modal-body text-center'>
                  <div className='mb-3'>
                    <i className='fa fa-check-circle fa-3x text-success'></i>
                  </div>
                  <p>User details are being updated...</p>
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
