import React from 'react';

const AdditionalDetails = ({
  additionalDetails,
  handleAdditionalDetailsChange,
  additionalDetailsErrors,
}) => {
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
          {additionalDetailsErrors.education && <span className='error-text'>{additionalDetailsErrors.education}</span>}
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
           {additionalDetailsErrors.experience && <span className='error-text'>{additionalDetailsErrors.experience}</span>}
        </div>
      </div>

      <div className='form-group row'>
        <div className='col-md-6'>
          <label>Medical Specialty</label>
          <input
            type='text'
            name='medicalSpecialty'
            value={additionalDetails.medicalSpecialty}
            onChange={handleAdditionalDetailsChange}
            placeholder='Enter Medical Specialty'
            className='form-control'
          />
           {additionalDetailsErrors.medicalSpecialty && <span className='error-text'>{additionalDetailsErrors.medicalSpecialty}</span>}
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
           {additionalDetailsErrors.certifications && <span className='error-text'>{additionalDetailsErrors.certifications}</span>}
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
