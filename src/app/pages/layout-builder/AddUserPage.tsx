// AddUserPage.tsx

import { useState, useEffect } from 'react';
import { useNavigate,} from 'react-router-dom';
import { KTIcon } from '../../../_metronic/helpers';
import './AddUserPage.css';

type RowData = {
  Prod_Id: number;
  Ref_Id: number;
  Request_risedby: string;
  Transfer_type: string;
  Branch: string;
  Department: string;
  Product: string;
  Dated: number;
  Uom: string;
  Quantity: number;
  Category: string;
};

const AddUserPage = () =>  {

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<RowData[]>([]);

  // Creating a functional component 
  const [formData, setFormData] = useState({
    getRef_Id: Date.now(),
    getRequest_risedby: '',
    getTransfer_Type: '',
    getBranch: '',
    getDepartment: '',
    //Status: 'Draft',
  });
  
  // Handling form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };  

  // Function to add rows
  const handleAddRow = () => {
    const newRow: RowData = {
        Prod_Id: Date.now(),
        Ref_Id: formData.getRef_Id,
        Request_risedby: formData.getRequest_risedby,
        Transfer_type: formData.getTransfer_Type,
        Branch: formData.getBranch,
        Department: formData.getDepartment,
        Product: '',
        Dated: 0,
        Category: '',
        Uom: '',
        Quantity: 0,
    };
    //setSerialNumber((prevNumber) => prevNumber + 1);
    const updatedData = [...tableData, newRow];
    // Update the data on setTableData
    setTableData(updatedData);
  };

  // Define a placeholder function to handle input changes
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedData = [
      ...tableData
    ];
    updatedData[index][field] = value;
    setTableData(updatedData);
    console.table(updatedData); // Display the tabledata in a table
    
  };

  // To display the Prod_name in the product list from the localStorage
  const [prodNames, setProdNames] = useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem('sampleProdData');
      // Fetch all the Prod_Name from the Inventory
      if (storedData !== null) {
      const dataArray = JSON.parse(storedData);
      const namesArray = dataArray.map(item => item.Prod_Name);
      // Update the data to namesArray
      setProdNames(namesArray);
    }
  }, []);

   // Function to automatically generate the category for a product
  const getCategoryForProductName = (productName: string): string => {
    const storedData = localStorage.getItem('sampleProdData');
    if (storedData !== null) {
      const dataArray = JSON.parse(storedData);
      // If Prod_name is present in the Inventory display its matching Category
      const matchingProduct = dataArray.find((item) => item.Prod_Name === productName);
      return matchingProduct ? matchingProduct.Category : '';
    }
    return '';
  };

  // Function to Increment the Quantity value when '+' button is pressed
  const handleIncrement = (index: number) => {
    const updatedData = [...tableData];
    updatedData[index].Quantity += 1;
    setTableData(updatedData); 
  };
  
  // Function to Increment the Quantity value when '-' button is pressed
  const handleDecrement = (index: number) => {
    const updatedData = [...tableData];
    if (updatedData[index].Quantity > 0) {
      updatedData[index].Quantity -= 1;
      setTableData(updatedData);
    }
  };

  //Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Your form submission code here
      const queryParams = new URLSearchParams();
      // Iterate through each row in the tableData
      for (const row of tableData) {
        // Iterate through each key in the row (e.g., 'Prod_Id', 'Prod_Name', etc.)
        console.log(tableData);
        for (const key in row) {
          // Append a query parameter for each key-value pair in the row
          queryParams.append(`tableData_${row.Ref_Id}_${key}`, row[key]);
        }
      }
      // Retrieve the existing 'sampleProddata' data from local storage
      const existingData = JSON.parse(localStorage.getItem('productsData') || '[]');
      // Merge the existing data with the new data
      const mergedData = [...existingData, ...tableData];
      // Update the 'sampleProdData' in local storage with the merged data
      localStorage.setItem('productsData', JSON.stringify(mergedData));
      // Navigate with the URL containing both formData and tableData
      navigate(`/builder?${queryParams.toString()}`);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };  

  // Function to delete the row of data
  const handleDeleteRow = (Product_Id: number) => {
    // Filter out the row with the specified Product
    const updatedTableData = tableData.filter((row) => row.Prod_Id !== Product_Id);
    setTableData(updatedTableData);
    // Update local storage after deleting a row
    localStorage.setItem('productsData', JSON.stringify(updatedTableData));
  };

  // Navigate back one step
  const handleGoBack = () => {
    navigate(-1);
  };


  return (
    // begin::div
    <div>
      <h2 className="text-center">Material Requisition</h2>
      {/* begin::container */}
      <div className="card">
        {/* form::begin */}
        <form className="add-user-form">
          {/* begin::body */}
          <div className="card-body">
            {/* begin::row-1*/}
            <div className="form-group row">
              <div className="col-lg-6">
                {/* Input for getRequest_risedby */}
                <label>Request_risedby:</label>
                <input
                  type="text"
                  className="form-control"
                  name="getRequest_risedby"
                  value={formData.getRequest_risedby}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-lg-6">
                {/* Input for getTransfer_Type */}
                <label>Transfer_Type:</label>
                <select 
                  className="round form-control"
                  name="getTransfer_Type"
                  value={formData.getTransfer_Type}
                  onChange={handleChange}
                  required
                >
                  <option></option>
                  <option value="Internal">Internal</option>
                  <option value="External">External</option>
                </select>
              </div>
            {/* end::row-1 */}
            </div>
            {/* begin::row-2 */}
            <div className="form-group row">
              <div className="col-lg-6">
                {/* Input for getBranch */}
                <label>Branch:</label>
                <div className="input-group">
                  <select
                    className="round form-control"
                    name="getBranch"
                    value={formData.getBranch}
                    onChange={handleChange}
                    required
                  >
                    <option></option>
                    <option value="CBE">CBE</option>
                    <option value="MAS">MAS</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                {/* Input for getDepartment */}
                <label>Department:</label>
                <div className="input-group">
                  <select
                    className="round form-control"
                    name="getDepartment"
                    value={formData.getDepartment}
                    onChange={handleChange}
                    required
                  >
                    <option></option>
                    <option value="Admin">Admin</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
              </div>
            {/* end::row-2 */}
            </div>
          </div>

          {/* Start adding the Products details under the entered Ref_ID */}

          {/* beding::Header */}
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>Add Products</span>       
            </h3>
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
                {/* end::Table head */}
                </thead>           
                {/* begin::Table body */}
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={row.Prod_Id}>
                      <td>
                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                          {/* Insert Checkbox */}
                          <input
                            className='form-check-input widget-13-check'
                            type='checkbox'
                            value='1'
                          />
                        </div>
                      </td>
                      <td>
                        {/* Display the Product list in the Inventory which automatically generates its Category */}
                        <select 
                          className='form-control custom-select' 
                          onChange={(e) => {
                            const productName = e.target.value;
                            const category = getCategoryForProductName(productName);
                            handleInputChange(index, 'Product', productName);
                            handleInputChange(index, 'Category', category);
                          }} required >
                          <option value=""></option>
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
                          className='form-control'
                          value={row.Dated}
                          onChange={(e) => handleInputChange(index, 'Dated', e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        {/* Input for Category */}
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
                        {/* Input for Uom */}
                        <input
                          type='text'
                          className='form-control'
                          name='Uom'
                          value={row.Uom}
                          onChange={(e) => handleInputChange(index, 'Uom', e.target.value)}
                          required
                        />  
                      </td>
                      <td>
                        {/* Making the Increment/Decrement as +/- for Quantity */}
                        <div className="Quantity">
                          <input
                            type="text"
                            className="form-control"
                            value={tableData[index].Quantity.toString()}
                            onChange={(e) => { const updatedData = [...tableData];
                              updatedData[index].Quantity = parseInt( e.target.value, 10 ); 
                              setTableData(updatedData);
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
                          onClick={() => handleDeleteRow(row.Prod_Id)} >
                            <KTIcon iconName='trash' className='fs-3' />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* end::Table body */}
              </table>
              {/* Insert a button to Add Row */}
              <button className="btn btn-primary mr-2" onClick={handleAddRow}>
                Add Row
              </button>
              {/* end::Table */}
            </div>
            {/* end::Table container */}
          </div>

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
        {/* end::form */}
        </form>
      {/* end::container */}
      </div>
    {/* end::div */}
    </div>
  );
};

export default AddUserPage;
