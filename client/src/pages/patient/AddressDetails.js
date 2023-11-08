import React from 'react';
import InputText from '../../components/forms/InputText';

const AddressDetails = ({ address, errors, handleAddressChange }) => {
  return (
    <>
      <div className='form-group'>
        <div className='row'>
          <div className='col'>
            <InputText
              label='Street Address'
              value={address.street}
              handleInputChange={handleAddressChange}
              name={'street'}
            />
            {errors.street && <span className='error-text'>{errors.street}</span>}
          </div>

          <div className='col'>
            <InputText
              label='Landmark'
              value={address.landmark}
              handleInputChange={handleAddressChange}
              name={'landmark'}
            />
            {errors.landmark && <span className='error-text'>{errors.landmark}</span>}
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
            {errors.postalCode && <span className='error-text'>{errors.postalCode}</span>}
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
    </>
  );
};

export default AddressDetails;
