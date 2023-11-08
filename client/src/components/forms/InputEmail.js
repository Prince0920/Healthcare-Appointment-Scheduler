import React from 'react';

const InputEmail = ({ defaultValue, value, handleInputChange }) => {
  return (
    <>
      <label htmlFor='exampleInputEmail1'>Email address</label>
      <input
        type='email'
        className='form-control'
        placeholder='Enter email'
        name='email'
        onChange={handleInputChange}
        defaultValue={defaultValue}
        value={value}
      />
    </>
  );
};

export default InputEmail;
