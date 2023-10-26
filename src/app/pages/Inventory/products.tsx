// products.tsx

import {KTIcon} from '../../../_metronic/helpers'
import React, { useEffect, useState } from 'react';
import { getLayoutFromLocalStorage, ILayout, LayoutSetup } from '../../../_metronic/layout/core';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import AddProductPage from './AddProductPage';
import './BuilderProductPage.css';
import AddMultiple from './AddMultiple';

type Props = {
  className: string;
}

const Projects: React.FC<Props> = ({className}) => {

  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize a state variable named tab with an initial value of 'Sidebar'
  const [tab, setTab] = useState('Sidebar');

  // functional component to initialize a state variable named config, configLoading, resetLoading
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage());
  const [configLoading, setConfigLoading] = useState<boolean>(false);
  const [resetLoading, setResetLoading] = useState<boolean>(false);

  // responsible for updating some configuration settings
  const updateConfig = () => {
    setConfigLoading(true);
    try {
      LayoutSetup.setConfig(config);
      window.location.reload();
    } 
    catch (error) {
      setConfig(getLayoutFromLocalStorage());
      setConfigLoading(false);
    }
  };

  const reset = () => {
    setResetLoading(true);
    setTimeout(() => {
      setConfig(getLayoutFromLocalStorage());
      setResetLoading(false);
    }, 1000);
  };

  // Function to handle search and filter data
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = sampleProdData.filter((data) =>
      data.Prod_Id.toString().includes(query)
    );
    console.log(filteredResults);
    setFilteredData(filteredResults);
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem('sampleProdData');
    setSampleData([]); // Reset the state to an empty array
  };

  // Function to remove duplicates based on Prod_ID
  const removeDuplicates = (dataList) => {
    const uniqueprodIds = new Set();
    return dataList.reduce((uniqueData, data) => {
      if (!uniqueprodIds.has(data.Prod_Id)) {
        uniqueprodIds.add(data.Prod_Id);
        uniqueData.push(data);
      }
      return uniqueData;
    }, []);
  };

  // Initialise sampleProdData useState
  const [sampleProdData, setSampleData] = useState(() => {
    // Retrieve the data from local storage during component mount
    const storedData = localStorage.getItem('sampleProdData');
    // Setting initial values in the table (attempt-1)
    const initialData = storedData ? JSON.parse(storedData) : [
      { 
        Prod_Id: 1, 
        Prod_Name: 'Iphone15', 
        UoM: 23, 
        Brand: 'Apple', 
        Category: 'Electronics'
      }
    ];

    // Remove duplicates based on Prod_ID and store in local storage
    const uniqueData = removeDuplicates(initialData);
    localStorage.setItem('sampleProdData', JSON.stringify(uniqueData));
    return uniqueData;
  });

  // SelectAll checkbox function
  const handleSelectAll = (event) => {
    const checkboxes = document.querySelectorAll('.product-check');
    
    checkboxes.forEach((checkbox) => {
      const inputCheckbox = checkbox as HTMLInputElement; // Explicit cast to HTMLInputElement
      inputCheckbox.checked = event.target.checked;
    });
  };

  const handleUserAdded = (newProduct) => {
    // Check if an object with the same Prod_Id already exists in sampleProdData
    const isDuplicate = sampleProdData.some((data) => data.Prod_Id === newProduct.Prod_Id);
    if (!isDuplicate) {
      const updatedData = [...sampleProdData, newProduct];
      // Update state and local storage with the new data
      setSampleData(updatedData);
      localStorage.setItem('sampleProdData', JSON.stringify(updatedData));
    }
    setSampleData([...sampleProdData]);
  };

  // Read the URL parameters and store them in the state
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newFormData = {
      Prod_Id: searchParams.get('Prod_Id') || '',
      Prod_Name: searchParams.get('Prod_Name') || '',
      UoM: searchParams.get('UoM') || '',
      Brand: searchParams.get('Brand') || '',
      Category: searchParams.get('Category') || '',
    };
    // Add the new user data to the sampleProdData array if all required fields are present
    if (
      newFormData.Prod_Id &&
      newFormData.Prod_Name &&
      newFormData.UoM &&
      newFormData.Brand &&
      newFormData.Category 
    ) {
      handleUserAdded(newFormData);
    }
  }, [location.search]);
  
  const [filteredData, setFilteredData] = useState(sampleProdData);

  // Function to delete row
  const handleDeleteRow = (prodId) => {
    // Filter out the row with the specified Prod_Id
    const updatedTableData = filteredData.filter((row) => row.Prod_Id !== prodId);
    // Update local storage after deleting a row
    localStorage.setItem('sampleProdData', JSON.stringify(updatedTableData));
    // Update the data in the context
    setFilteredData(updatedTableData);
  };

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Product List</span>
        </h3>
        <div className='card-toolbar'>
        {/* begin::Menu */}
          <div >
          {/* Add a button that navigates to the AddProductPage */}
            <Routes>
              <Route path="/add-product/" element={<AddProductPage  />} />
            </Routes>
            <button className="submit-butto"><Link to="/add-product/" style={{ color: '#3c4043', fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold'  }} >  <i className="fas fa-plus" style={{ marginRight: '5px' }}></i>Add New Product</Link></button>
          </div>
          <div >
          {/* Add a button that navigates to the AddProductPage */}
            <Routes>
              <Route path="/add-multiple/" element={<AddMultiple />} />
            </Routes>
            <button className="submit-butto"><Link to="/add-multiple/" style={{ color: '#3c4043', fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold'  }} >  <i className="fas fa-plus" style={{ marginRight: '5px' }}></i>Add Multiple</Link></button>
          </div>
          {/* begin::Menu 2 */}
          <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-200px'
            data-kt-menu='true' >
          </div>
          {/* end::Menu 2 */}
          {/* end::Menu */}
        </div>
      {/* end::Header */}
      </div>
      
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='w-47px ' >
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value='1'
                      data-kt-check='true'
                      data-kt-check-target='.product-check'
                      id='selectAllCheckbox' // Add an ID for referencing
                      onChange={handleSelectAll} // Add an onChange event handler
                    />
                  </div>
                </th>
                <th className='min-w-150px'>Product_Id</th> 
                <th className='min-w-140px'>Product_Name</th>
                <th className='min-w-120px'>UOM</th>
                <th className='min-w-120px'>Category</th>
                <th className='min-w-120px'>Brand</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            {/* end::Table head */}
            </thead>

            {/* begin::Table body */}
            <tbody> 
            {filteredData.map((data, index) => (  
              <tr key={index}>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input product-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>{index + 1}</td>    {/* Set serial number for each row */}
                <td>
                  {/* Make the name a clickable link and pass the user's name as a URL parameter */}
                  <Link to={`/product-details/${encodeURIComponent(data.Prod_Id)}/${encodeURIComponent(data.Prod_Name)}/${encodeURIComponent(data.UoM)}/${encodeURIComponent(data.Category)}/${encodeURIComponent(data.Brand)}`}>
                    {data.Prod_Name}
                  </Link>
                </td>
                <td>{data.UoM}</td>
                <td>{data.Category}</td>
                <td>{data.Brand}</td>
                <td className='text-end'>
                  {/* Make the name a clickable icon to edit all the values */}
                  <Link to={`/product-details/${encodeURIComponent(data.Prod_Id)}/${encodeURIComponent(data.Prod_Name)}/${encodeURIComponent(data.UoM)}/${encodeURIComponent(data.Category)}/${encodeURIComponent(data.Brand)}`}>
                    <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                      <KTIcon iconName='pencil' className='fs-3' />
                    </a>
                  </Link>
                  {/* Make the name a clickable icon to delete the row */}
                  <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    onClick={() => handleDeleteRow(data.Prod_Id)}>
                      <KTIcon iconName='trash' className='fs-3' />
                  </a>
                </td>
              </tr>
            ))}
          {/* end::Table body */}
          </tbody>
          {/* end::Table */}
          </table>
        {/* end::Table container */}
        </div>
      {/* begin::Body */}
      </div>
    </div>
  )
}

export {Projects};
