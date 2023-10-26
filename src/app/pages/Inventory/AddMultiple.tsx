import React, { useState, useEffect } from 'react';
import { KTIcon } from '../../../_metronic/helpers';
import { useNavigate } from 'react-router-dom';
import { Projects } from '../Inventory/products';
import './AddProductPage.css';


const AddMultiple = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    {
      Prod_Id: Date.now(),
      Prod_Name: '',
      UoM: '',
      Category: '',
      Brand: '',
    },
  ]);

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        Prod_Id: Date.now(),
        Prod_Name: '',
        UoM: '',
        Category: '',
        Brand: '',
      },
    ]);
  };

  const handleRowChange = (index, name, value) => {
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      [name]: value,
    };
    setRows(updatedRows);
  };

  const handleSubmit = () => {
    const queryParams = new URLSearchParams();
    rows.forEach((row, index) => {
      for (const key in row) {
        console.log(`${key}[]`, row[key])
        queryParams.append(`${key}`, row[key]);
      }
    });
    navigate(`/inventory?${queryParams.toString()}`);
  };

  return (
    <div>
      <form className="product-form">
        <h3 className="card-title align-items-start flex-column">
          <div className="card-label fw-bold fs-3 mb-1" style={{ textAlign: 'center' }}>
            Enter Product Details
          </div>
        </h3>
        <br />

        {rows.map((row, index) => (
          <div key={row.Prod_Id} className="card-body">
            <div className="form-group row">
              <div className="col-lg-6">
                <label>Prod_Id:</label>
                <input
                  type="text"
                  className="form-control"
                  name={`Prod_Id[${index}]`}
                  value={row.Prod_Id}
                  readOnly
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-lg-6">
                <label>Prod_Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name={`Prod_Name[${index}]`}
                  value={row.Prod_Name}
                  onChange={(e) => handleRowChange(index, 'Prod_Name', e.target.value)}
                  required
                />
              </div>
              <div className="col-lg-6">
                <label>UOM:</label>
                <input
                  type="text"
                  className="form-control"
                  name={`UoM[${index}]`}
                  value={row.UoM}
                  onChange={(e) => handleRowChange(index, 'UoM', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-lg-6">
                <label>Category:</label>
                <input
                  type="text"
                  className="form-control"
                  name={`Category[${index}]`}
                  value={row.Category}
                  onChange={(e) => handleRowChange(index, 'Category', e.target.value)}
                  required
                />
              </div>
              <div className="col-lg-6">
                <label>Brand:</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name={`Brand[${index}]`}
                    value={row.Brand}
                    onChange={(e) => handleRowChange(index, 'Brand', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button className="btn btn-primary" onClick={handleAddRow}>
          Add Row
        </button>

        <div className="card-footer">
          <div className="row">
            <div className="col-lg-6 text-center">
              <button className="btn btn-primary mr-2" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMultiple;

