import React, { useState } from 'react';

const BuilderPage: React.FC = () => {
  const [formData, setFormData] = useState({
    storeName: '',
    storeManagerFirstName: '',
    storeManagerLastName: '',
    address1: '',
    address2: '',
    city: '',
    phoneNumber: '',
    email: ''
  });

  const [savedData, setSavedData] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (isEditing !== null) {
      setEditFormData({ ...editFormData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing !== null) {
      const updatedData = [...savedData];
      updatedData[isEditing] = editFormData;
      setSavedData(updatedData);
      setIsEditing(null);
    } else {
      setSavedData([...savedData, formData]);
    }
    setFormData({
      storeName: '',
      storeManagerFirstName: '',
      storeManagerLastName: '',
      address1: '',
      address2: '',
      city: '',
      phoneNumber: '',
      email: ''
    });
    setEditFormData(formData);
  };

  const handleEdit = (index: number) => {
    setIsEditing(index);
    setEditFormData(savedData[index]);
  };

  const handleDelete = (index: number) => {
    const updatedData = savedData.filter((_, i) => i !== index);
    setSavedData(updatedData);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Store Name</label>
            <input
              type="text"
              name="storeName"
              value={isEditing !== null ? editFormData.storeName : formData.storeName}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Store Manager First Name <span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              name="storeManagerFirstName"
              value={isEditing !== null ? editFormData.storeManagerFirstName : formData.storeManagerFirstName}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Store Manager Last Name</label>
            <input
              type="text"
              name="storeManagerLastName"
              value={isEditing !== null ? editFormData.storeManagerLastName : formData.storeManagerLastName}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Address 1</label>
            <input
              type="text"
              name="address1"
              value={isEditing !== null ? editFormData.address1 : formData.address1}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Address 2</label>
            <input
              type="text"
              name="address2"
              value={isEditing !== null ? editFormData.address2 : formData.address2}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>City</label>
            <select
              name="city"
              value={isEditing !== null ? editFormData.city : formData.city}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            >
              <option value="">Select City</option>
              <option value="Salem">Salem</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              {/* Add more cities as needed */}
            </select>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Phone Number <span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              name="phoneNumber"
              value={isEditing !== null ? editFormData.phoneNumber : formData.phoneNumber}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={isEditing !== null ? editFormData.email : formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', background: '#007bff', color: '#fff' }}>
            {isEditing !== null ? 'Update' : 'Submit'}
          </button>
        </form>
      </div>

      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
        <h3>Saved Data</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Store Name</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Store Manager First Name</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Store Manager Last Name</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Address 1</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Address 2</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>City</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Phone Number</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Email</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedData.map((data, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.storeName}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.storeManagerFirstName}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.storeManagerLastName}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.address1}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.address2}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.city}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.phoneNumber}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.email}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', whiteSpace: 'nowrap' }}>
                  <button onClick={() => handleEdit(index)} style={{ marginRight: '10px' }}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { BuilderPage };
