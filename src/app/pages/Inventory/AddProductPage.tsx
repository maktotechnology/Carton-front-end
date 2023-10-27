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

  // Initialise formData
  const [formData, setFormData] = useState({
    Prod_Id: Date.now(),
    Prod_Name: '',
    UoM: '',
    Category: '',
    Brand: '',
  });  

  // Function to handle InputChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  // Functio to Submit
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


  return (
    <div>
      {/* begin::form */}
      <form className="product-form">
        {/* begin::head */}
        <h3 className="card-title align-items-start flex-column">
          <div className="card-label fw-bold fs-3 mb-1" style={{ textAlign: 'center' }}>
            Enter Product Details
          </div>
        {/* end::head */}
        </h3>
        <br/>
        {/* begin::menu 1*/}
        <div className="card-body">
          {/* begin::menu 2 */}
          <div className="form-group row">  
            <div className="col-lg-6">
              {/* Input for Product name */}
              <label>Prod_Name:</label>
              <input type="text" className="form-control" name="Prod_Name" value={formData.Prod_Name} onChange={handleChange} required />
            </div>
            <div className="col-lg-6">
              {/* Input for unit of measurement */}
              <label>UOM:</label>
              <input type="text" className="form-control" name="UoM" value={formData.UoM} onChange={handleChange} required />
            </div>
          {/* end::menu 2 */}
          </div>

          <div className="form-group row">
            {/* begin::menu 3*/}
            <div className="col-lg-6">
              {/* Input for Category */}
              <label>Category:</label>
              <input type="text" className="form-control" name="Category" value={formData.Category} onChange={handleChange} required />
            </div>
            <div className="col-lg-6">
              {/* Input for Brand */}
              <label>Brand:</label>
              <div className="input-group">
                <input type="text" className="form-control" name="Brand" value={formData.Brand} onChange={handleChange} required />
              </div>
            </div>
          {/* end::menu 3 */}
          </div>
        {/* end::menu 1*/}
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

export default AddProductPage;