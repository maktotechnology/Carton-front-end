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
      const inputCheckbox = checkbox as HTMLInputElement;
      inputCheckbox.checked = e.target.checked;
    });
  };

  const [tableData, setTableData] = useState([
    {
      Prod_Id: Date.now(),
      Prod_Name: '',
      UoM: '',
      Category: '',
      Brand: '',
    },
  ]);

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

  const handleAddRow = () => {
    const newRowId = Date.now();
    const newRow = {
      Prod_Id: newRowId,
      Prod_Name: '',
      UoM: '',
      Category: '',
      Brand: '',
    };
    setTableData([...tableData, newRow]);

    // Store updated data in local storage
    localStorage.setItem('sampleProdData', JSON.stringify([...tableData, newRow]));
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
    e.preventDefault();

    // Build query parameters
    const queryParams = new URLSearchParams();

    for (const row of tableData) {
      for (const key in row) {
        queryParams.append(`sampleProdData_${row.Prod_Id}_${key}`, row[key]);
      }
    }

    // Update the URL with the query parameters
    navigate(`/inventory?${queryParams.toString()}`);

    // Store the data in another layout 
    const newData: Array<{ [key: string]: any }> = [];
    for (const row of tableData) {
      const newRow: { [key: string]: any } = {}; // Explicitly define the type
      for (const key in row) {
        newRow[key] = row[key];
      }
      newData.push(newRow);
    }

    // Pass the data to the inventory component using React Router state
    navigate('/inventory', { state: { data: newData } });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="card-footer">
      <h1 className="card-title align-items-start flex-column" style={{ alignItems: 'center', fontSize: '16px' }}>
        Add Multiple Products
      </h1>

      <div>
        <div className="card-body py-3">
          <div className="table-container">
            <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
              <thead>
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
                  <th className="head-style" style={{ color: 'gray' }}><b>Product_Name</b></th>
                  <th className="head-style" style={{ color: 'gray' }}><b>UOM</b></th>
                  <th className="head-style" style={{ color: 'gray' }}><b>Category</b></th>
                  <th className="head-style" style={{ color: 'gray' }}><b>Brand</b></th>
                  <th style={{ color: 'gray' }}><b>Action</b></th>
                </tr>
              </thead>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <button className="add-row-button" onClick={handleAddRow}>
        Add Row
      </button>

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

export default AddMultiple;











/*

import React, { useState, useEffect } from 'react';
import { KTIcon } from '../../../_metronic/helpers';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddProductPage.css';

const AddMultiple = () => {
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

  const [tableData, setTableData] = useState([
    {
      Prod_Id: Date.now(),
      Prod_Name: '',
      UoM: '',
      Category: '',
      Brand: '',
    },
  ]);

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

  const handleAddRow = () => {
    const newRowId = Date.now();
    const newRow = {
      Prod_Id: newRowId,
      Prod_Name: '',
      UoM: '',
      Category: '',
      Brand: '',
    };
    setTableData([...tableData, newRow]);

    // Store updated data in local storage
    localStorage.setItem('sampleProdData', JSON.stringify([...tableData, newRow]));
  };

  useEffect(() => {
    const storedData = localStorage.getItem('sampleProdData');
    if (storedData) {
      setTableData(JSON.parse(storedData));
    }
  }, []);

  const handleDeleteRow = (Prod_Id) => {
    // Filter out the row with the specified Prod_Id
    const updatedTableData = tableData.filter((row) => row.Prod_Id !== Prod_Id);
    setTableData(updatedTableData);

    // Update local storage after deleting a row
    localStorage.setItem('sampleProdData', JSON.stringify(updatedTableData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build query parameters
    const queryParams = new URLSearchParams();

    for (const key in formData) {
      queryParams.append(key, formData[key]);
    }
    for (const row of tableData) {
      for (const key in row) {
        queryParams.append(`table_${row.Prod_Id}_${key}`, row[key]);
      }
    }

    // Navigate with query parameters
    navigate(`/inventory?${queryParams.toString()}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="card-footer">
      <h1 className="card-title align-items-start flex-column" style={{ alignItems: 'center', fontSize: '16px' }}>
        Add Multiple Product Details
      </h1>

      <div>
        <div className="card-body py-3">
          <div className="table-container">
            <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
              <thead>
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
                  <th className="head-style" style={{ color: 'gray' }}><b>Product_Name</b></th>
                  <th className="head-style" style={{ color: 'gray' }}><b>UOM</b></th>
                  <th className="head-style" style={{ color: 'gray' }}><b>Category</b></th>
                  <th className="head-style" style={{ color: 'gray' }}><b>Brand</b></th>
                  <th style={{ color: 'gray' }}><b>Action</b></th>
                </tr>
              </thead>
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
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                        onClick={() => handleDeleteRow(row.Prod_Id)}
                      >
                        <KTIcon iconName="trash" className="fs-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <button className="add-row-button" onClick={handleAddRow}>
    Add Row
  </button>

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

export default AddMultiple;

*/




/*
import React, { useState, useEffect } from 'react';
import { KTIcon } from '../../../_metronic/helpers';
import { Link, Route, Routes, useLocation, useNavigate, } from 'react-router-dom';
import { getLayoutFromLocalStorage, ILayout, LayoutSetup } from '../../../_metronic/layout/core';
import './AddProductPage.css';
import { Projects } from '../Inventory/products';

const AddMultiple = () =>{

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

  const [tableData, setTableData] = useState([
    {
      Prod_Id: Date.now(),
      Prod_Name: '',
      UoM: '',
      Category: '',
      Brand: '',
    },
  ]);

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

  const handleAddRow = () => {
    const newRowId = Date.now();
    const newRow = {
      Prod_Id: newRowId,
      Prod_Name: '',
      UoM: '',
      Category: '',
      Brand: '',
    };
    setTableData([...tableData, newRow]);

    // Store updated data in local storage
    localStorage.setItem('sampleProdData', JSON.stringify([...tableData, newRow]));
  };

  useEffect(() => {
    const storedData = localStorage.getItem('sampleProdData');
    if (storedData) {
      setTableData(JSON.parse(storedData));
    }
  }, []);

  const handleDeleteRow = (Prod_Id) => {
    // Filter out the row with the specified Prod_Id
    const updatedTableData = tableData.filter((row) => row.Prod_Id !== Prod_Id);
    setTableData(updatedTableData);
  
    // Update local storage after deleting a row
    localStorage.setItem('sampleProdData', JSON.stringify(updatedTableData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Build query parameters
    const queryParams = new URLSearchParams();
  
    for (const key in formData) {
      queryParams.append(key, formData[key]);
    }
    for (const row of tableData) {
      for (const key in row) {
        queryParams.append(`table_${row.Prod_Id}_${key}`, row[key]);
      }
    }
  
    // Navigate with query parameters
    navigate(`/inventory?${queryParams.toString()}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  

    return(

        <div className="card-footer">
          <h1 className="card-title align-items-start flex-column" style={{ alignItems: 'center', fontSize: '16px' }}>
            Add Multiple Product Details
          </h1>

          <div>
            <div className="card-body py-3">
              <div className="table-container">
                <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                  <thead>
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
                      <th className="head-style" style={{ color: 'gray' }} ><b>Product_Name</b></th>
                      <th className="head-style" style={{ color: 'gray' }} ><b>UOM</b></th>
                      <th className="head-style" style={{ color: 'gray' }} ><b>Category</b></th>
                      <th className="head-style" style={{ color: 'gray' }} ><b>Brand</b></th>
                      <th style={{ color: 'gray' }} ><b>Action</b></th>
                    </tr>
                  </thead>
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
                            name="Prod_Name"
                            value={row.Prod_Name}
                            onChange={(e) => handleNewRowChange(row.Prod_Id, 'Prod_Name', e.target.value)}
                            required />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="UoM"
                            value={row.UoM}
                            onChange={(e) => handleNewRowChange(row.Prod_Id, 'UoM', e.target.value)}
                            required />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="Category"
                            value={row.Category}
                            onChange={(e) => handleNewRowChange(row.Prod_Id, 'Category', e.target.value)}
                            required />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="Brand"
                            className="form-control"
                            value={row.Brand}
                            onChange={(e) => handleNewRowChange(row.Prod_Id, 'Brand', e.target.value)}
                            required />
                        </td>
                        <td>
                          <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                            onClick={() => handleDeleteRow(row.Prod_Id)}>
                              <KTIcon iconName='trash' className='fs-3' />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </form>

      <button className="add-row-button" onClick={handleAddRow}>
        Add Row
      </button>

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

export default AddMultiple;


*/



/*
  const handleSubmit = (e) => {
    e.preventDefault();
    // Build query parameters
    const queryParams = new URLSearchParams();

    for (const row of tableData) {
      for (const key in row) {
        queryParams.append(`table_${row.Prod_Id}_${key}`, row[key]);
      }
    }
    // Navigate with query parameters
    navigate(`/inventory?${queryParams.toString()}`);

    const newData = [];
    for (const row of tableData) {
      const newRow = {} as { [key: string]: any };
      for (const key in row) {
        newRow[key] = row[key];
      }
      newData.push(newRow);
    }

    // Pass the data to the "otherLayout" component using React Router state
    navigate('/inventory', { state: { data: newData } });
  };

  */