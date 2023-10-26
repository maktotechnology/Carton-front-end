<<<<<<< HEAD
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
=======

//Tableswidget13 copy.tsx

import React, { useState, useEffect, } from 'react'; // Import React and useState
import { KTIcon } from '../../../_metronic/helpers';
//import { Projects } from '../Inventory/products'
import './AddUserPage.css';

type RowData = {
  Pro_Id: number;
  Product: string;
  Dated: string;
  Uom: string;
>>>>>>> mirudhulaa
  Quantity:number;
  Category: string;
};

type Props = {
<<<<<<< HEAD
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

=======
  className: string; 
  // Define the tableData prop
  tableData: RowData[]; 
  // Define the callback function to update table data
  onTableDataChange: (data: RowData[]) => void; };

const TablesWidget13: React.FC<Props> = ({ className, tableData, onTableDataChange }) => {
  
  // Define a placeholder function to handle input changes
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedData = [
      ...tableData
    ];
    updatedData[index][field] = value;
    //setTableData(updatedData);
    onTableDataChange(updatedData);
    console.log('tableData' ,tableData);
    console.log(updatedData);
  };

  // Function to add rows
  const handleAddRow = () => {
    const newRow: RowData = {
        Pro_Id: Date.now(),
        Product: '',
        Dated: '',
        Uom: '',
        Quantity: 0,
        Category: '',
    };
    const updatedData = [...tableData, newRow];
    console.log(tableData);
    //setTableData(updatedData);
    onTableDataChange(updatedData); 
    // Store updated data in local storage
    localStorage.setItem('materialData', JSON.stringify(updatedData));
  };
  
>>>>>>> mirudhulaa
  // To display the Prod_name in the product list from the localStorage
  const [prodNames, setProdNames] = useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem('sampleProdData');
      // fetch Prod_names
      if (storedData !== null) {
      const dataArray = JSON.parse(storedData);
      const namesArray = dataArray.map(item => item.Prod_Name);
      setProdNames(namesArray);
<<<<<<< HEAD
    }
  }, []);

=======
      console.log( dataArray.map(item => item.Prod_Name));

    }
  }, []);

   // Function to automatically generate the category for a product
  const getCategoryForProductName = (productName: string): string => {
    const storedData = localStorage.getItem('sampleProdData');
    if (storedData !== null) {
      const dataArray = JSON.parse(storedData);
      const matchingProduct = dataArray.find((item) => item.Prod_Name === productName);
      return matchingProduct ? matchingProduct.Category : '';
    }
    return '';
  };

  // Function to Increment the Quantity value when '+' button is pressed
  const handleIncrement = (index: number) => {
    const updatedData = [...tableData];
    updatedData[index].Quantity += 1;
    //setTableData(updatedData);
    onTableDataChange(updatedData); 
  };
  
  // Function to Increment the Quantity value when '-' button is pressed
  const handleDecrement = (index: number) => {
    const updatedData = [...tableData];
    if (updatedData[index].Quantity > 0) {
      updatedData[index].Quantity -= 1;
      //setTableData(updatedData);
      onTableDataChange(updatedData); 
    }
  };

  const handleDeleteRow = (Product_Id: number) => {
    // Filter out the row with the specified Product
    const updatedTableData = tableData.filter((row) => row.Pro_Id !== Product_Id);
    //setTableData(updatedTableData);
    onTableDataChange(updatedTableData); 
    // Update local storage after deleting a row
    localStorage.setItem('materialData', JSON.stringify(updatedTableData));
  };


>>>>>>> mirudhulaa
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Add Products</span>
        </h3>
<<<<<<< HEAD
      </div>
      {/* end::Header */}
=======
      {/* end::Header */}
      </div>
      
>>>>>>> mirudhulaa
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
<<<<<<< HEAD
=======
                {/* <th className='min-w-150px'>Product_Id</th> */}
>>>>>>> mirudhulaa
                <th className='min-w-150px'>Product</th>
                <th className='min-w-120px'>Date</th>
                <th className='min-w-120px'>Category</th>
                <th className='min-w-100px'>UOM</th>
                <th className='min-w-100px'>Quantity</th>
                <th className='min-w-10px text-end'>Actions</th>
              </tr>
<<<<<<< HEAD
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {tableData.map((row, index) => (
                <tr key={row.Product}>
                  <td>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
=======
            {/* end::Table head */}
            </thead>           
            {/* begin::Table body */}
            <tbody>
              {tableData.map((row, index) => (
                <tr key={row.Pro_Id}>
                  <td>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      {/* Insert Checkbox */}
>>>>>>> mirudhulaa
                      <input
                        className='form-check-input widget-13-check'
                        type='checkbox'
                        value='1'
                      />
                    </div>
                  </td>
                  <td>
<<<<<<< HEAD
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
=======
                    {/* Display the Product list in the Inventory which automatically generates its Category */}
                    <select className='form-control custom-select' 
                      onChange={(e) => {
                        const productName = e.target.value;
                        const category = getCategoryForProductName(productName);
                        handleInputChange(index, 'Product', productName);
                        handleInputChange(index, 'Category', category);
                      }} >
                      <option value="">Choose a Product</option>
                      { prodNames
                        // Remove duplicated Product names 
                        .filter((prodName, index, array) => array.indexOf(prodName) === index)
                        .map((prodName, index) => (
                        <option key={index} value={prodName}>
                          {prodName}
                        </option>
                      ))}
                    </select>   
                  </td>
                  <td>
                    {/* Make date as input format */}
                    <input
                      type='date'
>>>>>>> mirudhulaa
                      className='form-control'
                      value={row.Dated}
                      onChange={(e) => handleInputChange(index, 'Dated', e.target.value)}
                      required
                    />
                  </td>
                  <td>
<<<<<<< HEAD
=======
                    {/* Input for Category */}
>>>>>>> mirudhulaa
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
<<<<<<< HEAD
                    <input
                      type='text'
                      className='form-control'
                      name='UoM'
                      value={row.UoM}
                      onChange={(e) => handleInputChange(index, 'UoM', e.target.value)}
=======
                    {/* Input for Uom */}
                    <input
                      type='text'
                      className='form-control'
                      name='Uom'
                      value={row.Uom}
                      onChange={(e) => handleInputChange(index, 'Uom', e.target.value)}
>>>>>>> mirudhulaa
                      required
                    />
                  </td>
                  <td>
<<<<<<< HEAD
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
=======
                    {/* Making the Increment/Decrement as +/- for Quantity */}
                    <div className="Quantity">
                      <input
                        type="text"
                        className="form-control"
                        value={tableData[index].Quantity.toString()}
                        onChange={(e) => { const updatedData = [...tableData];
                          updatedData[index].Quantity = parseInt( e.target.value, 10 ); 
                          //setTableData(updatedData);
                          onTableDataChange(updatedData); 
                        }} 
                        required
                      />
                      <div className="Quantity-nav">
                        {/* Increment button */}
                        <div className="Quantity-button Quantity-up"
                          onClick={() => handleIncrement(index)} >
                          <b>+</b>
                        </div>
                      </div>
                      <div className="Quantity-nav">
                        {/* Decrement button */}
                        <div className="Quantity-button Quantity-down"
                          onClick={() => handleDecrement(index)} >
                          <b>-</b>
                        </div>
                      </div>
                    </div>  
                  </td>
                  <td>
                    {/* Insert a button to delete the row */}
                    <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      onClick={() => handleDeleteRow(row.Pro_Id)} >
>>>>>>> mirudhulaa
                        <KTIcon iconName='trash' className='fs-3' />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* end::Table body */}
          </table>
<<<<<<< HEAD
=======
          {/* Insert a button to Add Row */}
>>>>>>> mirudhulaa
          <button className="btn btn-primary mr-2" onClick={handleAddRow}>
            Add Row
          </button>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* end::Body */}
    </div>
<<<<<<< HEAD

=======
>>>>>>> mirudhulaa
  );
};

export { TablesWidget13 };


