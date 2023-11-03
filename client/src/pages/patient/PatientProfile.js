import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layouts from '../../components/Layouts';
import ContentHeader from '../../components/ContentHeader';
import InputText from '../../components/forms/InputText';
import { DatePicker } from 'antd';
import { SERVER_BASE_URL } from '../../config/config.local';
import { toast } from 'react-toastify';
import MedicalHistory from './MedicalHistory';
import AddressDetails from './AddressDetails';
import PersonalDetails from './PersonalDetails';

// ... other imports and code ...

export const PatientProfile = () => {
  const [medicalHistory, setMedicalHistory] = useState([
    { condition: '', diagnosisDate: '', treatment: '' },
  ]);

  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: 'Male',
    contactNumber: '',
  });

  const [address, setAddress] = useState({
    landmark: '',
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
    if (!formData.fullName) {
      newErrors.fullName = 'Fullname is required';
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

    if (!address.landmark) {
      newErrors.landmark = 'Landmark is required';
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
                  <PersonalDetails
                    formData={formData}
                    errors={errors}
                    handleFormChange={handleFormChange}
                  />
                  <AddressDetails
                    address={address}
                    errors={errors}
                    handleAddressChange={handleAddressChange}
                  />

                  <hr />
                  <MedicalHistory
                    medicalHistory={medicalHistory}
                    medicalHistoryErrors={medicalHistoryErrors}
                    handleMedicalHistoryChange={handleMedicalHistoryChange}
                    deleteMedicalHistory={deleteMedicalHistory}
                    addMedicalHistory={addMedicalHistory}
                  />
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
