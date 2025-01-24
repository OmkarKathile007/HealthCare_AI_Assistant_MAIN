import React, { useState } from 'react';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    contactNumber: '',
    address: '',
    diagnosisDate: '',
    diagnosis: '',
    treatment: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        setFormData({
          patientName: '',
          age: '',
          gender: '',
          contactNumber: '',
          address: '',
          diagnosisDate: '',
          diagnosis: '',
          treatment: '',
          notes: '',
        });
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
      alert('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-lg shadow-md p-8"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Patient Medical Record
        </h2>
        <div className="space-y-4">
          {[
            { label: 'Patient Name', name: 'patientName', type: 'text', placeholder: 'Enter patient\'s full name' },
            { label: 'Age', name: 'age', type: 'number', placeholder: 'Enter patient\'s age' },
            { label: 'Gender', name: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
            { label: 'Contact Number', name: 'contactNumber', type: 'tel', placeholder: 'Enter contact number' },
            { label: 'Address', name: 'address', type: 'textarea', placeholder: 'Enter patient\'s address' },
            { label: 'Diagnosis Date', name: 'diagnosisDate', type: 'date', placeholder: '' },
            { label: 'Diagnosis', name: 'diagnosis', type: 'textarea', placeholder: 'Enter diagnosis details' },
            { label: 'Treatment', name: 'treatment', type: 'textarea', placeholder: 'Enter treatment details' },
            { label: 'Notes', name: 'notes', type: 'textarea', placeholder: 'Additional notes' },
          ].map((field, index) => (
            <div key={index}>
              <label className="block text-gray-600 font-medium">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder={field.placeholder}
                  rows="3"
                />
              ) : field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">Select {field.label.toLowerCase()}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full mt-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
        >
          Submit Record
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
