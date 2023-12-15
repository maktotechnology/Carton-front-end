//UserDetailsPage.tsx

import { useState, useEffect, } from 'react';
import { useParams, useLocation, } from 'react-router-dom';


interface RowType {
  Prod_Id: number;
  Product: string;
  Dated: number;
  Uom: string;
  Quantity: number;
}

const UserDetailsPage = () => {

  const { search } = useLocation();

  // Parse URL parameters
  const queryParams = new URLSearchParams(search);
  const isEditMode = queryParams.get('editMode') === 'true';

  // Initialise parameters with UseParams
  const {  Ref_Id, Prod_Id, Request_risedby, Transfer_type, Branch, Department, Product, Dated, Uom, Quantity, } = useParams();

  //const { Ref_ID, Prod_Id, Request_risedby, Transfer_type, Branch, Department, Product, Dated, Uom, Quantity} = useParams();
  console.log('Values:', Ref_Id, Prod_Id, Request_risedby, Transfer_type, Branch, Department, Product, Dated, Uom, Quantity );
    
  // State to manage the editable values and edit mode
  const [editMode, setEditMode] = useState(isEditMode);

  // Initialise the state variables to edit 
  const [editedValues, setEditedValues] = useState({
      Prod_Id,
      Ref_Id,
      Request_risedby,
      Transfer_type,
      Branch,
      Department,
      Product,
      Dated,
      Uom,
      Quantity,
    }
  );
  console.log('EditedValues', editedValues);

  const [rowsByRefId, setRowsByRefId] = useState([]);

  useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem('productsData');
    const existingData = storedData ? JSON.parse(storedData) : [];
    // Log the existingData
    console.table(existingData);

    // Log the value and type of Ref_Id
    console.log('Ref_Id:', Ref_Id, typeof Ref_Id);

    console.log('Prod_Id:', Prod_Id, typeof Prod_Id);

    // Filter rows by Ref_Id
    const filteredData = existingData.filter((data) => data.Ref_Id.toString() === Ref_Id?.toString());

    console.log('Filtered', filteredData);
    // Set the filtered rows in state
    setRowsByRefId(filteredData);
  }, [Ref_Id]);

  console.log('rowsByRefId', rowsByRefId);
 
  // Function to toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Function to handle input changes
  const handleInputChange = (field, value: string | number) => {
    console.log('Before setting editedValues state:', editedValues);
    setEditedValues((prevValues) => ({...prevValues, [field]: value, }));
    console.log('after EditedValues: ', editedValues);
  };

  // SelectAll checkbox function
  const handleSelectAll = (event) => {
    const checkboxes = document.querySelectorAll('.widget-13-check');
    checkboxes.forEach((checkbox) => {
      const inputCheckbox = checkbox as HTMLInputElement; // Explicit cast to HTMLInputElement
      inputCheckbox.checked = event.target.checked;
    });
  };

  // Function to save edited values
  const handleSave = () => {
    // Retrieve existing data from local storage
    const storedData = localStorage.getItem('productsData');
    const existingData = storedData ? JSON.parse(storedData) : [];
    console.log('Existing Data:', existingData);
    // Find the index of the edited item using its Prod_Id
    const editedItemIndex = existingData.findIndex((data) => data.Prod_Id.toString() === Prod_Id?.toString());
    
    if (editedItemIndex !== -1) {
      // Update the values of the edited item
      const updatedItem = { ...existingData[editedItemIndex], ...editedValues };
      // Update the sampleData array with the updated item
      existingData[editedItemIndex] = updatedItem;
      // Update local storage with the updated sampleData
      localStorage.setItem('productsData', JSON.stringify(existingData));
      // Exit edit mode
      toggleEditMode();
    } else {
      console.log('Edited item not found in the existing data.');
    }
  };
  
  // This will navigate back one step in the browser's history
  const handleGoBack = () => {
    window.history.back(); 
  };


  return (
    // begin::div
    <div>
      <h2 className="text-center">Edit Details</h2>
      {/* begin::container */}
      <div className="card">
        {/* form::begin */}
        <form className="add-user-form">
          {/* begin::body */}
          <div className="card-body">
            {/* begin::row-1*/}
            <div className="form-group row">
              <div className="col-lg-6">
                <label>Request_risedby:</label>
                {/* Edit Request_risedby */}
                <p> {editMode ? (
                  <input
                    className='form-control'
                    type="text"
                    value={editedValues.Request_risedby}
                    onChange={(e) => handleInputChange('Request_risedby', e.target.value)}
                  />) : (Request_risedby)}
                </p>
              </div>
              <div className="col-lg-6">
                <label>Transfer_Type:</label>
                  {/* Edit Transfer_type */}
                  <p> {editMode ? 
                    <select 
                      className="round form-control"
                      value={editedValues.Transfer_type}
                      onChange={(e) => handleInputChange('Transfer_type', e.target.value)} 
                    >
                      <option></option>
                      <option value="Internal">Internal</option>
                      <option value="External">External</option>
                    </select>: Transfer_type}
                  </p>
              </div>
            {/* end::row-1 */}
            </div>
            {/* begin::row-2 */}
            <div className="form-group row">
              <div className="col-lg-6">
                <label>Branch:</label>
                  {/* Edit Branch */}
                  <p> {editMode ? 
                    <select
                      className="round form-control"
                      name="getBranch"
                      value={editedValues.Branch}
                      onChange={(e) => handleInputChange('Branch', e.target.value)} 
                    >
                      <option></option>
                      <option value="CBE">CBE</option>
                      <option value="MAS">MAS</option>
                    </select> : Branch}
                  </p>
              </div>
              <div className="col-lg-6">
                <label>Department:</label>
                {/* Edit Department */}
                <p> {editMode ? 
                  <select
                    className="round form-control"
                    name="getBranch"
                    value={editedValues.Department}
                    onChange={(e) => handleInputChange('Department', e.target.value)} 
                  >
                    <option></option>
                    <option value="Admin">Admin</option>
                    <option value="HR">HR</option>
                  </select> : Department}
                </p>  
              </div>
            {/* end::row-2 */}
            </div>
          {/* end::body */}
          </div>
        {/* end::form */}
        </form>

        {/* Edit Product details */}
        
        {/* begin::body */}
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
                  <th className='min-w-150px'>Product</th>
                  <th className='min-w-120px'>Date</th>
                  <th className='min-w-100px'>UOM</th>
                  <th className='min-w-100px'>Quantity</th>
                </tr>
              {/* end::Table head */}
              </thead> 
              {/* begin::Table body */}
              <tbody>
              {rowsByRefId.map((row: any, index) => (
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
                    {/* Edit Product */}
                    <p> {editMode ? 
                      <input 
                        className='form-control'
                        type="text"
                        value={row.Product}                     
                        onChange={(e) => handleInputChange('Product', e.target.value)} 
                      /> : row.Product}
                    </p>
                  </td>
                  <td>
                    {/* Edit Date */}
                    <p> {editMode ? 
                      <input 
                        className='form-control'
                        type="date"
                        value={row.Dated}
                        onChange={(e) => handleInputChange('Dated', e.target.value)}  
                      /> : row.Dated}
                    </p>
                  </td>
                  <td>
                    {/* Edit UOM */}
                    <p> {editMode ? 
                      <input 
                        className='form-control'
                        type="text"
                        value={row.Uom}
                        onChange={(e) => handleInputChange('Uom', e.target.value)}  
                      /> : row.Uom}
                    </p>
                  </td>
                  <td>
                    {/* Edit Quantity */}
                    <p> {editMode ? 
                      <input 
                        className='form-control'
                        type="number"
                        value={row.Quantity}
                        onChange={(e) => handleInputChange('Quantity', e.target.value)}  
                      /> : row.Quantity}
                    </p>
                  </td> 
                </tr>
                ))}
              {/* end::Table body */}
              </tbody>
            {/* end::Table */}
            </table>
          {/* end::Table container */}
          </div>
        {/* end::body */}
        </div>

        {/* Edit, Save and GoBack buttons */}
        {editMode ? (
          <>
            <div className="card-footer">
              <div className="row">
                <div className="col-lg-6 text-center">
                  <button className="btn btn-primary mr-2" onClick={handleSave}>Save</button>
                </div>
                <div className="col-lg-6 text-center">
                  <button className="btn btn-secondary" onClick={toggleEditMode}>Cancel</button>
                </div>
              </div>
            </div>
          </>
          ) : (
          <>
            <div className="card-footer">
              <div className="row">
                <div className="col-lg-6 text-center">
                  <button className="btn btn-primary mr-2" onClick={toggleEditMode}>Edit</button>
                </div>
                <div className="col-lg-6 text-center">
                  <button className="btn btn-secondary" onClick={handleGoBack}>Back</button>
                </div>
              </div>
            </div>
          </>
        )}
      {/* end::container */}
      </div>
    {/* end::div */}
    </div>
  );
};

export default UserDetailsPage;

