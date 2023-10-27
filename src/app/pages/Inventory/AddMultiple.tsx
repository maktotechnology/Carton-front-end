//AddMultiple.tsx

import React, { useState, useEffect } from 'react';
import { KTIcon } from '../../../_metronic/helpers';
import { useNavigate, } from 'react-router-dom';
import { Projects } from '../Inventory/products';
import './AddProductPage.css';


const AddMultiple = () => {
  const navigate = useNavigate();
  
  // SelectAll checkBox Function
  const handleSelectAll = (e) => {
    const checkboxes = document.querySelectorAll('.product-check');

    checkboxes.forEach((checkbox) => {
      const inputCheckbox = checkbox as HTMLInputElement; // Explicit cast to HTMLInputElement
      inputCheckbox.checked = e.target.checked;
    });
  };

  // Initialize tableData with default value
  const [tableData, setTableData] = useState([
    {
      Prod_Id: Date.now(),
      Prod_Name: '',
      UoM: '',
      Category: '',
      Brand: '',
    },
  ]);
  console.log(tableData);

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
    setTableData([...updatedTableData]);
  };

  // Function to add a new row to the tableData state
  const handleAddRow = () => {
    const newRow = {
      Prod_Id: Date.now(),
      Prod_Name: '',
      UoM: '',
      Category: '',
      Brand: '',
    };
    // Update the state with the new data, effectively adding a new row
    setTableData([...tableData, newRow]);
    console.log(newRow);
  };

  const handleDeleteRow = (Prod_Id) => {
    // Filter out the row with the specified Prod_Id
    const updatedTableData = tableData.filter((row) => row.Prod_Id !== Prod_Id);
    // Update local storage after deleting a row
    localStorage.setItem('sampleProd', JSON.stringify(updatedTableData));
    // Update the data in the context
    setTableData(updatedTableData);
  };

  // Function to submit the form and pass data to the inventory page
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    const queryParams = new URLSearchParams();

    // Iterate through each row in the tableData
    for (const row of tableData) {
      // Iterate through each key in the row (e.g., 'Prod_Id', 'Prod_Name', etc.)
      for (const key in row) {
        // Append a query parameter for each key-value pair in the row
        queryParams.append(`sampleProdData_${row.Prod_Id}_${key}`, row[key]);
      }
    }
    // Retrieve the existing 'sampleProddata' data from local storage
    const existingData = JSON.parse(localStorage.getItem('sampleProdData') || '[]');
    // Merge the existing data with the new data
    const mergedData = [...existingData, ...tableData];
    // Update the 'sampleProdData' in local storage with the merged data
    localStorage.setItem('sampleProdData', JSON.stringify(mergedData));
    // Navigate to the 'inventory' page with the query parameters in the URL
    navigate(`/inventory?${queryParams.toString()}`);
    console.table(mergedData);
  };

  // Navigate one step back
  const handleGoBack = () => {
    navigate(-1);
  };

  // Use an effect to update local storage whenever tableData changes
  useEffect(() => {
    // Convert the tableData array to a JSON string and store it in local storage
    localStorage.setItem('sampleProd', JSON.stringify(tableData));
    // Whenever a new row is added, also save that new data to local storage
    const addedRow = tableData[tableData.length - 1]; // Get the last added row
    if (addedRow) {
      localStorage.setItem('sampleProdData_' + addedRow.Prod_Id, JSON.stringify(addedRow));
    }
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
                  {/* <th className="head-style" style={{ color: 'gray' }}><b>Product_Id</b></th> */}
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
                  <tr key={(row.Prod_Id)}> 
                    <td>
                      <div className="form-check form-check-sm form-check-custom form-check-solid">
                        <input className="form-check-input product-check" type="checkbox" value="1" />
                      </div>
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
                        className="form-control "
                        value={row.Brand}
                        onChange={(e) => handleNewRowChange(row.Prod_Id, 'Brand', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      {/* Insert a button to Delete row */}
                      <a href="#" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
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

      {/* Add row button */}
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