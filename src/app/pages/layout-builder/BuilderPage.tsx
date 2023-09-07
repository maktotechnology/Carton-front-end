/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { getLayoutFromLocalStorage, ILayout, LayoutSetup } from '../../../_metronic/layout/core';
import './BuilderPage.css';


import { Link, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import AddUserPage from './AddUserPage';


const BuilderPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const [tab, setTab] = useState('Sidebar');
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage());
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

  const [sampleData, setSampleData] = useState(() => {
    // Retrieve the data from local storage during component mount
    const storedData = localStorage.getItem('sampleData');
    const initialData = storedData ? JSON.parse(storedData) : [
      { Ref_ID: 15, Request_risedby: 'John Doe', Transfer_type: 'Internal', Branch: 'CBE', Department: 'HR', Status: 'Approved' }
     ];

    // Remove duplicates based on Ref_ID and store in local storage
    const uniqueData = removeDuplicates(initialData);
    console.log(initialData)
    localStorage.setItem('sampleData', JSON.stringify(uniqueData));

    return uniqueData;
  });
  const handleClearLocalStorage = () => {
    localStorage.removeItem('sampleData');
    setSampleData([]); // Reset the state to an empty array
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
      Status: searchParams.get('Status') || '',
      Product: searchParams.get('Product') || '',
    };

    // Add the new user data to the sampleData array if all required fields are present
    if (
      newFormData.Ref_ID &&
      newFormData.Request_risedby &&
      newFormData.Transfer_type &&
      newFormData.Branch &&
      newFormData.Department &&
      newFormData.Status &&
      newFormData.Product
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
  return (
    <>
          {/* Search bar */}
          <div>
        <input
          type="text"
          placeholder="Search by Ref_ID"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="table-container"> {/* Add a container div for the table */}
        <table className="custom-table"> {/* Add the custom-table class for styling */}
          <thead>
            <tr>
              <th>Ref_ID</th>
              <th>Request_risedby</th>
              <th>Transfer_type</th>
              <th>Branch</th>
              <th>Department</th>
              <th>Status</th>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            
            {filteredData.map((data) => (
              
              <tr key={data.Ref_ID}>
                <td>{data.Ref_ID}</td>
                <td>
                  {/* Make the name a clickable link and pass the user's name as a URL parameter */}
                  <Link
                  to={`/user-details/${encodeURIComponent(data.Ref_ID)}/${encodeURIComponent(data.Request_risedby)}/${encodeURIComponent(data.Transfer_type)}/${encodeURIComponent(data.Branch)}/${encodeURIComponent(data.Department)}/${encodeURIComponent(data.Status)}/${encodeURIComponent(data.Product)}`}>
                    {data.Request_risedby}
                    </Link>
                </td>
                <td>{data.Transfer_type}</td>
                <td>{data.Branch}</td>
                <td>{data.Department}</td>
                <td>{data.Status}</td>
                <td>{data.Product}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={handleClearLocalStorage}>Clear Local Storage</button>
      </div>
      <div >
        
        {/* Add a button that navigates to the AddUserPage */}
        <Routes>
          <Route path="/add-user" element={<AddUserPage  />} />
        </Routes>
        <button className="submit-butto"><Link to="/add-user" style={{ color: '#3c4043', fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold'  }} >  <i className="fas fa-plus" style={{ marginRight: '5px' }}></i>Add New Material</Link></button>
      </div>
    </>
  );
};


export { BuilderPage };

