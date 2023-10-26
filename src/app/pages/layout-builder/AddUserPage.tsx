<<<<<<< HEAD
// // AddUserPage.tsx

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
=======
// AddUserPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate,} from 'react-router-dom';
import { KTIcon } from '../../../_metronic/helpers';
import './AddUserPage.css';
import {TablesWidget13,} from '../layout-builder/TablesWidget13 copy'

type RowData = {
  Pro_Id: number;
  Product: string;
  Dated: string;
  Uom: string;
  Quantity: number;
  Category: string;
};

const AddUserPage = () =>  {

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<RowData[]>([]);

  // Creating a functional component 
  const [formData, setFormData] = useState({
    Ref_ID: Date.now(),
    Request_risedby: '',
    Transfer_type: '',
    Branch: '',
    Department: '',
    //Status: 'Draft',
  });

  // Handling table data changes
  const handleTableDataChange = (data) => {
    setTableData(data);
  };
  
  // handling form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };  

  //Submit function
  const handleSubmi = async (e) => {
    e.preventDefault();
    try {
      // Your form submission code here
      const queryParams = new URLSearchParams();
      // Create an array to store the tableData values
      const tableDataArray = [];
      for (const key in formData) {
        queryParams.append(key, formData[key]);
        // Convert tableData to a flat structure and store it in tableDataObject
        tableData.forEach((row, index) => {
          for (const key in row) {
            tableDataArray[`tableData[${index}][${key}]`] = row[key];
          }
        });
      }
      // Combine tableDataArray with other formData fields
      const formDataWithTableData = {
        ...formData,
        ...tableDataArray,
      };
      console.log('Data being sent:', formDataWithTableData);
      localStorage.setItem('productData', JSON.stringify(formDataWithTableData));
      // Navigate with formDataWithTableData
      navigate(`/builder?${new URLSearchParams(formDataWithTableData).toString()}`);
    } 
    catch (error) {
      console.error('Error in handleSubmit:', error);
    }
    console.log('formdata: ', formData);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Your form submission code here
      const queryParams = new URLSearchParams();
      const tableDataArray = [];
      for (const key in formData) {
        queryParams.append(key, formData[key]);
        // Convert tableData to a flat structure and store it in tableDataObject
        tableData.forEach((row, index) => {
          for (const key in row) {
            tableDataArray[`tableData[${index}][${key}]`] = row[key];
          }
        });
      }
      // Check if 'productData' exists in localStorage and parse it
      const storedData = localStorage.getItem('productData');
      const existingData = storedData ? JSON.parse(storedData) : {};
  
      // Combine the existing data with the new data
      const formDataWithTableData = {
        ...existingData,
        ...formData,
        ...tableDataArray,
      };
  
      console.log('Data being sent:', formDataWithTableData);
      
      // Store the merged data back in localStorage
      localStorage.setItem('productData', JSON.stringify(formDataWithTableData));
  
      // Navigate with formDataWithTableData
      navigate(`/builder?${new URLSearchParams(formDataWithTableData).toString()}`);
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
        </div>

        {/* to call the functionalities present in the Tableswidget13 component */}
        <TablesWidget13 className="mb-5 mb-xl-8" tableData={tableData as RowData[]} 
          onTableDataChange={handleTableDataChange}/>

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

// import React, { useState } from 'react';
// import { useNavigate,  } from 'react-router-dom';
>>>>>>> mirudhulaa
// import { KTIcon } from '../../../_metronic/helpers';
// import './AddUserPage.css';
// import {TablesWidget13,} from '../layout-builder/TablesWidget13 copy'

<<<<<<< HEAD
// //an object with four properties
// type RowData = {
//   Product: string;
//   Dated: string;
//   UoM: string;
//   Category: string;
// };

// const AddUserPage  = () =>  {

//   const navigate = useNavigate();
//   // Initialize tableData as state
//   const [tableData, setTableData] = useState<RowData[]>([]); 
  
//   // creating a functional component 
//   const [formData, setFormData] = useState({
//     Ref_ID: '',
=======
// const AddUserPage  = () =>  {

//   const navigate = useNavigate();

//   // Creating a functional component 
//   const [formData, setFormData] = useState({
//     Ref_ID: Date.now(),
>>>>>>> mirudhulaa
//     Request_risedby: '',
//     Transfer_type: '',
//     Branch: '',
//     Department: '',
//     Product:'',
<<<<<<< HEAD
//     Status: 'Draft',
//   });

=======
//     Dated:'',
//     Category: '',
//     Uom:'',
//     Quantity: 0,
//     //Status: 'Draft',
//   });
  
>>>>>>> mirudhulaa
//   // handling form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
<<<<<<< HEAD
//   };

//   // function to add rows when addRow button is clicked
//   const handleAddRow = () => {
//     const newRow: RowData = {
//       Product: '',
//       Dated: '',
//       UoM: '',
//       Category: '',
//     };
//     setTableData([...tableData, newRow]);

//     // Store updated data in local storage
//     localStorage.setItem('sampleData', JSON.stringify([...tableData, newRow]));
//   };
=======
//     console.log(formData);
//   };  
>>>>>>> mirudhulaa

//   //Submit function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
<<<<<<< HEAD
  
=======
>>>>>>> mirudhulaa
//     try {
//       // Your form submission code here
//       const queryParams = new URLSearchParams();
//       for (const key in formData) {
//         queryParams.append(key, formData[key]);
//       }
<<<<<<< HEAD
=======
//       console.log('Data being sent:', queryParams.toString());
>>>>>>> mirudhulaa
//       // Navigate with query parameters
//       navigate(`/builder?${queryParams.toString()}`);
//     } 
//     catch (error) {
//       console.error('Error in handleSubmit:', error);
//     }
<<<<<<< HEAD
//   };

//   // deleting the row
//   const handleDeleteRow = (Product: string) => {
//     // Filter out the row with the specified Product
//     const updatedTableData = tableData.filter((row) => row.Product !== Product);
//     setTableData(updatedTableData);

//     // Update local storage after deleting a row
//     localStorage.setItem('sampleData', JSON.stringify(updatedTableData));
//   };

=======
//     console.log('formdata: ', formData);
//   };

//   // Navigate back one step
>>>>>>> mirudhulaa
//   const handleGoBack = () => {
//     navigate(-1);
//   };

<<<<<<< HEAD
//   return (
//     <form className="add-user-form">
//       <h2 className="text-center">Material Requisition</h2>
//       <br />
// 	    <div className="card-body">
// 		    <div className="form-group row">
// 			    <div className="col-lg-6">
//             <label htmlFor="Ref_ID">  Ref_ID:</label>
//             <input type="number" className="form-control" name="Ref_ID" value={formData.Ref_ID} onChange={handleChange} required />
// 			    </div>
// 			    <div className="col-lg-6">
//             <label>Request_risedby:</label>
//             <input type="text" className="form-control" name="Request_risedby" value={formData.Request_risedby} onChange={handleChange} required />
// 			    </div>
// 		    </div>
// 		    <div className="form-group row">
// 			    <div className="col-lg-6">
//             <label >Transfer_type:</label>
//             <select  className="form-control" name="Transfer_type" value={formData.Transfer_type} onChange={handleChange} required>
//               <option value="Internal">Internal</option>
//               <option value="External">External</option>
//             </select>
// 			    </div>
// 			    <div className="col-lg-6">
//             <label >Branch:</label>
// 				    <div className="input-group">
//               <select className="form-control" name="Branch" value={formData.Branch} onChange={handleChange} required>
//                 <option value="CBE">CBE</option>
//                 <option value="MAS">MAS</option>
//               </select>
// 				    </div>
//           </div>
// 		    </div>

//         {/* to call the functionalities present in the Tableswidget13 component*/}
//         <TablesWidget13 className='mb-5 mb-xl-8' />

//       </div>
  
//       {/* Save and Cancel buttons */}
//       <div className="card-footer">
//         <div className="row">
//           <div className="col-lg-6 text-center">
//             <button className="btn btn-primary mr-2" onClick={handleSubmit}>
//               Save
//             </button>
//           </div>
//           <div className="col-lg-6 text-center">
//             <button className="btn btn-secondary" onClick={handleGoBack}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>

//   );
// };

// export default AddUserPage;








// AddUserPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddUserPage.css';
import {
  TablesWidget13,
} from '../layout-builder/TablesWidget13 copy'

const AddUserPage  = () =>  {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Ref_ID: '',
    Request_risedby: '',
    Transfer_type: '',
    Branch: '',
    Department: '',
    Status: 'Draft',
    Product:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(formData);
    navigate(`/builder?${queryParams.toString()}`);
  };
  return (



//     <form className="add-user-form" onSubmit={handleSubmit}>
//       <h2 className="text-center">Material Requisition</h2>
// <br />
// 	<div className="card-body">
// 		<div className="form-group row">
// 			<div className="col-lg-6">
// 				{/* <label>Full Name:</label>
// 				<input type="email" className="form-control" placeholder="Enter full name"/> */}

//         <label htmlFor="Ref_ID">  Ref_ID:</label>
//         <input type="number" className="form-control" name="Ref_ID" value={formData.Ref_ID} onChange={handleChange} required />
// 			</div>
// 			<div className="col-lg-6">
// 				{/* <label>Contact Number:</label>
// 				<input type="email" className="form-control" placeholder="Enter contact number"/> */}


//         <label>Request_risedby:</label>
//         <input type="text" className="form-control" name="Request_risedby" value={formData.Request_risedby} onChange={handleChange} required />
// 			</div>
// 		</div>
// 		<div className="form-group row">
// 			<div className="col-lg-6">
//         <label >Transfer_type:</label>
//         <select  className="form-control" name="Transfer_type" value={formData.Transfer_type} onChange={handleChange} required>
//         <option value="Internal">Internal</option>
//         <option value="External">External</option>
//         </select>
// 			</div>
// 			<div className="col-lg-6">
//       <label >Branch:</label>
// 				<div className="input-group">

//           <select className="form-control" name="Branch" value={formData.Branch} onChange={handleChange} required>
//             <option value="CBE">CBE</option>
//             <option value="MAS">MAS</option>
//           </select>
// 				</div>

// 			</div>
// 		</div>

//     <TablesWidget13 className='mb-5 mb-xl-8' />
// 		<div className="form-group row">
// 		</div>
// 	</div>
//   <div className="card-footer">
//   <div className="row">
//     <div className="col-lg-6 text-center">
//       <button type="reset" className="btn btn-primary mr-2">Save</button>
//     </div>
//     <div className="col-lg-6 text-center">
//       <button type="reset" className="btn btn-secondary">Cancel</button>
//     </div>
//   </div>
// </div>

// </form>


    
    <div className="add-user-container">
      <h2>Add Material Requisition</h2>
      <form className="add-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Ref_ID">Ref_ID:</label>
          <input type="number" name="Ref_ID" value={formData.Ref_ID} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="Request_risedby">Request_risedby:</label>
          <input type="text" name="Request_risedby" value={formData.Request_risedby} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="Transfer_type">Transfer_type:</label>
          <select name="Transfer_type" value={formData.Transfer_type} onChange={handleChange} required>
            <option value="Internal">Internal</option>
            <option value="External">External</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Branch">Branch:</label>
          <select name="Branch" value={formData.Branch} onChange={handleChange} required>
            <option value="CBE">CBE</option>
            <option value="MAS">MAS</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Department">Department:</label>
          <select name="Department" value={formData.Department} onChange={handleChange} required>
            <option value="HR">HR manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Product">Product:</label>
          <select name="Product" value={formData.Product} onChange={handleChange} required>
            <option value="Laptop">Laptop</option>
            <option value="Mobile">Mobile</option>
            <option value="TV">TV</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>

    
  );


  
  
};

export default AddUserPage;
=======

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
//           {/* begin::row-3 */}
//           <div className="form-group row"> 
//             <div className="col-lg-6">
//               <label>Product:</label>
//               <div className="input-group">
//                 <select 
//                   className="round form-control"
//                   name="Product"
//                   value={formData.Product}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option></option>
//                   <option value="Y19">Vivo Y19</option>
//                   <option value="Iphone15">Iphone15</option>
//                 </select>
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <label htmlFor="Ref_ID">Dated</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 name="Dated"
//                 value={formData.Dated}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//           <div className="form-group row">
//             <div className="col-lg-6">
//               <label>UOM:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="Uom"
//                 value={formData.Uom}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-lg-6">
//               <label >Quantity:</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 name="Quantity"
//                 value={formData.Quantity}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//         {/* end::body  */}
//         </div>

//         {/* to call the functionalities present in the Tableswidget13 component */}
//         {/* <TablesWidget13 className="mb-5 mb-xl-8" /> */}

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
>>>>>>> mirudhulaa
