import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, where, collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../../../../firebase';
import { Tabs, Tab, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {CustomerListWrapper} from './Orders/customer-list/CustomerList'

const BuilderPage: React.FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<any[]>([]); // State for multiple order data
  const [selectedOrder, setSelectedOrder] = useState<any>(null); // State for selected order details
  const { userID } = useParams<{ userID: string }>();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!userID) {
        console.error('UID is undefined.');
        return;
      }
    
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userid', '==', userID));
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
      fetchOrderDetails();
    
  }, [userID]);

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

      setSelectedOrder({ ...selectedOrder, [name]: value });
    
  };

  if (orderData.length === 0) {
    return <div>Loading...</div>;
  }


  const formatDate = (timestamp: { seconds: number, nanoseconds: number } | undefined): string => {
    if (!timestamp) return '';
  
    // Convert the timestamp to milliseconds by adding seconds and nanoseconds
    const timestampInMs = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  
    // Log the values to check if they're correct
    console.log('Original timestamp:', timestamp);
    console.log('Timestamp in milliseconds:', timestampInMs);
  
    const date = new Date(timestampInMs);
  
    // Format the date to the correct string format
    return date.toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata', // Set timezone (UTC+5:30)
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true, // 12-hour format
    });
  };
  
  return (
    <>
    <CustomerListWrapper/>
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>
            {'Orders'}
          </h3>
        </div>

            <div className='card-body'>
              {/* Table to display order IDs */}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order ID List</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.map((order, index) => (
                    <tr key={order.id} onClick={() => handleOrderClick(order)}>
                      <td>{index + 1}</td>
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
                      value={formatDate(selectedOrder?.payment_date)}
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
                      value={selectedOrder?.user_phoneNo || ''}
                      onChange={handleChange}
                      disabled={!editMode}

                    />
                  </div>
                </div>
                </form>
              )}
            </div>
      </div>
    </>
  );
};

export { BuilderPage };
