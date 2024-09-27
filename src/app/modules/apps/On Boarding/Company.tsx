import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, where, collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useParams } from 'react-router-dom';

export function CompanyD() {
  const [activeTab, setActiveTab] = useState<string>('userDetails');
  const [userData, setUserData] = useState<any>(null);
  const [orderData, setOrderData] = useState<any[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false); // Track button disable state
  const { userID } = useParams<{ userID: string }>();
  const navigate = useNavigate(); // React Router hook to redirect

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userID) {
        console.error('UID is undefined.');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'company', userID));
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

  const updateStatus = async (status: string) => {
    const confirmation = window.confirm(`Are you sure you want to ${status}?`);

    if (!confirmation) return; // If user cancels, do nothing

    if (!userID) {
      console.error('UID is undefined.');
      return;
    }

    try {
      setIsButtonDisabled(true); // Disable the buttons after clicking

      const userRef = doc(db, 'company', userID);
      await updateDoc(userRef, { status: status });
      console.log(`User status updated to: ${status}`);

      // Redirect to the specified URL after successful update
      navigate('/apps/company-details/list');
    } catch (error) {
      console.error('Error updating status:', error);
      setIsButtonDisabled(false); // Re-enable the buttons if there was an error
    }
  };

  if (!userData && orderData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Company Details</h3>
          </div>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Company Name</label>
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-gray-900'>{`${userData?.company_name || ''}`}</span>
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
          
          {/* Approve and Reject Buttons */}
          <div className='row mb-7'>
            <div className='col-lg-12'>
              <button
                className='btn btn-success me-3'
                onClick={() => updateStatus('approved')}
                disabled={isButtonDisabled} // Disable button if it's clicked
              >
                Approve
              </button>
              <button
                className='btn btn-danger'
                onClick={() => updateStatus('rejected')}
                disabled={isButtonDisabled} // Disable button if it's clicked
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
