import React, { useEffect, useState } from 'react';
import { SERVER_BASE_URL } from '../../config/config.local';
import axios from 'axios';

const AdditionalDetails = ({
  additionalDetails,
  handleAdditionalDetailsChange,
  additionalDetailsErrors,
}) => {
  const [medicalSpec, setMedicalSpecility] = useState([]);

  const getAllMedicalSpec = async () => {
    const url = SERVER_BASE_URL + '/api/v1/medical-speciality';
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    setMedicalSpecility(res.data.data);
  };

  useEffect(() => {
    getAllMedicalSpec();
  }, []);
  return (
    <div>
      <div className='form-group row'>
        <div className='col-md-6'>
          <label>Education</label>
          <input
            type='text'
            name='education'
            value={additionalDetails.education}
            onChange={handleAdditionalDetailsChange}
            placeholder='Enter Education'
            className='form-control'
          />
          {additionalDetailsErrors.education && (
            <span className='error-text'>{additionalDetailsErrors.education}</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>Experience</label>
          <input
            type='text'
            name='experience'
            value={additionalDetails.experience}
            onChange={handleAdditionalDetailsChange}
            placeholder='Enter Experience'
            className='form-control'
          />
          {additionalDetailsErrors.experience && (
            <span className='error-text'>{additionalDetailsErrors.experience}</span>
          )}
        </div>
      </div>

      <div className='form-group row'>
        <div className='col-md-6'>
          <label>Medical Specialty</label>
          <select
            name='medicalSpecialty'
            value={additionalDetails.medicalSpecialty}
            onChange={handleAdditionalDetailsChange}
            className='form-control'>
            <option
              value=''
              disabled>
              Select Medical Specialty
            </option>
            {medicalSpec.map(spec => (
              <option
                key={spec._id}
                value={spec.name}>
                {spec.name}
              </option>
            ))}
          </select>
          {additionalDetailsErrors.medicalSpecialty && (
            <span className='error-text'>{additionalDetailsErrors.medicalSpecialty}</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>Certifications (comma-separated)</label>
          <input
            type='text'
            name='certifications'
            value={additionalDetails.certifications.join(', ')}
            onChange={handleAdditionalDetailsChange}
            placeholder='e.g., Certification 1, Certification 2'
            className='form-control'
          />
          {additionalDetailsErrors.certifications && (
            <span className='error-text'>{additionalDetailsErrors.certifications}</span>
          )}
        </div>
      </div>

      <div className='form-group'>
        <label>About</label>
        <textarea
          name='about'
          value={additionalDetails.about}
          onChange={handleAdditionalDetailsChange}
          placeholder='Enter a brief description about the doctor'
          className='form-control'
        />
      </div>
    </div>
  );
};

export default AdditionalDetails;
