//AddMultiple.tsx

import React, { useState, useEffect } from 'react';
import { KTIcon } from '../../../_metronic/helpers';
import { useNavigate, } from 'react-router-dom';
import { Projects } from '../Inventory/products';
import './AddProductPage.css';

const AddMultiple = () => {
  const navigate = useNavigate();
  
  const handleSelectAll = (e) => {
    const checkboxes = document.querySelectorAll('.product-check');

    checkboxes.forEach((checkbox) => {
      const inputCheckbox = checkbox as HTMLInputElement; // Explicit cast to HTMLInputElement
      inputCheckbox.checked = e.target.checked;
    });
  };

  const [tableData, setTableData] = useState(() => {
    // Retrieve data from local storage during initialization
    const storedData = JSON.parse(localStorage.getItem('sampleProdData') || '[]');
    return storedData.length > 0 ? storedData : [
      {
        Prod_Id: Date.now(),
        Prod_Name: '',
        UoM: '',
        Category: '',
        Brand: '',
      },
    ];
  });

  //update a specific row in a table or list of data 
  const handleNewRowChange = (id, name, value) => {
    const updatedTableData = tableData.map((row) => {
      if (row.Prod_Id === id) {
        return {
          ...row,
          [name]: value,
        };
      }
      return row;
    });
    setTableData(updatedTableData);
  };

  // Function to add a new row to the tableData state
  const handleAddRow = () => {
    // Generate a unique identifier for the new row based on the current timestamp
    const newRowId = Date.now();
    // Create a new row with default values
    const newRow = {
      Prod_Id: newRowId,
      Prod_Name: '',
      UoM: '',
      Category: '',
      Brand: '',
    };

    // Create a new array by appending the new row to the existing tableData
    const updatedTableData = [...tableData, newRow];
    // Update the state with the new data, effectively adding a new row
    setTableData(updatedTableData);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('sampleProdData') || '[]');
    if (storedData) {
      setTableData(storedData);
    }
  }, []);

  const handleDeleteRow = (Prod_Id) => {
    // Filter out the row with the specified Prod_Id
    const updatedTableData = tableData.filter((row) => row.Prod_Id !== Prod_Id);
    setTableData(updatedTableData);
    // Update local storage after deleting a row
    localStorage.setItem('sampleProdData', JSON.stringify(updatedTableData));
    // Update the data in the context
    setTableData(updatedTableData);
  };

  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Create a new URLSearchParams object to build query parameters
    const queryParams = new URLSearchParams();
    // Iterate through each row in the tableData
    for (const row of tableData) {
      // Iterate through each key in the row (e.g., 'Prod_Id', 'Prod_Name', etc.)
      for (const key in row) {
        // Append a query parameter for each key-value pair in the row
        queryParams.append(`sampleProdData_${row.Prod_Id}_${key}`, row[key]);
      }
    }
    // Navigate to the 'inventory' page with the query parameters in the URL
    navigate(`/inventory?${queryParams.toString()}`);

    // Clear the table data after submission
    setTableData([]);
  };

/*
  // Function to handle form submission
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Create a new URLSearchParams object to build query parameters
    const queryParams = new URLSearchParams();
    // Iterate through each row in the tableData
    for (const row of tableData) {
      // Iterate through each key in the row (e.g., 'Prod_Id', 'Prod_Name', etc.)
      for (const key in row) {
        // Append a query parameter for each key-value pair in the row
        queryParams.append(`sampleProdData_${row.Prod_Id}_${key}`, row[key]);
      }
    }
    // Navigate to the 'inventory' page with the query parameters in the URL
    navigate(`/inventory?${queryParams.toString()}`);

    console.log(tableData);
    // Clear the table data after submission
    setTableData([]);

    // Navigate to the 'inventory' page with 'newData' as state data
    navigate('/inventory', { state: { data: [] } });
  };
*/

/*
  // Function to handle form submission
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Create a new URLSearchParams object to build query parameters
    const queryParams = new URLSearchParams();
    // Iterate through each row in the tableData
    for (const row of tableData) {
      // Iterate through each key in the row (e.g., 'Prod_Id', 'Prod_Name', etc.)
      for (const key in row) {
        // Append a query parameter for each key-value pair in the row
        queryParams.append(`sampleProdData_${row.Prod_Id}_${key}`, row[key]);
      }
    }
    // Navigate to the 'inventory' page with the query parameters in the URL
    navigate(`/inventory?${queryParams.toString()}`);

    // Create a new array 'newData' that contains a shallow copy of the tableData
    const newData = tableData.map((row) => {
      const newRow = {};
      for (const key in row) {
        newRow[key] = row[key];
      }
      return newRow;
    });

    // Clear the table data after submission
  setTableData([]);


    // Navigate to the 'inventory' page with 'newData' as state data
    navigate('/inventory', { state: { data: newData } });
  };

*/
  
  // Navigate one step back
  const handleGoBack = () => {
    navigate(-1);
  };

  // Use an effect to update local storage whenever tableData changes
  useEffect(() => {
    // Convert the tableData array to a JSON string and store it in local storage
    localStorage.setItem('sampleProdData', JSON.stringify(tableData));
  }, [tableData]);


  return (
    <div className="card-footer">
      {/* begin::Header */}
      <h1 className="card-title align-items-start flex-column" style={{ alignItems: 'center', fontSize: '16px' }}>
        Add Multiple Products
      </h1>

      {/* begin::Menu */}
      <div>
        {/* begin::Menu 2 */}
        <div className="card-body py-3">
          {/* begin::Menu 3 */}
          <div className="table-container">
            {/*begin::table */}
            <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
              {/*begin::table-head */}
              <thead>
                {/*begin::table-row */}
                <tr>
                  <th className="w-25px">
                    <div className="form-check form-check-sm form-check-custom form-check-solid">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="1"
                        data-kt-check="true"
                        data-kt-check-target=".product-check"
                        id="selectAllCheckbox"
                        onChange={handleSelectAll}
                      />
                    </div>
                  </th>
                  <th className="head-style" style={{ color: 'gray' }}><b>Product_Id</b></th>
                  <th className="head-style" style={{ color: 'gray' }}><b>Product_Name</b></th>
                  <th className="head-style" style={{ color: 'gray' }}><b>UOM</b></th>
                  <th className="head-style" style={{ color: 'gray' }}><b>Category</b></th>
                  <th className="head-style" style={{ color: 'gray' }}><b>Brand</b></th>
                  <th style={{ color: 'gray' }}><b>Action</b></th>
                {/* end::table-row */}
                </tr>
              {/* end::table-head */}
              </thead>
              {/*begin::table-body */}
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.Prod_Id}>
                    <td>
                      <div className="form-check form-check-sm form-check-custom form-check-solid">
                        <input className="form-check-input product-check" type="checkbox" value="1" />
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="Prod_Id"
                        value={row.Prod_Id}
                        onChange={(e) => handleNewRowChange(row.Prod_Id, 'Prod_Id', e.target.value)}
                        required readOnly disabled
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="Prod_Name"
                        value={row.Prod_Name}
                        onChange={(e) => handleNewRowChange(row.Prod_Id, 'Prod_Name', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="UoM"
                        value={row.UoM}
                        onChange={(e) => handleNewRowChange(row.Prod_Id, 'UoM', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="Category"
                        value={row.Category}
                        onChange={(e) => handleNewRowChange(row.Prod_Id, 'Category', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Brand"
                        className="form-control"
                        value={row.Brand}
                        onChange={(e) => handleNewRowChange(row.Prod_Id, 'Brand', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <a
                        href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                        onClick={() => handleDeleteRow(row.Prod_Id)} >
                            <KTIcon iconName="trash" className="fs-3" />
                      </a>
                    </td>
                  {/* end::table-row */}
                  </tr>
                ))}
                {/* end::table-body */}
              </tbody>
              {/* end::table */}
            </table>
            {/* end::Menu 3 */}
          </div>
        {/* end::Menu 2 */}
        </div>
      {/* end::Menu */}
      </div>
      
      {/* add row button */}
      <button className="add-row-button" onClick={handleAddRow}>
        Add Row
      </button>

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
    {/* end::Header */}
    </div>
  );
};

export default AddMultiple;
