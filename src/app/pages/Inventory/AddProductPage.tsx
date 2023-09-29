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

  const handleSelectAll = (e) => {
    const checkboxes = document.querySelectorAll('.product-check');

    checkboxes.forEach((checkbox) => {
      const inputCheckbox = checkbox as HTMLInputElement;
      inputCheckbox.checked = e.target.checked;
    });
  };

  const [formData, setFormData] = useState({
    Prod_Id: Date.now(),
    Prod_Name: '',
    UoM: '',
    Category: '',
    Brand: '',
  });

  const handleSubmi = (e) => {
    e.preventDefault();
    
    // Navigate to /inventory with form data as a parameter
    navigate(`/inventory?${JSON.stringify(formData)}`);
  };
  

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

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <form className="product-form">
        <h3 className="card-title align-items-start flex-column">
          <div className="card-label fw-bold fs-3 mb-1" style={{ textAlign: 'center' }}>
            Enter Product Details
          </div>
        </h3>
        <br/>
        <div className="card-body">
          <div className="form-group row">
            <div className="col-lg-6">
              <label>Prod_Name:</label>
              <input type="text" className="form-control" name="Prod_Name" value={formData.Prod_Name} onChange={handleChange} required />
            </div>
            <div className="col-lg-6">
              <label>UOM:</label>
              <input type="text" className="form-control" name="UoM" value={formData.UoM} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-6">
              <label>Category:</label>
              <input type="text" className="form-control" name="Category" value={formData.Category} onChange={handleChange} required />
            </div>
            <div className="col-lg-6">
              <label>Brand:</label>
              <div className="input-group">
                <input type="text" className="form-control" name="Brand" value={formData.Brand} onChange={handleChange} required />
              </div>
            </div>
          </div>
        </div>
      </form>
    

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

