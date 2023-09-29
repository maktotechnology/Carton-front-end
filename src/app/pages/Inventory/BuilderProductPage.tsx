// BuilderProductPage.tsx

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { getLayoutFromLocalStorage, ILayout, LayoutSetup } from '../../../_metronic/layout/core';
import './BuilderProductPage.css';
import { Link, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import AddProductPage from './AddProductPage';


const BuilderProductPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const [tab, setTab] = useState('Sidebar');
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage());
  const [configLoading, setConfigLoading] = useState<boolean>(false);
  const [resetLoading, setResetLoading] = useState<boolean>(false);
  
  const productIds = Array.from({ length: 10 }, (_, index) => index + 1); // Sample Product IDs

  // layout setup of a web application
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

  // for resetting a configuration to its default state
  const reset = () => {
    setResetLoading(true);
    setTimeout(() => {
      setConfig(getLayoutFromLocalStorage());
      setResetLoading(false);
    }, 1000);
  };

  // Function to remove duplicates based on Prod_Id
  const removeDuplicates = (dataList) => {
    const uniqueProdIDs = new Set();
    return dataList.reduce((uniqueData, data) => {
      if (!uniqueProdIDs.has(data.Prod_Id)) {
        uniqueProdIDs.add(data.Prod_Id);
        uniqueData.push(data);
      }
      return uniqueData;
    }, []);
  };

  const [sampleProdData, setSampleData] = useState(() => {
    // Retrieve the data from local storage during component mount
    const storedData = localStorage.getItem('sampleProdData');
    const initialData = storedData ? JSON.parse(storedData) : [
      { Prod_Id: 1, 
        Prod_Name: 'Iphone15', 
        UoM: 2, 
        Brand: 'Apple', 
        Category: 'Electronics' 
      }
     ];

    // Remove duplicates based on Prod_Id and store in local storage
    const uniqueData = removeDuplicates(initialData);
    console.log(initialData)
    localStorage.setItem('sampleProdData', JSON.stringify(uniqueData));

    return uniqueData;
  });

  const handleClearLocalStorage = () => {
    localStorage.removeItem('sampleProdData');
    setSampleData([]); // Reset the state to an empty array
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

    // Add the new product data to the sampleProdData array if all required fields are present
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
    // Function to handle search and filter data
    const handleSearch = (query) => {
      setSearchQuery(query);
      const filteredResults = sampleProdData.filter((data) =>
        data.Prod_Id.toString().includes(query)
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
          placeholder="Search by Prod_Id"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="table-container"> {/* Add a container div for the table */}
        <table className="custom-table"> {/* Add the custom-table class for styling */}  
          {/* begin::table-head */} 
          <thead>
            <tr>
              <th>Prod</th>
              <th>Prod_Name</th>
              <th>UoM</th>
              <th>Brand</th>
              <th>Category</th>
            </tr>
          {/* end::table-head */} 
          </thead>
          {/* begin::table-body */} 
          <tbody>
            {filteredData.map((data) => (          
              <tr key={data.Prod_Id}>
                <td>{data.Prod_Id}</td>           
                <td>
                  {/* Make the name a clickable link and pass the user's name as a URL parameter */}
                  <Link to={`/product-details/${encodeURIComponent(data.Prod_Id)}/${encodeURIComponent(data.Prod_Name)}/${encodeURIComponent(data.UoM)}/${encodeURIComponent(data.Brand)}/${encodeURIComponent(data.Category)}`}>
                    {data.Prod_Name}
                  </Link>
                </td>
                <td>{data.UoM}</td>
                <td>{data.Brand}</td>
                <td>{data.Category}</td>
              </tr>
            ))}
          {/* end::table-body */} 
          </tbody>
        {/* end::table */} 
        </table>
      </div>
      <div>
        <button onClick={handleClearLocalStorage}>Clear Local Storage</button>
      </div>
      <div >
        {/* Add a button that navigates to the AddUserPage */}
        <Routes>
          <Route path="/add-product/" element={<AddProductPage  />} />
        </Routes>
        <button className="submit-butto"><Link to="/add-product/" style={{ color: '#3c4043', fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold'  }} >  <i className="fas fa-plus" style={{ marginRight: '5px' }}></i>Add New Product</Link></button>
      </div>
    </>
  );
};

export { BuilderProductPage };

