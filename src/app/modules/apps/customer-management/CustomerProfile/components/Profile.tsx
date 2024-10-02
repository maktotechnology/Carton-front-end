
import {Link} from 'react-router-dom'

import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, where, collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../../../firebase';
import { useParams } from 'react-router-dom';


export function Profile() {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('userDetails');
  const [userData, setUserData] = useState<any>(null);
  const [orderData, setOrderData] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
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

    const fetchOrderDetails = async () => {
      if (!userID) {
        console.error('UID is undefined.');
        return;
      }

      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('uid', '==', userID));
        const querySnapshot = await getDocs(q);

        const orders: any[] = [];
        querySnapshot.forEach((doc) => {
          orders.push({ id: doc.id, ...doc.data() });
        });

        if (orders.length > 0) {
          setOrderData(orders);
        } else {
          console.error('No orders found for this user.');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    if (activeTab === 'userDetails') {
      fetchUserDetails();
    } else if (activeTab === 'orders') {
      fetchOrderDetails();
    }
  }, [userID, activeTab]);

  if (!userData && orderData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Profile Details</h3>
          </div>

          <Link to={`/customer-management/user/settings/${userID}`} className='btn btn-primary align-self-center'>
            Edit Profile
          </Link>
        </div>
        

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Full Name</label>
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-gray-900'>{`${userData?.firstname || ''} ${userData?.lastname || ''}`}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Phone Number</label>
            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>{userData?.phone_number || 'N/A'}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Address 1</label>
            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>{userData?.address1 || 'N/A'}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Address 2</label>
            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>{userData?.address2 || 'N/A'}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Address Type</label>
            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>{userData?.addresstype || 'N/A'}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>City</label>
            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>{userData?.city || 'N/A'}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Country</label>
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-gray-900'>{userData?.country || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

