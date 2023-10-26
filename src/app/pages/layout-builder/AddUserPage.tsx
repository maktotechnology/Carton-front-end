// AddUserPage.tsx

import React, { useState } from 'react';
import { useNavigate,  } from 'react-router-dom';
import { KTIcon } from '../../../_metronic/helpers';
import './AddUserPage.css';
import {TablesWidget13,} from '../layout-builder/TablesWidget13 copy'

const AddUserPage  = () =>  {

  const navigate = useNavigate();

  // Creating a functional component 
  const [formData, setFormData] = useState({
    Ref_ID: Date.now(),
    Request_risedby: '',
    Transfer_type: '',
    Branch: '',
    Department: '',
    Product:'',
    Dated:'',
    Category: '',
    Uom:'',
    Quantity: 0,
    //Status: 'Draft',
  });
  
  // handling form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };  

  //Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Your form submission code here
      const queryParams = new URLSearchParams();
      for (const key in formData) {
        queryParams.append(key, formData[key]);
      }
      console.log('Data being sent:', queryParams.toString());
      // Navigate with query parameters
      navigate(`/builder?${queryParams.toString()}`);
    } 
    catch (error) {
      console.error('Error in handleSubmit:', error);
    }
    console.log('formdata: ', formData);
  };

  // Navigate back one step
  const handleGoBack = () => {
    navigate(-1);
  };


  return (
    // begin::div
    <div>
      {/* form::begin */}
      <form className="add-user-form">
        <h2 className="text-center">Material Requisition</h2>
        <br />

        {/* begin::body */}
        <div className="card-body">
          {/* begin::row-1*/}
          <div className="form-group row">
            <div className="col-lg-6">
              {/* Input for Request_risedby */}
              <label>Request_risedby:</label>
              <input
                type="text"
                className="form-control"
                name="Request_risedby"
                value={formData.Request_risedby}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-lg-6">
              {/* Input for Transfer_type */}
              <label>Transfer_type:</label>
              <select 
                className="round form-control"
                name="Transfer_type"
                value={formData.Transfer_type}
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
              {/* Input for Branch */}
              <label>Branch:</label>
              <div className="input-group">
                <select
                  className="round form-control"
                  name="Branch"
                  value={formData.Branch}
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
              {/* INput for Depatment */}
              <label>Department:</label>
              <div className="input-group">
                <select
                  className="round form-control"
                  name="Department"
                  value={formData.Department}
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
          {/* begin::row-3 */}
          <div className="form-group row"> 
            <div className="col-lg-6">
              <label>Product:</label>
              <div className="input-group">
                <select 
                  className="round form-control"
                  name="Product"
                  value={formData.Product}
                  onChange={handleChange}
                  required
                >
                  <option></option>
                  <option value="Y19">Vivo Y19</option>
                  <option value="Iphone15">Iphone15</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <label htmlFor="Ref_ID">Dated</label>
              <input
                type="date"
                className="form-control"
                name="Dated"
                value={formData.Dated}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-6">
              <label>UOM:</label>
              <input
                type="text"
                className="form-control"
                name="Uom"
                value={formData.Uom}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-lg-6">
              <label >Quantity:</label>
              <input
                type="number"
                className="form-control"
                name="Quantity"
                value={formData.Quantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        {/* end::body  */}
        </div>

        {/* to call the functionalities present in the Tableswidget13 component */}
        {/* <TablesWidget13 className="mb-5 mb-xl-8" /> */}

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
    {/* end::div */}
    </div>
  );
};

export default AddUserPage;

// // AddUserPage.tsx

// import React, { useState, useEffect } from 'react';
// import { useNavigate,} from 'react-router-dom';
// import { KTIcon } from '../../../_metronic/helpers';
// import './AddUserPage.css';
// import {TablesWidget13,} from '../layout-builder/TablesWidget13 copy'

// type RowData = {
//   Pro_Id: number;
//   Product: string;
//   Dated: string;
//   Uom: string;
//   Quantity: number;
//   Category: string;
// };

// const AddUserPage = () =>  {

//   const navigate = useNavigate();

//   const [tableData, setTableData] = useState<RowData[]>([]);

//   // Creating a functional component 
//   const [formData, setFormData] = useState({
//     Ref_ID: Date.now(),
//     Request_risedby: '',
//     Transfer_type: '',
//     Branch: '',
//     Department: '',
//     //Status: 'Draft',
//   });

//   // Handling table data changes
//   const handleTableDataChange = (data) => {
//     setTableData(data);
//   };
  
//   // handling form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//     console.log(formData);
//   };  

//   //Submit function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Your form submission code here
//       const queryParams = new URLSearchParams();
//       for (const key in formData) {
//         queryParams.append(key, formData[key]);
//       }
//       // Create an array to store the tableData values
//       const tableDataArray = [];
//       // Convert tableData to a flat structure and store it in tableDataObject
//       tableData.forEach((row, index) => {
//         for (const key in row) {
//           tableDataArray[`tableData[${index}][${key}]`] = row[key];
//         }
//       });
//       // Combine tableDataArray with other formData fields
//       const formDataWithTableData = {
//         ...formData,
//         ...tableDataArray,
//       };
//       console.log('Data being sent:', formDataWithTableData);
//       localStorage.setItem('productData', JSON.stringify(formDataWithTableData));
//       // Navigate with formDataWithTableData
//       navigate(`/builder?${new URLSearchParams(formDataWithTableData).toString()}`);
//     } 
//     catch (error) {
//       console.error('Error in handleSubmit:', error);
//     }
//     console.log('formdata: ', formData);

//   };
  
//   // Submit function
//   const handleSubmi = async (e) => {
//     e.preventDefault();
//     try {
//       // Your form submission code here
//       const queryParams = new URLSearchParams();
//       for (const key in formData) {
//         queryParams.append(key, formData[key]);
//       }
  
//       // Create an array to store the tableData values
//       const tableDataArray = {};
  
//       // Convert tableData to a flat structure and store it in tableDataArray
//       tableData.forEach((row, index) => {
//         for (const key in row) {
//           tableDataArray[`tableData[${index}][${key}]`] = row[key];
//         }
//       });
  
//       // Retrieve existing data from localStorage
//       const existingData = localStorage.getItem('productData');

//       // Check if existingData is a string before parsing it
//       const existingDataObject = typeof existingData === 'string' ? JSON.parse(existingData) : {};
  
//       // Merge the existing data with the new data
//       const updatedDataObject = { ...existingDataObject, ...formData, ...tableDataArray };
  
//       // Stringify the merged object back into a JSON string
//       const updatedDataString = JSON.stringify(updatedDataObject);
  
//       console.log('Data being sent:', updatedDataObject);
  
//       // Store the updated data back in localStorage
//       localStorage.setItem('productData', updatedDataString);
  
//       // Navigate with formDataWithTableData
//       navigate(`/builder?${new URLSearchParams(updatedDataObject).toString()}`);
//     } catch (error) {
//       console.error('Error in handleSubmit:', error);
//     }
//     console.log('formdata: ', formData);
//   };

//   // Navigate back one step
//   const handleGoBack = () => {
//     navigate(-1);
//   };


//   return (
//     // begin::div
//     <div>
//       {/* form::begin */}
//       <form className="add-user-form">
//         <h2 className="text-center">Material Requisition</h2>
//         <br />

//         {/* begin::body */}
//         <div className="card-body">
//           {/* begin::row-1*/}
//           <div className="form-group row">
//             <div className="col-lg-6">
//               {/* Input for Request_risedby */}
//               <label>Request_risedby:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="Request_risedby"
//                 value={formData.Request_risedby}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-lg-6">
//               {/* Input for Transfer_type */}
//               <label>Transfer_type:</label>
//               <select 
//                 className="round form-control"
//                 name="Transfer_type"
//                 value={formData.Transfer_type}
//                 onChange={handleChange}
//                 required
//               >
//                 <option></option>
//                 <option value="Internal">Internal</option>
//                 <option value="External">External</option>
//               </select>
//             </div>
//           {/* end::row-1 */}
//           </div>
//           {/* begin::row-2 */}
//           <div className="form-group row">
//             <div className="col-lg-6">
//               {/* Input for Branch */}
//               <label>Branch:</label>
//               <div className="input-group">
//                 <select
//                   className="round form-control"
//                   name="Branch"
//                   value={formData.Branch}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option></option>
//                   <option value="CBE">CBE</option>
//                   <option value="MAS">MAS</option>
//                 </select>
//               </div>
//             </div>
//             <div className="col-lg-6">
//               {/* INput for Depatment */}
//               <label>Department:</label>
//               <div className="input-group">
//                 <select
//                   className="round form-control"
//                   name="Department"
//                   value={formData.Department}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option></option>
//                   <option value="Admin">Admin</option>
//                   <option value="HR">HR</option>
//                 </select>
//               </div>
//             </div>
//           {/* end::row-2 */}
//           </div>
//         </div>

//         {/* to call the functionalities present in the Tableswidget13 component */}
//         <TablesWidget13 className="mb-5 mb-xl-8" tableData={tableData as RowData[]} 
//           onTableDataChange={handleTableDataChange}/>

//         {/* Save and Cancel buttons */}
//         <div className="card-footer">
//           <div className="row">
//             <div className="col-lg-6 text-center">
//               <button className="btn btn-primary mr-2" onClick={handleSubmit}>
//                 Save
//               </button>
//             </div>
//             <div className="col-lg-6 text-center">
//               <button className="btn btn-secondary" onClick={handleGoBack}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       {/* end::form */}
//       </form>
//     {/* end::div */}
//     </div>
//   );
// };

// export default AddUserPage;