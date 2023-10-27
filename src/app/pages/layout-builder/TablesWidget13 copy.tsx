//Tableswidget13 copy.tsx

import React, { useState, useEffect, } from 'react'; // Import React and useState
import { useContext } from 'react';
import { KTIcon } from '../../../_metronic/helpers';
import { useNavigate, useParams, } from 'react-router-dom'; // Import the navigate function from your routing library
import { Projects } from '../Inventory/products'

type RowData = {
  Product: string;
  Dated: string;
  UoM: string;
  Quantity:number;
  Category: string;
};

type Props = {
  className: string;
};

const TablesWidget13: React.FC<Props> = ({ className }) => {

  const [tableData, setTableData] = useState<RowData[]>([]); // Initialize tableData as state
  const navigate = useNavigate();
  
  // Define a placeholder function to handle input changes
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedData = [...tableData];
    updatedData[index][field] = value;
    setTableData(updatedData);
  };

  // function to add rows
  const handleAddRow = () => {
    const newRow: RowData = {
      Product: '',
      Dated: '',
      UoM: '',
      Quantity: 1,
      Category: '',
    };
    setTableData([...tableData, newRow]);
    // Store updated data in local storage
    localStorage.setItem('sampleData', JSON.stringify([...tableData, newRow]));
  };

  const handleDeleteRow = (Product: string) => {
    // Filter out the row with the specified Product
    const updatedTableData = tableData.filter((row) => row.Product !== Product);
    setTableData(updatedTableData);
    // Update local storage after deleting a row
    localStorage.setItem('sampleData', JSON.stringify(updatedTableData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query parameters
    const queryParams = new URLSearchParams();
    for (const key in tableData[0]) {
      queryParams.append(key, tableData[0][key]);
    }
    // Navigate with query parameters
    navigate(`/builder?${queryParams.toString()}`);
  };

  // This will navigate back one step back
  const handleGoBack = () => {
    navigate(-1);
  };

  // To display the Prod_name in the product list from the localStorage
  const [prodNames, setProdNames] = useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem('sampleProdData');
      // fetch Prod_names
      if (storedData !== null) {
      const dataArray = JSON.parse(storedData);
      const namesArray = dataArray.map(item => item.Prod_Name);
      setProdNames(namesArray);
    }
  }, []);

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Add Products</span>
        </h3>
      </div>
      {/* end::Header */}
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
                    />
                  </div>
                </th>
                <th className='min-w-150px'>Product</th>
                <th className='min-w-120px'>Date</th>
                <th className='min-w-120px'>Category</th>
                <th className='min-w-100px'>UOM</th>
                <th className='min-w-100px'>Quantity</th>
                <th className='min-w-10px text-end'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {tableData.map((row, index) => (
                <tr key={row.Product}>
                  <td>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      <input
                        className='form-check-input widget-13-check'
                        type='checkbox'
                        value='1'
                      />
                    </div>
                  </td>
                  <td>
                  <select className='form-control'>
                    <option value="">Choose a Product</option>
                      {prodNames.map((prodName, index) => (
                        <option key={index} value={prodName}>
                        {prodName}
                        </option>
                      ))}
                  </select>   
                  </td>
                  <td>
                    <input
                      type='text'
                      className='form-control'
                      value={row.Dated}
                      onChange={(e) => handleInputChange(index, 'Dated', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      className='form-control'
                      name='Category'
                      value={row.Category}
                      onChange={(e) => handleInputChange(index, 'Category', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      className='form-control'
                      name='UoM'
                      value={row.UoM}
                      onChange={(e) => handleInputChange(index, 'UoM', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      className='form-control'
                      name='Quantity'
                      value={row.Quantity}
                      onChange={(e) => handleInputChange(index, 'Quantity', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      onClick={() => handleDeleteRow(row.Product)} >
                        <KTIcon iconName='trash' className='fs-3' />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* end::Table body */}
          </table>
          <button className="btn btn-primary mr-2" onClick={handleAddRow}>
            Add Row
          </button>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* end::Body */}
    </div>

  );
};

export { TablesWidget13 };


