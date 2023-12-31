//UserDetailsPage.tsx

import React, { useState } from 'react';
import { useParams, Route, Routes } from 'react-router-dom';
import { TablesWidget13, } from '../layout-builder/TablesWidget13'

const UserDetailsPage = () => {

  //Initialise parameters with UseParams
  const { Ref_ID, Request_risedby, Transfer_type, Branch, Department, Product, Dated, Uom, Quantity} = useParams();

  // State to manage the editable values and edit mode
  const [editMode, setEditMode] = useState(false);

  const [editedValues, setEditedValues] = useState({
    Request_risedby,
    Transfer_type,
    Branch,
    Department,
    Product,
    Dated,
    Uom,
    Quantity,
    //Status,
  });

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Function to handle input changes
  const handleInputChange = (field, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  // Function to save edited values
  const handleSave = () => {
    // Retrieve existing data from local storage
    const storedData = localStorage.getItem('materialData');
    const existingData = storedData ? JSON.parse(storedData) : [];
    // Find the index of the edited item using its Ref_ID
    const editedItemIndex = existingData.findIndex((data) => data.Ref_ID === Ref_ID);
    if (editedItemIndex !== -1) {
      // Update the values of the edited item
      const updatedItem = { ...existingData[editedItemIndex], ...editedValues };
      // Update the sampleData array with the updated item
      existingData[editedItemIndex] = updatedItem;
      // Update local storage with the updated sampleData
      localStorage.setItem('materialData', JSON.stringify(existingData));
      // Exit edit mode
      toggleEditMode();
    } else {
      console.log('Edited item not found in the existing data.');
    }
  };

  // This will navigate back one step in the browser's history
  const handleGoBack = () => {
    window.history.back(); 
  };
  

  return (
    <div>
      <h2>Meterial Requisition Details</h2>
      <p>Ref_ID: {Ref_ID}</p>
      {/* Edit Request_risedby */}
      <p>Request_risedby:{' '}
        {editMode ? (
          <input
            type="text"
            value={editedValues.Request_risedby}
            onChange={(e) => handleInputChange('Request_risedby', e.target.value)}/>) : (Request_risedby)}
      </p>
      {/* Edit Transfer_type */}
      <p>Transfer_type: {editMode ? <input 
          type="text"
          value={editedValues.Transfer_type}
          onChange={(e) => handleInputChange('Transfer_type', e.target.value)} /> : Transfer_type}
      </p>
      {/* Edit Branch */}
      <p>Branch: {editMode ? <input 
          type="text"
          value={editedValues.Branch}
          onChange={(e) => handleInputChange('Branch', e.target.value)} /> : Branch}
      </p>
      {/* Edit Department */}
      <p>Department: {editMode ? <input 
          type="text"
          value={editedValues.Department}
          onChange={(e) => handleInputChange('Department', e.target.value)} /> : Department}
      </p>  
        {/* Edit Product */}
      <p>Product: {editMode ? <input 
          type="text"
          value={editedValues.Product}
          onChange={(e) => handleInputChange('Product', e.target.value)}  /> : Product}
      </p>
      {/* Edit Date */}
      <p>Date: {editMode ? <input 
          type="date"
          value={editedValues.Dated}
          onChange={(e) => handleInputChange('Dated', e.target.value)}  /> : Dated}
      </p>
      {/* Edit UOM */}
      <p>Uom: {editMode ? <input 
          type="text"
          value={editedValues.Uom}
          onChange={(e) => handleInputChange('Uom', e.target.value)}  /> : Uom}
      </p>
      {/* Edit Quantity */}
      <p>Quantity: {editMode ? <input 
          type="number"
          value={editedValues.Quantity}
          onChange={(e) => handleInputChange('Quantity', e.target.value)}  /> : Quantity}
      </p>

{/*  
      <div className='d-flex flex-column w-100 me-2'>
        <div className='d-flex flex-stack mb-2'>
          {Status === 'Approved' ? (
            <span className='text-muted me-2 fs-7 fw-semibold'>
              <span role="img" aria-label="Truck">🚚</span> 100%
            </span>
          ) : Status === 'Draft' ? (
          <span className='text-muted me-2 fs-7 fw-semibold'>
            <span role="img" aria-label="Truck">🚚</span> 0%
          </span>
          ) : Status === 'Processing' ? (
            <span className='text-muted me-2 fs-7 fw-semibold'>
              <span role="img" aria-label="Truck">🚚</span> 70%
            </span>
          ) : Status === 'Rejected' ? (
            <span className='text-muted me-2 fs-7 fw-semibold' style={{ color: 'red' }}>
              <span role="img" aria-label="Truck">🚚</span> Canceled
            </span>
          ) : null}
        </div>
        <div className='progress h-9px w-100'>
          <div className='progress-bar' role='progressbar'
            style={{
              width: Status === 'Approved' ? '100%' : Status === 'Processing' ? '70%' : Status === 'Draft' ? '0%' : '0%',
              backgroundColor: Status === 'Rejected' ? 'red' : 'primary',
              backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/014/455/904/original/delivery-truck-icon-icon-on-transparent-background-free-png.png")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: '30px 30px',
              right: `calc(${Status === 'Approved' ? '100%' : Status === 'Processing' ? '70%' : Status === 'Draft' ? '0%' : '0%'} - 15px)`, // Adjust left position based on progress
            }}>
          </div>
        </div>
      </div>
*/} 
      
      {/* Edit, Save and GoBack buttons */}
      {editMode ? (
        <>
          <div className="card-footer">
            <div className="row">
              <div className="col-lg-6 text-center">
                <button className="btn btn-primary mr-2" onClick={handleSave}>Save</button>
              </div>
              <div className="col-lg-6 text-center">
                <button className="btn btn-secondary" onClick={toggleEditMode}>Cancel</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="card-footer">
            <div className="row">
              <div className="col-lg-6 text-center">
                <button className="btn btn-primary mr-2" onClick={toggleEditMode}>Edit</button>
              </div>
              <div className="col-lg-6 text-center">
                <button className="btn btn-secondary" onClick={handleGoBack}>Back</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetailsPage;

