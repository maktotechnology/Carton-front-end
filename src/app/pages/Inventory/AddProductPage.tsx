//AddProductPage.tsx

import React, { useState, useEffect } from 'react';
import { KTIcon } from '../../../_metronic/helpers';
import { Link, Route, Routes, useLocation, useNavigate, } from 'react-router-dom';
import { getLayoutFromLocalStorage, ILayout, LayoutSetup } from '../../../_metronic/layout/core';
import './AddProductPage.css';
import { Projects } from '../Inventory/products';


const AddProductPage = () =>{

  const navigate = useNavigate();
  const location = useLocation();

<<<<<<< HEAD
  const handleSelectAll = (e) => {
    const checkboxes = document.querySelectorAll('.product-check');

    checkboxes.forEach((checkbox) => {
      const inputCheckbox = checkbox as HTMLInputElement;  // Explicit cast to HTMLInputElement
      inputCheckbox.checked = e.target.checked;
    });
  };

=======
  // Initialise formData
>>>>>>> mirudhulaa
  const [formData, setFormData] = useState({
    Prod_Id: Date.now(),
    Prod_Name: '',
    UoM: '',
    Category: '',
    Brand: '',
  });  
<<<<<<< HEAD
  

=======

  // Function to handle InputChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  // Functio to Submit
>>>>>>> mirudhulaa
  const handleSubmit = (e) => {
    e.preventDefault();
    // Build query parameters
    const queryParams = new URLSearchParams();
    for (const key in formData) {
      queryParams.append(key, formData[key]);
    }
    // Navigate with query parameters
    navigate(`/inventory?${queryParams.toString()}`);
  };

  // To nativate one step back
  const handleGoBack = () => {
    navigate(-1);
  };

<<<<<<< HEAD
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
=======
>>>>>>> mirudhulaa

  return (
    <div>
      {/* begin::form */}
      <form className="product-form">
<<<<<<< HEAD
=======
        {/* begin::head */}
>>>>>>> mirudhulaa
        <h3 className="card-title align-items-start flex-column">
          <div className="card-label fw-bold fs-3 mb-1" style={{ textAlign: 'center' }}>
            Enter Product Details
          </div>
<<<<<<< HEAD
        </h3>
        <br/>
        {/* begin::menu */}
        <div className="card-body">
          <div className="form-group row">
            <div className="col-lg-6">
              <label>Prod_Id:</label>
              <input type="text" className="form-control" name="Prod_Name" value={formData.Prod_Id} onChange={handleChange} required readOnly disabled/>
            </div>
          </div>
          {/* begin::menu 2 */}
          <div className="form-group row">  
            <div className="col-lg-6">
=======
        {/* end::head */}
        </h3>
        <br/>
        {/* begin::menu 1*/}
        <div className="card-body">
          {/* begin::menu 2 */}
          <div className="form-group row">  
            <div className="col-lg-6">
              {/* Input for Product name */}
>>>>>>> mirudhulaa
              <label>Prod_Name:</label>
              <input type="text" className="form-control" name="Prod_Name" value={formData.Prod_Name} onChange={handleChange} required />
            </div>
            <div className="col-lg-6">
<<<<<<< HEAD
              <label>UOM:</label>
              <input type="text" className="form-control" name="UoM" value={formData.UoM} onChange={handleChange} required />
            </div>
          {/* begin::menu 2 */}
=======
              {/* Input for unit of measurement */}
              <label>UOM:</label>
              <input type="text" className="form-control" name="UoM" value={formData.UoM} onChange={handleChange} required />
            </div>
          {/* end::menu 2 */}
>>>>>>> mirudhulaa
          </div>

          <div className="form-group row">
            {/* begin::menu 3*/}
            <div className="col-lg-6">
<<<<<<< HEAD
=======
              {/* Input for Category */}
>>>>>>> mirudhulaa
              <label>Category:</label>
              <input type="text" className="form-control" name="Category" value={formData.Category} onChange={handleChange} required />
            </div>
            <div className="col-lg-6">
<<<<<<< HEAD
=======
              {/* Input for Brand */}
>>>>>>> mirudhulaa
              <label>Brand:</label>
              <div className="input-group">
                <input type="text" className="form-control" name="Brand" value={formData.Brand} onChange={handleChange} required />
              </div>
<<<<<<< HEAD
            {/* end::menu 3 */}
            </div>
          {/* end::menu 2 */}
          </div>
        {/* end::menu */}
=======
            </div>
          {/* end::menu 3 */}
          </div>
        {/* end::menu 1*/}
>>>>>>> mirudhulaa
        </div>
      {/* end::form */}
      </form>
    
      {/* Save and Cancel buttons */}
      <div className="card-footer">
        <div className="row">
          <div className="col-lg-6 text-center">
            <button className="btn btn-primary mr-2" onClick={handleSubmit}>
              Save
            </button>
          </div>
          <div className="col-lg-6 text-center">
            <button className="btn btn-secondary" onClick={handleGoBack}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default AddProductPage;

=======
export default AddProductPage;
>>>>>>> mirudhulaa
