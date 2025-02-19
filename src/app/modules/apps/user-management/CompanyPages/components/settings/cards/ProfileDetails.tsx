import React, {useEffect, useState} from 'react';
import {toAbsoluteUrl} from '../../../../../../../../_metronic/helpers';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../../../firebase';
import { useParams } from 'react-router-dom';

const ProfileDetails: React.FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const { userID } = useParams<{ userID: string }>();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userID) {
        console.error('UID is undefined.');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'user', userID));
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
  }, [userID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSaveChanges = async () => {
    if (!userID || !userData) {
      console.error('Invalid data to save.');
      return;
    }

    try {
      const userDocRef = doc(db, 'user', userID);
      await updateDoc(userDocRef, userData);
      alert('User details updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-header border-0 cursor-pointer'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>

      </div>

      <div className='card-body border-top p-9'>
        {/* Avatar */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
          <div className='col-lg-8'>
            <div
              className='image-input image-input-outline'
              style={{backgroundImage: `url(${toAbsoluteUrl('media/avatars/blank.png')})`}}
            >
              <div
                className='image-input-wrapper w-125px h-125px'
                style={{backgroundImage: `url(${toAbsoluteUrl(userData.avatar)})`}}
              ></div>
            </div>
          </div>
        </div>

        {/* First Name */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>First Name</label>
          <div className='col-lg-8'>
            <input
              type='text'
              name='firstname'
              className='form-control form-control-lg form-control-solid'
              value={userData.company_name}
              onChange={handleChange}

            />
          </div>
        </div>

        {/* Last Name */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Last Name</label>
          <div className='col-lg-8'>
            <input
              type='text'
              name='lastname'
              className='form-control form-control-lg form-control-solid'
              value={userData.lastname}
              onChange={handleChange}

            />
          </div>
        </div>

        {/* Phone Number */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Phone Number</label>
          <div className='col-lg-8'>
            <input
              type='tel'
              name='phone_number'
              className='form-control form-control-lg form-control-solid'
              value={userData.phone_number}
              onChange={handleChange}

            />
          </div>
        </div>

        {/* Address 1 */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Address 1</label>
          <div className='col-lg-8'>
            <input
              type='text'
              name='address1'
              className='form-control form-control-lg form-control-solid'
              value={userData.address1}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Address 2 */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>Address 2</label>
          <div className='col-lg-8'>
            <input
              type='text'
              name='address2'
              className='form-control form-control-lg form-control-solid'
              value={userData.address2}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Address Type */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>Address Type</label>
          <div className='col-lg-8'>
            <input
              type='text'
              name='addresstype'
              className='form-control form-control-lg form-control-solid'
              value={userData.addresstype}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* City */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>City</label>
          <div className='col-lg-8'>
            <input
              type='text'
              name='city'
              className='form-control form-control-lg form-control-solid'
              value={userData.city}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Country */}
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Country</label>
          <div className='col-lg-8'>
            <input
              type='text'
              name='country'
              className='form-control form-control-lg form-control-solid'
              value={userData.country}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Save Changes Button */}

          <div className='row'>
            <div className='col-lg-8 offset-lg-4'>
              <button 
                type='button' 
                className='btn btn-primary' 
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>

      </div>
    </div>
  );
};

export {ProfileDetails};
