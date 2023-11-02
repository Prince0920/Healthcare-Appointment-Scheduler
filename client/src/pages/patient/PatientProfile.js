import React, { useState } from 'react';
import axios from 'axios';
import Layouts from '../../components/Layouts';
import ContentHeader from '../../components/ContentHeader';
import InputText from '../../components/forms/InputText';
import { DatePicker } from 'antd';
import { SERVER_BASE_URL } from '../../config/config.local';

// ... other imports and code ...

export const PatientProfile = () => {
  const [medicalHistory, setMedicalHistory] = useState([
    { condition: '', diagnosisDate: '', treatment: '' },
  ]);

  const [formData, setFormData] = useState({
    dateOfBirth: '',
    gender: 'Male',
    contactNumber: '',
  });

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [errors, setErrors] = useState({});

  const addMedicalHistory = () => {
    setMedicalHistory([...medicalHistory, { condition: '', diagnosisDate: '', treatment: '' }]);
  };

  const deleteMedicalHistory = index => {
    const updatedMedicalHistory = [...medicalHistory];
    updatedMedicalHistory.splice(index, 1);
    setMedicalHistory(updatedMedicalHistory);
  };

  const handleMedicalHistoryChange = (index, field, value) => {
    const updatedMedicalHistory = [...medicalHistory];
    updatedMedicalHistory[index][field] = value;
    setMedicalHistory(updatedMedicalHistory);
  };

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = e => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Add validation here and set errors if validation fails
    const newErrors = {};
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    }
    // Add more validation rules as needed

    if (Object.keys(newErrors).length === 0) {
      // If there are no errors, proceed with form submission

      // Define the URL of your server endpoint
      const serverUrl = SERVER_BASE_URL + '/api/v1/patient/profile'; // Replace with your server URL

      // Prepare the data to be sent
      const dataToSend = {
        ...formData,
        address,
        medicalHistory,
      };

      // Send a PUT request to the server using Axios
      axios
        .put(serverUrl, dataToSend, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(response => {
          // Handle the response from the server as needed
          console.log('Server Response:', response.data);
        })
        .catch(error => {
          // Handle errors, e.g., display an error message to the user
          console.error('Error:', error);
        });
    } else {
      // If there are errors, update the errors state
      setErrors(newErrors);
    }
  };

  return (
    <Layouts>
      <div className='content-wrapper'>
        <ContentHeader
          heading='Profile Management'
          bredCumName='Patient Profile'
        />
        <section className='content'>
          <div className='container-fluid'>
            <div className='card card-primary'>
              <div className='card-header'>
                <h3 className='card-title'>Update Patient Details</h3>
              </div>
              <form>
                <div className='card-body'>
                  <div className='form-group'>
                    <div className='row'>
                      <div className='col'>
                        <label htmlFor='dateOfBirth'>Date of Birth</label>
                        <input
                          type='date'
                          className='form-control'
                          id='dateOfBirth'
                          name='dateOfBirth'
                          value={formData.dateOfBirth}
                          onChange={handleFormChange}
                          placeholder='Date of Birth'
                        />
                        {errors.dateOfBirth && (
                          <span className='error-text'>{errors.dateOfBirth}</span>
                        )}
                      </div>
                      <div className='col'>
                        <label htmlFor='gender'>Gender</label>
                        <select
                          className='form-control'
                          id='gender'
                          name='gender'
                          value={formData.gender}
                          onChange={handleFormChange}
                          placeholder='Gender'>
                          <option value='Male'>Male</option>
                          <option value='Female'>Female</option>
                          <option value='Other'>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='row'>
                      <div className='col'>
                        <InputText
                          label='Contact Number'
                          value={formData.contactNumber}
                          handleInputChange={handleFormChange}
                          name={'contactNumber'}
                        />
                      </div>
                      <div className='col'>
                        <InputText
                          label='Street Address'
                          value={address.street}
                          handleInputChange={handleAddressChange}
                          name={'street'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='row'>
                      <div className='col'>
                        <InputText
                          label='City'
                          value={address.city}
                          handleInputChange={handleAddressChange}
                          name='city'
                        />
                      </div>
                      <div className='col'>
                        <InputText
                          label='State'
                          value={address.state}
                          handleInputChange={handleAddressChange}
                          name='state'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='row'>
                      <div className='col'>
                        <InputText
                          label='Postal Code'
                          value={address.postalCode}
                          handleInputChange={handleAddressChange}
                          name={'postalCode'}
                        />
                      </div>
                      <div className='col'>
                        <InputText
                          label='Country'
                          value={address.country}
                          handleInputChange={handleAddressChange}
                          name={'country'}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <h4 className='text-primary font-weight-bold mb-3'>Medical History</h4>
                  {medicalHistory.map((history, index) => (
                    <div
                      key={index}
                      className='border p-3 mb-3 medical-history-entry'>
                      <div className='row'>
                        <div className='col'>
                          <div className='form-group'>
                            <label htmlFor={`condition_${index}`}>Medical Condition</label>
                            <input
                              type='text'
                              className='form-control'
                              id={`condition_${index}`}
                              name={`condition_${index}`}
                              value={history.condition}
                              onChange={e =>
                                handleMedicalHistoryChange(index, 'condition', e.target.value)
                              }
                              placeholder='Medical Condition'
                            />
                          </div>
                        </div>
                        <div className='col'>
                          <div className='form-group'>
                            <label htmlFor={`diagnosisDate_${index}`}>Diagnosis Date</label>
                            <input
                              type='date'
                              className='form-control'
                              id={`diagnosisDate_${index}`}
                              name={`diagnosisDate_${index}`}
                              value={history.diagnosisDate}
                              onChange={e =>
                                handleMedicalHistoryChange(index, 'diagnosisDate', e.target.value)
                              }
                              placeholder='Diagnosis Date'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='form-group'>
                        <label htmlFor={`treatment_${index}`}>Treatment</label>
                        <textarea
                          className='form-control'
                          id={`treatment_${index}`}
                          name={`treatment_${index}`}
                          rows='4'
                          placeholder='Treatment'
                          value={history.treatment}
                          onChange={e =>
                            handleMedicalHistoryChange(index, 'treatment', e.target.value)
                          }></textarea>
                      </div>
                      <button
                        type='button'
                        className='btn btn-danger mh-delete-button'
                        onClick={() => deleteMedicalHistory(index)}>
                        <i className='fas fa-trash-alt'></i>
                      </button>
                    </div>
                  ))}
                  <div className='float-right'>
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={addMedicalHistory}>
                      + Add Medical History
                    </button>
                  </div>
                </div>
                <div className='card-footer'>
                  <button className='btn btn-primary' onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layouts>
  );
};

