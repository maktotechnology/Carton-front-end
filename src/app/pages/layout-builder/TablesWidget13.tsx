// Tableswidget13.tsx

import {KTIcon} from '../../../_metronic/helpers'
import React, { useEffect, useState } from 'react';
import { getLayoutFromLocalStorage, ILayout, LayoutSetup } from '../../../_metronic/layout/core';
import './BuilderPage.css';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import AddUserPage from './AddUserPage';

type Props = {
  className: string
}

const TablesWidget13: React.FC<Props> = ({className}) => {

  const location = useLocation();
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage());

  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('Sidebar');
  const [configLoading, setConfigLoading] = useState<boolean>(false);
  const [resetLoading, setResetLoading] = useState<boolean>(false);
  const referenceIds = Array.from({ length: 10 }, (_, index) => index + 1); // Sample reference IDs

  const updateConfig = () => {
    setConfigLoading(true);
    try {
      LayoutSetup.setConfig(config);
      window.location.reload();
    } catch (error) {
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

  const handleClearLocalStorage = () => {
    localStorage.removeItem('sampleData');
    // Reset the state to an empty array
    setSampleData([]); 
  };

  // Function to remove duplicates based on Ref_ID
  const removeDuplicates = (dataList) => {
    const uniqueRefIDs = new Set();
    return dataList.reduce((uniqueData, data) => {
      if (!uniqueRefIDs.has(data.Ref_ID)) {
        uniqueRefIDs.add(data.Ref_ID);
        uniqueData.push(data);
      }
      return uniqueData;
    }, []);
  };

  //Initialise sampleData to get the data from localStorage
  const [sampleData, setSampleData] = useState(() => {
    // Retrieve the data from local storage during component mount
    const storedData = localStorage.getItem('sampleDat');
    const initialData = storedData ? JSON.parse(storedData) : [
      { 
        Ref_ID: 1, 
        Request_risedby: 'John Doe', 
        Transfer_type: 'Internal', 
        Branch: 'CBE', 
        Department: 'Admin', 
        Product: 'Vivo', 
        Dated: new Date('2023-01-10'),
        Uom: '2',
        Quantity: 5,
        //Status: 'Approved'
      }
     ];
    // Remove duplicates based on Reft_ID and store in local storage
    const uniqueData = removeDuplicates(initialData);
    localStorage.setItem('sampleDat', JSON.stringify(uniqueData));
    //console.log('sampleData');
    console.log(initialData);
    //console.log(uniqueData);
    return uniqueData;
  });

  // SelectAll checkbox function
  const handleSelectAll = (event) => {
    const checkboxes = document.querySelectorAll('.widget-13-check');
    checkboxes.forEach((checkbox) => {
      const inputCheckbox = checkbox as HTMLInputElement; // Explicit cast to HTMLInputElement
      inputCheckbox.checked = event.target.checked;
    });
  };

  const handleUserAdded = (newUser) => {
    // Check if an object with the same Ref_ID already exists in sampleData
    const isDuplicate = sampleData.some((data) => data.Ref_ID === newUser.Ref_ID);
    if (!isDuplicate) {
      const updatedData = [...sampleData, newUser];
      // Update state and local storage with the new data
      setSampleData(updatedData);
      localStorage.setItem('sampleData', JSON.stringify(updatedData));
    }
  };
  
  // Read the URL parameters and store them in the state
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newFormData = {
      Ref_ID: searchParams.get('Ref_ID') || '',
      Request_risedby: searchParams.get('Request_risedby') || '',
      Transfer_type: searchParams.get('Transfer_type') || '',
      Branch: searchParams.get('Branch') || '',
      Department: searchParams.get('Department') || '',
      Product: searchParams.get('Product') || '',
      Dated: searchParams.get('Dated') || '',
      Uom: searchParams.get('Uom') || '',
      Quantity: searchParams.get('Quantity') || '',
      //Status: searchParams.get('Status') || '',
    };
    // Add the new user data to the sampleData array if all required fields are present
    if (
      newFormData.Ref_ID &&
      newFormData.Request_risedby &&
      newFormData.Transfer_type &&
      newFormData.Branch &&
      newFormData.Department &&
      newFormData.Product &&
      newFormData.Dated &&
      newFormData.Uom &&
      newFormData.Quantity 
      //newFormData.Status 
    ) {
      handleUserAdded(newFormData);
    }
  }, [location.search]);
  
  const [filteredData, setFilteredData] = useState(sampleData);
  // Function to handle search and filter data
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = sampleData.filter((data) =>
      data.Ref_ID.toString().includes(query)
    );
    console.log(filteredResults)
    setFilteredData(filteredResults);
  };

  // function to delete row
  const handleDeleteRow = (refId) => {
    // Filter out the row to be deleted from the data state
    const updatedData = filteredData.filter((item) => item.Ref_ID !== refId);
    // Update the data state
    setFilteredData(updatedData); 
  };
    
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Details</span>
        </h3>
        
        <div className='card-toolbar'>
        {/* begin::Menu */}
          <div>
           {/* Add a button that navigates to the AddUserPage */}
            <Routes>
              <Route path="/add-user" element={<AddUserPage  />} />
            </Routes>
            <button className="submit-butto"><Link to="/add-user" style={{ color: '#3c4043', fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold'  }} >  <i className="fas fa-plus" style={{ marginRight: '5px' }}></i>Add New Material</Link></button>
          </div>
          <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-200px'
            data-kt-menu='true'>
          </div>
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
                <th className='w-25px'>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value='1'
                      data-kt-check='true'
                      data-kt-check-target='.widget-13-check'
                      id='selectAllCheckbox' // Add an ID for referencing
                      onChange={handleSelectAll} // Add an onChange event handler
                    />
                  </div>
                </th>
                <th className='min-w-150px'>Ref_ID</th>
                <th className='min-w-140px'>Request_risedby</th>
                <th className='min-w-120px'>Transfer_type</th>
                <th className='min-w-120px'>Branch</th>
                <th className='min-w-120px'>Department</th>
                <th className='min-w-120px'>Product</th>
                <th className='min-w-120px'>Date</th>
                <th className='min-w-120px'>UOM</th>
                <th className='min-w-120px'>Quantity</th>
                {/* <th className='min-w-120px'>Status</th> */}
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            {/* end::Table head */}
            </thead>
            
            {/* begin::Table body */}
            <tbody>
            {filteredData.map((data, index) => (
              <tr key={data.Ref_ID}>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-13-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>{index + 1}</td>
                <td>
                  {/* Make the name a clickable link and pass the user's name as a URL parameter */}
                  <Link to={`/user-details/${encodeURIComponent(data.Ref_ID)}/${encodeURIComponent(data.Request_risedby)}/${encodeURIComponent(data.Transfer_type)}/${encodeURIComponent(data.Branch)}/${encodeURIComponent(data.Department)}/${encodeURIComponent(data.Product)}/${encodeURIComponent(data.Dated)}/${encodeURIComponent(data.Uom)}/${encodeURIComponent(data.Quantity)}`}>
                    {data.Request_risedby}
                  </Link>
                </td>
                <td>{data.Transfer_type}</td>
                <td>{data.Branch}</td>
                <td>{data.Department}</td>
                <td>{data.Product}</td>
                <td>{data.Dated}</td>
                <td>{data.Uom}</td>
                <td>{data.Quantity}</td>
                {/* <td>{data.Status}</td> */}
                <td className='text-end'>
                {/* Make the button(edit) a clickable link and pass the URL parameter */}
                <Link to={`/user-details/${encodeURIComponent(data.Ref_ID)}/${encodeURIComponent(data.Request_risedby)}/${encodeURIComponent(data.Transfer_type)}/${encodeURIComponent(data.Branch)}/${encodeURIComponent(data.Department)}/${encodeURIComponent(data.Product)}/${encodeURIComponent(data.Dated)}/${encodeURIComponent(data.Uom)}/${encodeURIComponent(data.Quantity)}}`}>
                  <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                    <KTIcon iconName='pencil' className='fs-3' />
                  </a>
                 </Link>
                  {/* Make the button clickable to delete the row */}
                  <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    onClick={() => handleDeleteRow(data.Ref_ID)}>
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

export {TablesWidget13}
