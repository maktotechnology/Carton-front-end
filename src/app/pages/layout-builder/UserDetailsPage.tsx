import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetailsPage = () => {
  const { Ref_ID, Request_risedby, Transfer_type, Branch, Department, Status, Product } = useParams();

  // State to manage the editable values and edit mode
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({
    Request_risedby,
    Transfer_type,
    Branch,
    Department,
    Status,
    Product,
  });

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Function to handle input changes
  const handleInputChange = (field, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Retrieve existing data from local storage
    const storedData = localStorage.getItem('sampleData');
    const existingData = storedData ? JSON.parse(storedData) : [];
  
    // Find the index of the edited item using its Ref_ID
    const editedItemIndex = existingData.findIndex((data) => data.Ref_ID === Ref_ID);
  
    if (editedItemIndex !== -1) {
      // Update the values of the edited item
      const updatedItem = { ...existingData[editedItemIndex], ...editedValues };
  
      // Update the sampleData array with the updated item
      existingData[editedItemIndex] = updatedItem;
  
      // Update local storage with the updated sampleData
      localStorage.setItem('sampleData', JSON.stringify(existingData));
  
      // Exit edit mode
      toggleEditMode();
    } else {
      console.log('Edited item not found in the existing data.');
    }
  };
  

  return (
    <div>
      <h2>Meterial Requisition Details</h2>
      <p>Ref_ID: {Ref_ID}</p>
      <p>
        Request_risedby:{' '}
        {editMode ? (
          <input
            type="text"
            value={editedValues.Request_risedby}
            onChange={(e) => handleInputChange('Request_risedby', e.target.value)}
          />
        ) : (
          Request_risedby
        )}
      </p>
      {/* Repeat the above pattern for other fields */}
      <p>Transfer_type: {editMode ? <input type="text"
            value={editedValues.Transfer_type}
            onChange={(e) => handleInputChange('Transfer_type', e.target.value)} /> : Transfer_type}</p>
      <p>Branch: {editMode ? <input 
      type="text"
      value={editedValues.Branch}
      onChange={(e) => handleInputChange('Branch', e.target.value)} /> : Branch}</p>
      <p>Department: {editMode ? <input 
            type="text"
            value={editedValues.Department}
            onChange={(e) => handleInputChange('Department', e.target.value)} /> : Department}</p>
      <p>Status: {Status}</p>
      {/* <p>Status: {editMode ? <input 
      type="text"
      value={editedValues.Status}
      onChange={(e) => handleInputChange('Status', e.target.value)}  /> : Status}</p> */}
      <p>Product: {editMode ? <input 
            type="text"
            value={editedValues.Product}
            onChange={(e) => handleInputChange('Department', e.target.value)} /> : Product}</p>



      
<div className='d-flex flex-column w-100 me-2'>
  <div className='d-flex flex-stack mb-2'>
    {Status === 'Approved' ? (
      <span className='text-muted me-2 fs-7 fw-semibold'>
        <span role="img" aria-label="Truck">🚚</span> 100%
      </span>
    ) : Status === 'Draft' ? (
      <span className='text-muted me-2 fs-7 fw-semibold'>
        <span role="img" aria-label="Truck">🚚</span> 0%
      </span>
    ) : Status === 'Processing' ? (
      <span className='text-muted me-2 fs-7 fw-semibold'>
        <span role="img" aria-label="Truck">🚚</span> 70%
      </span>
    ) : Status === 'Rejected' ? (
      <span className='text-muted me-2 fs-7 fw-semibold' style={{ color: 'red' }}>
        <span role="img" aria-label="Truck">🚚</span> Canceled
      </span>
    ) : null}
  </div>
  <div className='progress h-9px w-100'>
    <div
      className='progress-bar'
      role='progressbar'
      style={{
        width: Status === 'Approved' ? '100%' : Status === 'Processing' ? '70%' : Status === 'Draft' ? '0%' : '0%',
        backgroundColor: Status === 'Rejected' ? 'red' : 'primary',
        backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/014/455/904/original/delivery-truck-icon-icon-on-transparent-background-free-png.png")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '30px 30px',
        right: `calc(${Status === 'Approved' ? '100%' : Status === 'Processing' ? '70%' : Status === 'Draft' ? '0%' : '0%'} - 15px)`, // Adjust left position based on progress
      }}
    ></div>
  </div>
</div>



       <br></br> 
      
      {/* Edit and Save buttons */}
      {editMode ? (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={toggleEditMode}>Cancel</button>
        </>
      ) : (
        <button onClick={toggleEditMode}>Edit</button>
      )}
    </div>
  );
};

export default UserDetailsPage;

// public class MergeSort {
//   public static void mergeSort(int[] arr) {
//       if (arr.length <= 1) {
//           return; // Array is already sorted or empty, nothing to do
//       }

//       int middle = arr.length / 2; // Find the middle index of the array
//       int[] left = new int[middle]; // Create a new array for the left half
//       int[] right = new int[arr.length - middle]; // Create a new array for the right half

//       // Fill the left array with elements from the start of the original array
//       for (int i = 0; i < middle; i++) {
//           left[i] = arr[i];
//       }
//       // Fill the right array with elements from the second half of the original array
//       for (int i = middle; i < arr.length; i++) {
//           right[i - middle] = arr[i];
//       }

//       // Recursively sort both the left and right halves of the array
//       mergeSort(left);
//       mergeSort(right);

//       // Merge the sorted left and right halves back into the original array
//       merge(arr, left, right);
//   }

//   private static void merge(int[] arr, int[] left, int[] right) {
//       int i = 0, j = 0, k = 0; // Indexes to track positions in the arrays

//       // Compare elements from left and right arrays and merge them into the original array
//       while (i < left.length && j < right.length) {
//           if (left[i] < right[j]) {
//               arr[k++] = left[i++];
//           } else {
//               arr[k++] = right[j++];
//           }
//       }

//       // Copy any remaining elements from the left and right arrays
//       while (i < left.length) {
//           arr[k++] = left[i++];
//       }
//       while (j < right.length) {
//           arr[k++] = right[j++];
//       }
//   }

//   public static void main(String[] args) {
//       int[] arr = {12, 11, 13, 5, 6, 7}; // Example unsorted array
//       mergeSort(arr); // Call the mergeSort function to sort the array

//       System.out.println("Sorted array:");
//       for (int num : arr) { // Print the sorted array
//           System.out.print(num + " ");
//       }
//   }
// }
