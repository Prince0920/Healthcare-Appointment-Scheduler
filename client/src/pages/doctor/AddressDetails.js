import React from 'react';

const AddressDetails = ({ address, handleAddressChange, addressErrors }) => {
  return (
    <div>
      <div className='form-group row'>
        <div className='col-md-6'>
          <label>Street Address</label>
          <input
            type='text'
            name='street'
            value={address.street}
            onChange={handleAddressChange}
            placeholder='Enter Street Address'
            className='form-control'
          />
          {addressErrors.street && <span className='error-text'>{addressErrors.street}</span>}
        </div>
        <div className='col-md-6'>
          <label>Landmark</label>
          <input
            type='text'
            name='landmark'
            value={address.landmark}
            onChange={handleAddressChange}
            placeholder='Enter Landmark'
            className='form-control'
          />
          {addressErrors.landmark && <span className='error-text'>{addressErrors.landmark}</span>}
        </div>
      </div>

      <div className='form-group row'>
        <div className='col-md-6'>
          <label>City</label>
          <input
            type='text'
            name='city'
            value={address.city}
            onChange={handleAddressChange}
            placeholder='Enter City'
            className='form-control'
          />
          {addressErrors.city && <span className='error-text'>{addressErrors.city}</span>}
        </div>
        <div className='col-md-6'>
          <label>State</label>
          <input
            type='text'
            name='state'
            value={address.state}
            onChange={handleAddressChange}
            placeholder='Enter State'
            className='form-control'
          />
          {addressErrors.state && <span className='error-text'>{addressErrors.state}</span>}
        </div>
      </div>

      <div className='form-group row'>
        <div className='col-md-6'>
          <label>Postal Code</label>
          <input
            type='text'
            name='postalCode'
            value={address.postalCode}
            onChange={handleAddressChange}
            placeholder='Enter Postal Code'
            className='form-control'
          />
          {addressErrors.postalCode && (
            <span className='error-text'>{addressErrors.postalCode}</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>Country</label>
          <input
            type='text'
            name='country'
            value={address.country}
            onChange={handleAddressChange}
            placeholder='Enter Country'
            className='form-control'
          />
          {addressErrors.country && <span className='error-text'>{addressErrors.country}</span>}
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
