import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layouts from '../../components/Layouts';
import ContentHeader from '../../components/ContentHeader';
import InputText from '../../components/forms/InputText';
import { DatePicker } from 'antd';
import { SERVER_BASE_URL } from '../../config/config.local';
import { toast } from 'react-toastify';

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
  const [medicalHistoryErrors, setMedicalHistoryErrors] = useState([]);

  // Define constants
  const API_URL = SERVER_BASE_URL + '/api/v1/patient/profile';

  // Function to validate the form
  const validateForm = (formData, address, medicalHistory) => {
    const newErrors = {};

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    }

    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact Number is required';
    }

    if (!address.street) {
      newErrors.street = 'Street Address is required';
    }

    if (!address.city) {
      newErrors.city = 'City is required';
    }

    if (!address.state) {
      newErrors.state = 'State is required';
    }

    if (!address.postalCode) {
      newErrors.postalCode = 'Postal Code is required';
    }

    if (!address.country) {
      newErrors.country = 'Country is required';
    }

    const medicalHistoryErrors = [];

    medicalHistory.forEach((history, index) => {
      const historyErrors = {};

      if (!history.condition) {
        historyErrors.condition = 'Medical Condition is required';
      }

      if (!history.diagnosisDate) {
        historyErrors.diagnosisDate = 'Diagnosis Date is required';
      }

      if (!history.treatment) {
        historyErrors.treatment = 'Treatment is required';
      }

      if (Object.keys(historyErrors).length > 0) {
        medicalHistoryErrors[index] = historyErrors;
      }
    });

    return { newErrors, medicalHistoryErrors };
  };

  // Function to fetch patient profile
  const getPatientProfile = () => {
    axios
      .get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        const profileData = response.data.data;
        const dateOfBirth = profileData.dateOfBirth
          ? new Date(profileData.dateOfBirth).toISOString().split('T')[0]
          : '';

        setFormData({
          dateOfBirth,
          gender: profileData.gender,
          contactNumber: profileData.contactNumber,
        });

        setAddress({
          street: profileData.address.street,
          city: profileData.address.city,
          state: profileData.address.state,
          postalCode: profileData.address.postalCode,
          country: profileData.address.country,
        });

        const formattedMedicalHistory = profileData.medicalHistory.map(history => ({
          ...history,
          diagnosisDate: history.diagnosisDate
            ? new Date(history.diagnosisDate).toISOString().split('T')[0]
            : '',
        }));

        setMedicalHistory(formattedMedicalHistory);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { newErrors, medicalHistoryErrors } = validateForm(formData, address, medicalHistory);

    if (Object.keys(newErrors).length === 0 && medicalHistoryErrors.length === 0) {
      const dataToSend = {
        ...formData,
        address,
        medicalHistory,
      };

      axios
        .put(API_URL, dataToSend, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(response => {
          if (response.data.success) {
            toast.success(response.data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      setErrors(newErrors);
      setMedicalHistoryErrors(medicalHistoryErrors);
    }
  };

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

  useEffect(() => {
    getPatientProfile();
  }, []);
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
                        {errors.contactNumber && (
                          <span className='error-text'>{errors.contactNumber}</span>
                        )}
                      </div>
                      <div className='col'>
                        <InputText
                          label='Street Address'
                          value={address.street}
                          handleInputChange={handleAddressChange}
                          name={'street'}
                        />
                        {errors.street && <span className='error-text'>{errors.street}</span>}
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
                        {errors.city && <span className='error-text'>{errors.city}</span>}
                      </div>
                      <div className='col'>
                        <InputText
                          label='State'
                          value={address.state}
                          handleInputChange={handleAddressChange}
                          name='state'
                        />
                        {errors.state && <span className='error-text'>{errors.state}</span>}
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
                        {errors.postalCode && (
                          <span className='error-text'>{errors.postalCode}</span>
                        )}
                      </div>
                      <div className='col'>
                        <InputText
                          label='Country'
                          value={address.country}
                          handleInputChange={handleAddressChange}
                          name={'country'}
                        />
                        {errors.country && <span className='error-text'>{errors.country}</span>}
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
                            {medicalHistoryErrors[index] &&
                              medicalHistoryErrors[index].condition && (
                                <span className='error-text'>
                                  {medicalHistoryErrors[index].condition}
                                </span>
                              )}
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
                            {medicalHistoryErrors[index] &&
                              medicalHistoryErrors[index].diagnosisDate && (
                                <span className='error-text'>
                                  {medicalHistoryErrors[index].diagnosisDate}
                                </span>
                              )}
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
                        {medicalHistoryErrors[index] && medicalHistoryErrors[index].treatment && (
                          <span className='error-text'>
                            {medicalHistoryErrors[index].treatment}
                          </span>
                        )}
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
                  <button
                    className='btn btn-primary'
                    onClick={handleSubmit}>
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
