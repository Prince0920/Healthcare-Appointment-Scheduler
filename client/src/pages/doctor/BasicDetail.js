import React from 'react';

const BasicDetail = ({ doctorData, handleInputChange, basicDataErrors }) => {
  return (
    <div>
      <div className='form-group row'>
        <div className='col-md-6'>
          <label>Fullname</label>
          <input
            type='text'
            name='fullname'
            value={doctorData.fullname}
            onChange={handleInputChange}
            placeholder='Enter Full Name'
            className='form-control'
          />
          {basicDataErrors.fullname && (
            <span className='error-text'>{basicDataErrors.fullname}</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>Gender</label>
          <select
            name='gender'
            value={doctorData.gender}
            onChange={handleInputChange}
            className='form-control'>
            <option value=''>Select Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </select>
          {basicDataErrors.gender && <span className='error-text'>{basicDataErrors.gender}</span>}
        </div>
      </div>

      <div className='form-group row'>
        <div className='col-md-6'>
          <label>Date of Birth</label>
          <input
            type='date'
            name='dateOfBirth'
            value={doctorData.dateOfBirth}
            onChange={handleInputChange}
            placeholder='YYYY-MM-DD'
            className='form-control'
          />
          {basicDataErrors.dateOfBirth && (
            <span className='error-text'>{basicDataErrors.dateOfBirth}</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>Phone</label>
          <input
            type='text'
            name='phone'
            value={doctorData.phone}
            onChange={handleInputChange}
            placeholder='Enter Phone Number'
            className='form-control'
          />
          {basicDataErrors.phone && <span className='error-text'>{basicDataErrors.phone}</span>}
        </div>
      </div>
    </div>
  );
};

export default BasicDetail;
