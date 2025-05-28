'use client';

// pages/addCustomer.js
import { useState } from 'react';

const AddCustomer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [additionalEmailIds, setAdditionalEmailIds] = useState(['']);
  const [additionalPhoneNumbers, setAdditionalPhoneNumbers] = useState(['']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      name,
      email,
      phone_number: phoneNumber,
      company_name: companyName,
      additional_email_ids: additionalEmailIds,
      additional_phone_numbers: additionalPhoneNumbers,
    };

    const response = await fetch('/api/addCustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Customer added successfully!');
      // Reset form fields
      setName('');
      setEmail('');
      setPhoneNumber('');
      setCompanyName('');
      setAdditionalEmailIds(['']);
      setAdditionalPhoneNumbers(['']);
    } else {
      alert('Error adding customer: ' + result.error);
    }
  };

  const handleAdditionalEmailChange = (index, value) => {
    const newEmails = [...additionalEmailIds];
    newEmails[index] = value;
    setAdditionalEmailIds(newEmails);
  };

  const handleAdditionalPhoneChange = (index, value) => {
    const newPhones = [...additionalPhoneNumbers];
    newPhones[index] = value;
    setAdditionalPhoneNumbers(newPhones);
  };

  const addAdditionalEmailField = () => {
    setAdditionalEmailIds([...additionalEmailIds, '']);
  };

  const addAdditionalPhoneField = () => {
    setAdditionalPhoneNumbers([...additionalPhoneNumbers, '']);
  };

  return (
      <div>
        <h1>Add Customer</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Phone Number:</label>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div>
            <label>Company Name:</label>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
          <div>
            <label>Additional Email IDs:</label>
            {additionalEmailIds.map((email, index) => (
                <div key={index}>
                  <input
                      type="email"
                      value={email}
                      onChange={(e) => handleAdditionalEmailChange(index, e.target.value)}
                  />
                </div>
            ))}
            <button type="button" onClick={addAdditionalEmailField}>Add Another Email</button>
          </div>
          <div>
            <label>Additional Phone Numbers:</label>
            {additionalPhoneNumbers.map((phone, index) => (
                <div key={index}>
                  <input
                      type="text"
                      value={phone}
                      onChange={(e) => handleAdditionalPhoneChange(index, e.target.value)}
                  />
                </div>
            ))}
            <button type="button" onClick={addAdditionalPhoneField}>Add Another Phone</button>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
  );
};

export default AddCustomer;