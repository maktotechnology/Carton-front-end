import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, where, collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Tabs, Tab, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const BuilderPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('userDetails');
  const [userData, setUserData] = useState<any>(null);
  const [orderData, setOrderData] = useState<any[]>([]); // State for multiple order data
  const [selectedOrder, setSelectedOrder] = useState<any>(null); // State for selected order details
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
    
        console.log('Fetched Orders:', JSON.stringify(orders, null, 2));
    
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

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
  };

  const handleSubmit = async () => {
    if (activeTab === 'userDetails') {
      setShowPopup(true);
      const confirmUpdate = window.confirm("Are you sure you want to update this user's details?");
      if (confirmUpdate && userData) {
        try {
          if (userID) {
            const userDocRef = doc(db, 'user', userID);
            await updateDoc(userDocRef, userData);
            alert('User details updated successfully!');
          } else {
            console.error('UserID is undefined or invalid.');
          }
        } catch (error) {
          console.error('Error updating user details:', error);
        }
      }
      setShowPopup(false);
    } else if (activeTab === 'orders') {
      setShowPopup(true);
      const confirmUpdate = window.confirm("Are you sure you want to update this order's details?");
      if (confirmUpdate && selectedOrder) {
        try {
          if (selectedOrder.id) {
            const orderDocRef = doc(db, 'orders', selectedOrder.id);
            await updateDoc(orderDocRef, selectedOrder);
            alert('Order details updated successfully!');
          } else {
            console.error('Order ID is undefined or invalid.');
          }
        } catch (error) {
          console.error('Error updating order details:', error);
        }
      }
      setShowPopup(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (activeTab === 'userDetails') {
      setUserData({ ...userData, [name]: value });
    } else if (activeTab === 'orders') {
      setSelectedOrder({ ...selectedOrder, [name]: value });
    }
  };

  const handleTabSelect = (tabKey: string | null) => {
    if (tabKey) {
      setActiveTab(tabKey);
      setEditMode(false);
    }
  };

  if (!userData && orderData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>
            {activeTab === 'userDetails' ? 'User Details' : 'Orders'}
          </h3>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => setEditMode(!editMode)}
            style={{
              width: '100px',
              height: '50px',
              fontSize: '16px',
              marginTop: '10px'
            }}
          >
            {editMode ? 'Cancel Edit' : 'Edit'}
          </button>
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={handleTabSelect}
          className='mb-3'
        >
          <Tab eventKey='userDetails' title='User Details'>
            <form className='form'>
              <div className='card-body'>
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
          
                {/* Add more fields similarly */}
              </div>
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
            </form>
          </Tab>
          <Tab eventKey='orders' title='Orders'>
            <div className='card-body'>
              {/* Table to display order IDs */}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.map((order) => (
                    <tr key={order.id} onClick={() => handleOrderClick(order)}>
                      <td>{order.order_id}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* If an order is selected, display its details */}
              {selectedOrder && (
                <form className='form mt-4'>
                  <div className='row mb-10'>
                    <div className='col-lg-6'>
                      <label className='col-form-label'>Order ID:</label>
                      <input
                        type='text'
                        className='form-control form-control-solid input-solid'
                        name='order_id'
                        value={selectedOrder?.order_id || ''}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </div>
                    <div className='col-lg-6'>
                      <label className='col-form-label'>Amount:</label>
                      <input
                        type='text'
                        className='form-control form-control-solid input-solid'
                        name='amount'
                        value={selectedOrder?.amount || ''}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </div>
                  </div>
              <div className='row mb-10'>
                  <div className='col-lg-6'>
                   <label className='col-form-label'>Items:</label>
                 <input
                      type='text'
                      className='form-control form-control-solid input-solid'
                      name='items'
                      value={selectedOrder?.items || ''}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                  <div className='col-lg-6'>
                    <label className='col-form-label'>Payment Date:</label>
                    <input
                      type='text'
                      className='form-control form-control-solid input-solid'
                      name='payment_date'
                      value={selectedOrder?.payment_date || ''}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                </div>
                <div className='row mb-10'>
                  <div className='col-lg-6'>
                    <label className='col-form-label'>Payment Type:</label>
                    <input
                      type='text'
                      className='form-control form-control-solid input-solid'
                      name='payment_type'
                      value={selectedOrder?.payment_type || ''}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                  <div className='col-lg-6'>
                    <label className='col-form-label'>Phone Number:</label>
                    <input
                      type='text'
                      className='form-control form-control-solid input-solid'
                      name='phone_number'
                      value={selectedOrder?.phone_number || ''}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                </div>
                  {/* Add more fields as needed */}
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
                </form>
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export { BuilderPage };
