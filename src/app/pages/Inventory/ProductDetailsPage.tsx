// ProductDetailsPage.tsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './AddProductPage.css';

const ProductDetailsPage = () => {

  // Retrieve parameters from the URL in a React component
  const { Prod_Id, Prod_Name, UoM, Brand, Category } = useParams();

  // State to manage the editable values and edit mode
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({
    Prod_Name,
    UoM,
    Brand,
    Category,
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

  const handleSave = () => {
    // Retrieve existing data from local storage
    const storedData = localStorage.getItem('sampleProdData');
    if (storedData) {
      const existingData = JSON.parse(storedData);
      const editedItemIndex = existingData.findIndex((data) => data.Prod_Id === Prod_Id);

      if (editedItemIndex !== -1) {
        // Update the values of the edited item
        existingData[editedItemIndex] = editedValues;

        // Update local storage with the updated sampleProdData
        localStorage.setItem('sampleProdData', JSON.stringify(existingData));

        // Exit edit mode
        toggleEditMode();
      } else {
        console.log('Edited item not found in the existing data.');
      }
    } else {
      console.log('No data found in local storage.');
    }
  };

  const handleGoBack = () => {
    window.history.back(); // This will navigate back one step in the browser's history
  };


  return (
    <div>
      <h2>Edit Product Details</h2>
      <p>Prod_Id: {Prod_Id}</p>
      {/* Edit Product name */}
      <p>
        Prod_Name: {' '} {editMode ? ( <input
            type="text"
            value={editedValues.Prod_Name}
            onChange={(e) => handleInputChange('Prod_Name', e.target.value)}
          />
        ) : (
          Prod_Name
        )}
      </p>
      {/* Edit UOM */}
      <p>UoM: {editMode ? <input 
            type="text"
            value={editedValues.UoM}
            onChange={(e) => handleInputChange('UoM', e.target.value)} /> : UoM}
      </p>
      {/* Edit Category */}
      <p>Category: {editMode ? <input 
            type="text"
            value={editedValues.Category}
            onChange={(e) => handleInputChange('Category', e.target.value)} /> : Category}
      </p>
      {/* Edit Brand */}
      <p>Brand: {editMode ? <input 
            type="text"
            value={editedValues.Brand}
            onChange={(e) => handleInputChange('Brand', e.target.value)} /> : Brand}
      </p>

      <br></br> 

      {/* Save and Cancel buttons */}
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
        {/* Edit and GoBack buttons */}
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

export default ProductDetailsPage;

